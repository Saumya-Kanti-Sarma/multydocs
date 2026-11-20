CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    organization TEXT,
    credits INTEGER NOT NULL DEFAULT 50,
    verified INTEGER NOT NULL DEFAULT 0,
    joined TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
