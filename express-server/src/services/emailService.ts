import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2";

export interface Env {
	AWS_ACCESS_KEY_ID: string;
	AWS_SECRET_ACCESS_KEY: string;
	AWS_REGION?: string;
	SES_FROM_EMAIL?: string;
}

export interface SendEmailInput {
	to: string;
	subject: string;
	body: string;
	from?: string;
}

export async function sendEmail(
	{ to, subject, body, from }: SendEmailInput,
	env: Env,
) {
	const sesClient = new SESv2Client({
		region: env.AWS_REGION ?? "us-east-1",
		credentials: {
			accessKeyId: env.AWS_ACCESS_KEY_ID,
			secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
		},
	});

	const command = new SendEmailCommand({
		FromEmailAddress: from ?? env.SES_FROM_EMAIL!,
		Destination: {
			ToAddresses: [to],
		},
		Content: {
			Simple: {
				Subject: { Data: subject },
				Body: {
					Text: { Data: body },
				},
			},
		},
	});

	const response = await sesClient.send(command);
	return response;
}
