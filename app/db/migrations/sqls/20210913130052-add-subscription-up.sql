/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS subscription (
    id SERIAL PRIMARY KEY,
    plan VARCHAR(100) NOT NULL UNIQUE,
    monthly_payment numeric(19,4) NOT NULL,
    yearly_payment numeric(19,4) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE IF EXISTS user_info
ADD COLUMN subscription_plan INT REFERENCES subscription(id);

ALTER TABLE IF EXISTS user_info
ADD COLUMN subscription_expiry_date TIMESTAMPTZ;