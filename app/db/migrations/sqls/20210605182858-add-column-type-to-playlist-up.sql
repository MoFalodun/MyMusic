/* Replace with your SQL commands */
CREATE TYPE playlist_privacy AS ENUM (
'public',
'private'
);

ALTER TABLE playlist ADD COLUMN playlist_type playlist_privacy DEFAULT 'public'
