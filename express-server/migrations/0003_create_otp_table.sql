CREATE TABLE IF NOT EXISTS otp (
    id TEXT PRIMARY KEY,
    email TEXT NOT NULL,
    pin TEXT NOT NULL,
    creation TEXT NOT NULL,
    expiry TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_otp_email ON otp(email);
CREATE INDEX IF NOT EXISTS idx_otp_pin ON otp(pin);
CREATE INDEX IF NOT EXISTS idx_otp_expiry ON otp(expiry);
