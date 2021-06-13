/* Replace with your SQL commands--- */
ALTER TABLE ratings
ADD CONSTRAINT uniq_user_id_per_song UNIQUE (song_id, user_id)