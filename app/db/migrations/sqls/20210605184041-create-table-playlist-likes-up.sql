/* Replace with your SQL commands */
CREATE TYPE playlist_decision AS ENUM (
'like',
'dislike',
'neutral'
);

CREATE TABLE IF NOT EXISTS playlist_likes (
    id SERIAL PRIMARY KEY,
    user_id uuid REFERENCES user_info(id) NOT NULL,
    playlist_id INT REFERENCES playlist(id) NOT NULL,
    decision playlist_decision DEFAULT 'neutral',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);