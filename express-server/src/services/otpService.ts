import type { Env } from "../db";

export interface OTPRecord {
	id: string;
	email: string;
	pin: string;
	creation: string;
	expiry: string;
}

export function generateOTP(): string {
	return Math.floor(100000 + Math.random() * 900000).toString();
}

export function generateExpiry(seconds: number = 60): string {
	return new Date(Date.now() + seconds * 1000).toISOString();
}

export async function createOTP(
	db: D1Database,
	email: string,
	pin: string,
	expiry: string,
): Promise<OTPRecord> {
	const id = crypto.randomUUID();
	const creation = new Date().toISOString();

	await db
		.prepare(
			"INSERT INTO otp (id, email, pin, creation, expiry) VALUES (?, ?, ?, ?, ?)",
		)
		.bind(id, email, pin, creation, expiry)
		.run();

	return { id, email, pin, creation, expiry };
}

export async function getLatestOTPByEmail(
	db: D1Database,
	email: string,
): Promise<OTPRecord | null> {
	const result = await db
		.prepare(
			"SELECT id, email, pin, creation, expiry FROM otp WHERE email = ? ORDER BY creation DESC LIMIT 1",
		)
		.bind(email)
		.first();

	if (!result) {
		return null;
	}

	return {
		id: result.id as string,
		email: result.email as string,
		pin: result.pin as string,
		creation: result.creation as string,
		expiry: result.expiry as string,
	};
}

export async function deleteOTP(db: D1Database, id: string): Promise<void> {
	await db.prepare("DELETE FROM otp WHERE id = ?").bind(id).run();
}

export function getOTPEmailTemplate({ name, otp }: { name: string; otp: string }): string {
	return `<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email Verification - MultyDocs</title>
</head>

<body
  style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f3f4f6;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
    style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
    <tr>
      <td align="center" style="background-color: #ffffff; padding: 32px 24px;">
        <img src="https://multydocs.in/logo.svg" alt="MultyDocs"
          style="height: 40px; width: auto; display: block; margin: 0 auto;">
      </td>
    </tr>
    <tr>
      <td style="padding: 40px 32px;">
        <h2 style="color: #1f2937; font-size: 22px; font-weight: 600; margin: 0 0 16px 0;">Email Verification</h2>
        <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0 0 24px 0;">Hello <strong
            style="color: #1f2937;">${name}</strong>,</p>
        <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0;">We received a request to
          verify your email address. Please use the following One-Time Password (OTP) to complete the verification:</p>
        <div
          style="background-color: #f9fafb; border: 2px solid #ea8766; border-radius: 10px; padding: 24px; text-align: center; margin: 0 0 24px 0;">
          <span
            style="font-size: 34px; font-weight: 800; color: #ea9266; letter-spacing: 10px; font-family: 'Courier New', monospace;">${otp}</span>
        </div>
        <p style="color: #6b7280; font-size: 14px; line-height: 1.5; margin: 0 0 30px 0;"><strong>This OTP will expire
            in 60 seconds.</strong> Please do not share this code with anyone.</p>
        <p style="color: #6b7280; font-size: 14px; line-height: 1.5; margin: 0;">If you didn't request this
          verification, you can safely ignore this email.</p>
      </td>
    </tr>
    <tr>
      <td align="center" style="padding: 24px 32px; border-top: 1px solid #e5e7eb; background-color: #f9fafb;">
        <p style="color: #9ca3af; font-size: 12px; line-height: 1.5; margin: 0;">
          Best regards,<br>
          <strong style="color: #374151;">The MultyDocs Team</strong><br>
          https://multydocs.in
        </p>
      </td>
    </tr>
  </table>
</body>

</html>`;
}

export function getOTPPlainText({ name, otp }: { name: string; otp: string }): string {
	return `MultyDocs - Email Verification

Hello ${name},

We received a request to verify your email address. Please use the following One-Time Password (OTP) to complete the verification:

OTP: ${otp}

This OTP will expire in 60 seconds. Please do not share this code with anyone.

If you didn't request this verification, you can safely ignore this email.

Best regards,
The MultyDocs Team
https://multydocs.in`;
}
