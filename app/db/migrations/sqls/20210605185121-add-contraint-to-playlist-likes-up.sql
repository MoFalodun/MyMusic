/* Replace with your SQL commands */
ALTER TABLE playlist_likes
ADD CONSTRAINT uniq_user_likes UNIQUE(user_id, playlist_id);