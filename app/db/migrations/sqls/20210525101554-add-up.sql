/* Replace with your SQL commands */
ALTER TABLE IF EXISTS ratings ADD COLUMN updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW();
