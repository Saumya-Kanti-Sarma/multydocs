import type { Env, Certificate } from "../db";

export interface CreateCertificateInput {
	fields: string[];
	position: number[][];
	issued_by: string;
	template: string;
	time_stamp?: string;
}

export async function createCertificate(
	db: D1Database,
	input: CreateCertificateInput,
): Promise<Certificate> {
	const id = crypto.randomUUID();
	const time_stamp = input.time_stamp ?? new Date().toISOString();

	await db
		.prepare(
			"INSERT INTO certificates (id, fields, position, issued_by, template, time_stamp) VALUES (?, ?, ?, ?, ?, ?)",
		)
		.bind(
			id,
			JSON.stringify(input.fields),
			JSON.stringify(input.position),
			input.issued_by,
			input.template,
			time_stamp,
		)
		.run();

	const result = await db
		.prepare("SELECT id, fields, position, issued_by, template, time_stamp FROM certificates WHERE id = ?")
		.bind(id)
		.first();

	if (!result) {
		throw new Error("Failed to create certificate");
	}

	return {
		id: result.id as string,
		fields: JSON.parse(result.fields as string),
		position: JSON.parse(result.position as string),
		issued_by: result.issued_by as string,
		template: result.template as string,
		time_stamp: result.time_stamp as string,
	};
}

export async function getCertificateById(db: D1Database, id: string): Promise<Certificate | null> {
	const result = await db
		.prepare("SELECT id, fields, position, issued_by, template, time_stamp FROM certificates WHERE id = ?")
		.bind(id)
		.first();

	if (!result) {
		return null;
	}

	return {
		id: result.id as string,
		fields: JSON.parse(result.fields as string),
		position: JSON.parse(result.position as string),
		issued_by: result.issued_by as string,
		template: result.template as string,
		time_stamp: result.time_stamp as string,
	};
}

export async function listCertificatesByUser(db: D1Database, issued_by: string): Promise<Certificate[]> {
	const results = await db
		.prepare("SELECT id, fields, position, issued_by, template, time_stamp FROM certificates WHERE issued_by = ? ORDER BY time_stamp DESC")
		.bind(issued_by)
		.all();

	return (results.results as unknown[]).map((row) => ({
		id: (row as Record<string, unknown>).id as string,
		fields: JSON.parse((row as Record<string, unknown>).fields as string),
		position: JSON.parse((row as Record<string, unknown>).position as string),
		issued_by: (row as Record<string, unknown>).issued_by as string,
		template: (row as Record<string, unknown>).template as string,
		time_stamp: (row as Record<string, unknown>).time_stamp as string,
	}));
}
