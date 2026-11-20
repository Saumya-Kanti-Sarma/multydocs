CREATE TABLE IF NOT EXISTS certificates (
    id TEXT PRIMARY KEY,
    fields TEXT NOT NULL,
    position TEXT NOT NULL,
    issued_by TEXT NOT NULL,
    template TEXT NOT NULL,
    time_stamp TEXT NOT NULL,
    FOREIGN KEY (issued_by) REFERENCES users(id)
);

CREATE INDEX IF NOT EXISTS idx_certificates_issued_by ON certificates(issued_by);
CREATE INDEX IF NOT EXISTS idx_certificates_time_stamp ON certificates(time_stamp);
