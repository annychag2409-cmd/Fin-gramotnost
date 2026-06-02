CREATE TABLE IF NOT EXISTS aleria_bank_sources (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    bank_name TEXT NOT NULL,
    product_type TEXT NOT NULL,
    source_url TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'needs_check',s
    checked_at TEXT,
    comment TEXT
);

CREATE TABLE IF NOT EXISTS aleria_source_checks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    source_id INTEGER NOT NULL,
    status TEXT NOT NULL,
    checked_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    message TEXT,
    FOREIGN KEY (source_id) REFERENCES aleria_bank_sources(id)
);
