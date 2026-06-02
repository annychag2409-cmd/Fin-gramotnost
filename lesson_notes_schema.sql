CREATE TABLE IF NOT EXISTS renata_lesson_notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_key TEXT NOT NULL,
    lesson_id INTEGER NOT NULL,
    goal_text TEXT DEFAULT '',
    note_text TEXT DEFAULT '',
    understood INTEGER NOT NULL DEFAULT 0,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (user_key, lesson_id)
);

CREATE TABLE IF NOT EXISTS renata_learning_goals (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_key TEXT NOT NULL,
    title TEXT NOT NULL,
    target_lessons_count INTEGER NOT NULL DEFAULT 0,
    completed_lessons_count INTEGER NOT NULL DEFAULT 0,
    deadline TEXT,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
