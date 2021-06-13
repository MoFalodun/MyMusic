/* Replace with your SQL commands */
ALTER TABLE IF EXISTS ratings ADD COLUMN user_id uuid REFERENCES user_info NOT NULL;