// import { env } from "cloudflare:workers";
import { httpServerHandler } from "cloudflare:node";
import express from "express";
import { sendEmail } from "./services/emailService";

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Health check endpoint
app.get("/", (req, res) => {
	res.json({ message: "Express.js running on Cloudflare Workers!" });
});

// Send email endpoint
app.post("/send-email", async (req, res) => {
	const { to, subject, body, from } = req.body;

	if (!to || !subject || !body) {
		res.status(400).json({ error: "to, subject, and body are required" });
		return;
	}

	try {
		const response = await sendEmail({ to, subject, body, from });
		res.json({ messageId: response.MessageId });
	} catch (error) {
		console.error("Failed to send email:", error);
		res.status(500).json({ error: "Failed to send email" });
	}
});

app.listen(3000);
export default httpServerHandler({ port: 3000 });