import { httpServerHandler } from "cloudflare:node";
import express from "express";
import { sendEmail } from "./services/emailService";

interface Env {
	AWS_ACCESS_KEY_ID: string;
	AWS_SECRET_ACCESS_KEY: string;
	AWS_REGION?: string;
	SES_FROM_EMAIL?: string;
}

let currentEnv: Env | undefined;

const app = express();

app.use(express.json());

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
