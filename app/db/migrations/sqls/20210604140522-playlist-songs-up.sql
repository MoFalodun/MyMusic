/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS playlist_songs (
    id SERIAL PRIMARY KEY,
    song_id uuid REFERENCES songs(id) NOT NULL,
    playlist_id INT REFERENCES playlist(id) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT uniq_song_details UNIQUE (song_id, playlist_id)
);