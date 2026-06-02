
CREATE TABLE IF NOT EXISTS anya_calculation_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_key TEXT NOT NULL,
    product_id TEXT,
    product_title TEXT NOT NULL,
    product_type TEXT NOT NULL CHECK (product_type IN ('deposit', 'savings')),
    amount REAL NOT NULL,
    months INTEGER NOT NULL,
    annual_rate REAL NOT NULL,
    profit REAL NOT NULL,
    total REAL NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_anya_calculation_history_user
ON anya_calculation_history(user_key, created_at);
