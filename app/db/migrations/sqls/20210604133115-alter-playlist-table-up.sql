/* Replace with your SQL commands */
ALTER TABLE playlist
DROP CONSTRAINT uniq_playlist_details;

ALTER TABLE playlist
DROP COLUMN song_id;

ALTER TABLE playlist
ADD CONSTRAINT uniq_user_playlist UNIQUE(owner_id, playlist_name);