CREATE TYPE app_visitor_role AS ENUM (
    'user',
    'artist'
);

CREATE TABLE IF NOT EXISTS user_info (
    id uuid PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    user_name VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    phone_number VARCHAR,
    role app_visitor_role DEFAULT 'user',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS artist_info (
    id uuid PRIMARY KEY,
    artist_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    role app_visitor_role DEFAULT 'artist',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS albums (
    id uuid PRIMARY KEY,
    artist_id uuid REFERENCES artist_info(id) NOT NULL,
    album_name VARCHAR(100) NOT NULL,
    description VARCHAR(100),
    genre VARCHAR,
    pictures VARCHAR,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS songs (
    id uuid PRIMARY KEY,
    artist_id uuid REFERENCES artist_info(id) NOT NULL,
    name VARCHAR(100) NOT NULL,
    lyrics VARCHAR(100) NOT NULL,
    album_id uuid REFERENCES albums(id),
    link VARCHAR NOT NULL,
    genre VARCHAR NOT NULL,
    pictures VARCHAR NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS ratings (
    id SERIAL PRIMARY KEY,
    song_id uuid REFERENCES songs(id),
    rating INT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);