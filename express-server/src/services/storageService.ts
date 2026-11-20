import type { Env } from "../db";

export interface UploadCertificateInput {
	key: string;
	body: ArrayBuffer | Uint8Array | string;
	contentType?: string;
}

export async function uploadCertificate(
	storage: R2Bucket,
	input: UploadCertificateInput,
): Promise<void> {
	await storage.put(input.key, input.body, {
		httpMetadata: {
			contentType: input.contentType ?? "application/octet-stream",
		},
	});
}

export async function getCertificate(storage: R2Bucket, key: string): Promise<R2ObjectBody | null> {
	return storage.get(key);
}

export async function deleteCertificate(storage: R2Bucket, key: string): Promise<boolean> {
	await storage.delete(key);
	return true;
}

export function getCertificateUrl(env: Env, key: string): string {
	const base = env.CERTIFICATE_STORAGE_URL ?? "";
	if (base) {
		return `${base.replace(/\/$/, "")}/${key}`;
	}
	return `${env.R2_BUCKET_NAME ?? ""}/${key}`;
}
