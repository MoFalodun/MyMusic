/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS playlist (
    id SERIAL PRIMARY KEY,
    song_id uuid REFERENCES songs(id) NOT NULL,
    owner_id uuid REFERENCES user_info(id) NOT NULL,
    playlist_name VARCHAR(100) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT uniq_playlist_details UNIQUE (song_id, owner_id, playlist_name)
);