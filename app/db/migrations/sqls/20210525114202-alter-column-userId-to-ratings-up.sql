/* Replace with your SQL commands */
ALTER TABLE IF EXISTS ratings ADD constraint user_uniq_key UNIQUE (user_id);
