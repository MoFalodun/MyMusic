/* Replace with your SQL commands */
DROP TABLE IF EXISTS subscription CASCADE;

ALTER TABLE IF EXISTS user_info
DROP COLUMN IF EXISTS subscription_plan;

ALTER TABLE IF EXISTS user_info
DROP COLUMN IF EXISTS subscription_expiry_date;