import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2";

const sesClient = new SESv2Client({
	region: process.env.AWS_REGION ?? "us-east-1",
	credentials: {
		accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
	},
});

export interface SendEmailInput {
	to: string;
	subject: string;
	body: string;
	from?: string;
}

export async function sendEmail({
	to,
	subject,
	body,
	from = process.env.SES_FROM_EMAIL!,
}: SendEmailInput) {
	const command = new SendEmailCommand({
		FromEmailAddress: from,
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
