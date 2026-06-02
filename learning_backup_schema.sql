CREATE TABLE IF NOT EXISTS renata_learning_backups (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_key TEXT NOT NULL,
    payload_json TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_renata_learning_backups_user
ON renata_learning_backups(user_key, created_at);
