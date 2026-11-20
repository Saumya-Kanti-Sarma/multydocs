import type { Env, User } from "../db";

async function hashPassword(password: string): Promise<string> {
	const encoder = new TextEncoder();
	const data = encoder.encode(password);
	const hashBuffer = await crypto.subtle.digest("SHA-256", data);
	const hashArray = Array.from(new Uint8Array(hashBuffer));
	return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export interface CreateUserInput {
	name: string;
	email: string;
	password: string;
	organization?: string;
}

export interface UpdateUserInput {
	name?: string;
	organization?: string;
	credits?: number;
	verified?: boolean;
}

export async function createUser(
	db: D1Database,
	input: CreateUserInput,
): Promise<User> {
	const id = crypto.randomUUID();
	const joined = new Date().toISOString();
	const passwordHash = await hashPassword(input.password);

	await db
		.prepare(
			"INSERT INTO users (id, name, email, password, organization, credits, verified, joined) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
		)
		.bind(
			id,
			input.name,
			input.email,
			passwordHash,
			input.organization ?? null,
			50,
			0,
			joined,
		)
		.run();

	const user = await getUserById(db, id);
	if (!user) {
		throw new Error("Failed to create user");
	}
	return user;
}

export async function getUserById(db: D1Database, id: string): Promise<User | null> {
	const result = await db
		.prepare("SELECT id, name, email, password, organization, credits, verified, joined FROM users WHERE id = ?")
		.bind(id)
		.first();
	return result ? (result as unknown as User) : null;
}

export async function getUserByEmail(db: D1Database, email: string): Promise<User | null> {
	const result = await db
		.prepare("SELECT id, name, email, password, organization, credits, verified, joined FROM users WHERE email = ?")
		.bind(email)
		.first();
	return result ? (result as unknown as User) : null;
}

export async function listUsers(db: D1Database): Promise<User[]> {
	const results = await db
		.prepare("SELECT id, name, email, password, organization, credits, verified, joined FROM users ORDER BY joined DESC")
		.all();
	return (results.results as unknown as User[]) ?? [];
}

export async function updateUser(
	db: D1Database,
	id: string,
	input: UpdateUserInput,
): Promise<User | null> {
	const updates: string[] = [];
	const values: unknown[] = [];

	if (input.name !== undefined) {
		updates.push("name = ?");
		values.push(input.name);
	}
	if (input.organization !== undefined) {
		updates.push("organization = ?");
		values.push(input.organization);
	}
	if (input.credits !== undefined) {
		updates.push("credits = ?");
		values.push(input.credits);
	}
	if (input.verified !== undefined) {
		updates.push("verified = ?");
		values.push(input.verified ? 1 : 0);
	}

	if (updates.length === 0) {
		return getUserById(db, id);
	}

	values.push(id);
	await db
		.prepare(`UPDATE users SET ${updates.join(", ")} WHERE id = ?`)
		.bind(...values)
		.run();

	return getUserById(db, id);
}

export async function deleteUser(db: D1Database, id: string): Promise<boolean> {
	const result = await db.prepare("DELETE FROM users WHERE id = ?").bind(id).run();
	return (result.meta.changes ?? 0) > 0;
}

export async function verifyUser(db: D1Database, id: string): Promise<User | null> {
	await db.prepare("UPDATE users SET verified = 1 WHERE id = ?").bind(id).run();
	return getUserById(db, id);
}

export async function addCredits(
	db: D1Database,
	id: string,
	amount: number,
): Promise<User | null> {
	await db
		.prepare("UPDATE users SET credits = credits + ? WHERE id = ?")
		.bind(amount, id)
		.run();
	return getUserById(db, id);
}
