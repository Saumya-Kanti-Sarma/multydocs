import { httpServerHandler } from "cloudflare:node";
import express from "express";
import { sendEmail } from "./services/emailService";
import cors from "cors";
import {
	createUser,
	getUserById,
	getUserByEmail,
	listUsers,
	updateUser,
	deleteUser,
	verifyUser,
	addCredits,
} from "./services/userService";
import {
	createCertificate,
	listCertificatesByUser,
} from "./services/certificateService";
import { uploadCertificate, getCertificateUrl } from "./services/storageService";
import {
	generateOTP,
	generateExpiry,
	createOTP,
	getLatestOTPByEmail,
	deleteOTP,
	getOTPEmailTemplate,
	getOTPPlainText,
} from "./services/otpService";
import type { Env } from "./db";

let currentEnv: Env | undefined;

const app = express();
app.use(express.json());

app.use(cors({
	origin: ["https://multydocs.in", "https://www.multydocs.in"],
	methods: ["GET", "POST", "PUT", "DELETE"],
}));

app.get("/", (_req, res) => {
	res.json({ message: "Express.js running on Cloudflare Workers!" });
});

app.post("/send-email", async (req, res) => {
	const { to, subject, body, from } = req.body;
	const env = currentEnv;

	if (!env) {
		res.status(500).json({ error: "Environment not available" });
		return;
	}

	if (!to || !subject || !body) {
		res.status(400).json({ error: "to, subject, and body are required" });
		return;
	}

	try {
		const response = await sendEmail({ to, subject, body, from }, env);
		res.json({ messageId: response.MessageId });
	} catch (error) {
		console.error("Failed to send email:", error);
		res.status(500).json({ error: "Failed to send email" });
	}
});

// --- User CRUD ---

app.post("/users", async (req, res) => {
	const env = currentEnv;
	if (!env) {
		res.status(500).json({ error: "Environment not available" });
		return;
	}

	const { name, email, password, organization } = req.body;
	if (!name || !email || !password) {
		res.status(400).json({ error: "name, email and password are required" });
		return;
	}

	const existing = await getUserByEmail(env.DB, email);
	if (existing) {
		res.status(409).json({ error: "Email already registered" });
		return;
	}

	try {
		const user = await createUser(env.DB, { name, email, password, organization });
		const { password: _, ...userWithoutPassword } = user;
		res.status(201).json(userWithoutPassword);
	} catch (error) {
		console.error("Failed to create user:", error);
		res.status(500).json({ error: "Failed to create user" });
	}
});

app.get("/users", async (_req, res) => {
	const env = currentEnv;
	if (!env) {
		res.status(500).json({ error: "Environment not available" });
		return;
	}

	const users = await listUsers(env.DB);
	res.json(users.map(({ password, ...rest }) => rest));
});

app.get("/users/:id", async (req, res) => {
	const env = currentEnv;
	if (!env) {
		res.status(500).json({ error: "Environment not available" });
		return;
	}

	const user = await getUserById(env.DB, req.params.id);
	if (!user) {
		res.status(404).json({ error: "User not found" });
		return;
	}
	const { password, ...rest } = user;
	res.json(rest);
});

app.put("/users/:id", async (req, res) => {
	const env = currentEnv;
	if (!env) {
		res.status(500).json({ error: "Environment not available" });
		return;
	}

	const { name, organization, credits, verified } = req.body;
	const user = await updateUser(env.DB, req.params.id, { name, organization, credits, verified });
	if (!user) {
		res.status(404).json({ error: "User not found" });
		return;
	}
	const { password, ...rest } = user;
	res.json(rest);
});

app.delete("/users/:id", async (req, res) => {
	const env = currentEnv;
	if (!env) {
		res.status(500).json({ error: "Environment not available" });
		return;
	}

	const deleted = await deleteUser(env.DB, req.params.id);
	if (!deleted) {
		res.status(404).json({ error: "User not found" });
		return;
	}
	res.status(204).end();
});

app.get("/users/:id/verify", async (req, res) => {
	const env = currentEnv;
	if (!env) {
		res.status(500).json({ error: "Environment not available" });
		return;
	}

	const user = await getUserById(env.DB, req.params.id);
	if (!user) {
		res.status(404).json({ error: "User not found" });
		return;
	}

	const pin = generateOTP();
	const expiry = generateExpiry(60);

	await createOTP(env.DB, user.email, pin, expiry);

	const html = getOTPEmailTemplate({ name: user.name, otp: pin });
	const text = getOTPPlainText({ name: user.name, otp: pin });

	try {
		await sendEmail(
			{
				to: user.email,
				subject: "Your MultyDocs Email Verification OTP",
				body: text,
				html,
			},
			env,
		);
	} catch (error) {
		console.error("Failed to send OTP email:", error);
		res.status(500).json({ error: "Failed to send OTP email" });
		return;
	}

	res.json({
		message: "OTP sent to your email address",
		email: user.email,
		// otp: pin,
		expiresIn: 60,
	});
});

app.post("/users/:id/verify", async (req, res) => {
	const env = currentEnv;
	if (!env) {
		res.status(500).json({ error: "Environment not available" });
		return;
	}

	const user = await getUserById(env.DB, req.params.id);
	if (!user) {
		res.status(404).json({ error: "User not found" });
		return;
	}

	const { email, otp } = req.body;
	if (!email || !otp) {
		res.status(400).json({ error: "email and otp are required" });
		return;
	}

	if (email !== user.email) {
		res.status(400).json({ error: "Email does not match the user's registered email" });
		return;
	}

	const otpRecord = await getLatestOTPByEmail(env.DB, email);
	if (!otpRecord) {
		res.status(400).json({ error: "No OTP found for this email. Please request a new one." });
		return;
	}

	const now = new Date();
	const expiryTime = new Date(otpRecord.expiry);
	if (now > expiryTime) {
		res.status(400).json({ error: "OTP has expired. Please request a new one." });
		return;
	}

	if (otpRecord.pin !== otp) {
		res.status(400).json({ error: "Invalid OTP" });
		return;
	}

	await deleteOTP(env.DB, otpRecord.id);

	const verifiedUser = await verifyUser(env.DB, req.params.id);
	if (!verifiedUser) {
		res.status(404).json({ error: "User not found" });
		return;
	}

	const { password, ...rest } = verifiedUser;
	res.json({
		message: "Email verified successfully",
		verified: true,
		user: rest,
	});
});

app.post("/users/:id/credits", async (req, res) => {
	const env = currentEnv;
	if (!env) {
		res.status(500).json({ error: "Environment not available" });
		return;
	}

	const { amount } = req.body;
	if (!amount || typeof amount !== "number") {
		res.status(400).json({ error: "amount is required and must be a number" });
		return;
	}

	const user = await addCredits(env.DB, req.params.id, amount);
	if (!user) {
		res.status(404).json({ error: "User not found" });
		return;
	}
	const { password, ...rest } = user;
	res.json(rest);
});

// --- Certificate Create ---

app.post("/certificates", async (req, res) => {
	const env = currentEnv;
	if (!env) {
		res.status(500).json({ error: "Environment not available" });
		return;
	}

	const { fields, position, issued_by, template, time_stamp } = req.body;
	if (!fields || !Array.isArray(fields) || !position || !issued_by || !template) {
		res.status(400).json({ error: "fields, position, issued_by, and template are required" });
		return;
	}

	try {
		const certificate = await createCertificate(env.DB, {
			fields,
			position,
			issued_by,
			template,
			time_stamp,
		});
		res.status(201).json(certificate);
	} catch (error) {
		console.error("Failed to create certificate:", error);
		res.status(500).json({ error: "Failed to create certificate" });
	}
});

app.get("/certificates/user/:userId", async (req, res) => {
	const env = currentEnv;
	if (!env) {
		res.status(500).json({ error: "Environment not available" });
		return;
	}

	const certificates = await listCertificatesByUser(env.DB, req.params.userId);
	res.json(certificates);
});

app.post("/certificates/upload", async (req, res) => {
	const env = currentEnv;
	if (!env) {
		res.status(500).json({ error: "Environment not available" });
		return;
	}

	const { key, body, contentType } = req.body;
	if (!key || !body) {
		res.status(400).json({ error: "key and body are required" });
		return;
	}

	try {
		const buffer = Buffer.from(body, "base64");
		await uploadCertificate(env.CERTIFICATE_STORAGE, {
			key,
			body: buffer,
			contentType,
		});
		const url = getCertificateUrl(env, key);
		res.status(201).json({ key, url });
	} catch (error) {
		console.error("Failed to upload certificate:", error);
		res.status(500).json({ error: "Failed to upload certificate" });
	}
});

app.listen(3000);

const handler = httpServerHandler({ port: 3000 });

export default {
	async fetch(
		request: Request,
		env: Env,
		ctx: ExecutionContext,
	): Promise<Response> {
		currentEnv = env;
		return (
			(await handler.fetch!(request as any, env, ctx)) ??
			new Response("Not found", { status: 404 })
		);
	},
};
