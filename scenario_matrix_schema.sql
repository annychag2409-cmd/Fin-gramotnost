CREATE TABLE IF NOT EXISTS aleria_comparison_scenarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    recommended_product TEXT NOT NULL CHECK (recommended_product IN ('deposit', 'savings', 'investment')),
    sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS aleria_scenario_conditions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    scenario_slug TEXT NOT NULL,
    condition_key TEXT NOT NULL,
    condition_value TEXT NOT NULL,
    score_deposit INTEGER NOT NULL DEFAULT 0,
    score_savings INTEGER NOT NULL DEFAULT 0,
    score_investment INTEGER NOT NULL DEFAULT 0,
    FOREIGN KEY (scenario_slug) REFERENCES aleria_comparison_scenarios(slug)
);
