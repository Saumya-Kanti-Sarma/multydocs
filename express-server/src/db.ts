export interface Env {
	AWS_ACCESS_KEY_ID: string;
	AWS_SECRET_ACCESS_KEY: string;
	AWS_REGION?: string;
	SES_FROM_EMAIL?: string;
	SES_FROM_NAME?: string;
	DB: D1Database;
	CERTIFICATE_STORAGE: R2Bucket;
	D1_DATABASE_ID?: string;
	R2_BUCKET_NAME?: string;
	CERTIFICATE_STORAGE_URL?: string;
}

export interface User {
	id: string;
	name: string;
	email: string;
	password: string;
	organization?: string;
	credits: number;
	verified: boolean;
	joined: string;
}

export interface Certificate {
	id: string;
	fields: string[];
	position: number[][];
	issued_by: string;
	template: string;
	time_stamp: string;
}

export function getDb(env: Env): D1Database {
	return env.DB;
}

export function getStorage(env: Env): R2Bucket {
	return env.CERTIFICATE_STORAGE;
}
