CREATE TABLE IF NOT EXISTS anya_product_filter_presets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_key TEXT NOT NULL,
    title TEXT NOT NULL,
    query_text TEXT DEFAULT '',
    product_type TEXT NOT NULL DEFAULT 'all',
    min_rate REAL NOT NULL DEFAULT 0,
    sort_by TEXT NOT NULL DEFAULT 'rate_desc',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS anya_favorite_products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_key TEXT NOT NULL,
    product_id TEXT NOT NULL,
    product_type TEXT NOT NULL CHECK (product_type IN ('deposit', 'savings')),
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (user_key, product_id)
);
