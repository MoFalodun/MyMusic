/* Replace with your SQL commands */
CREATE TYPE song_genre AS ENUM (
  'Jazz',
  'Hip-Hop',
  'Classical',
  'Gospel',
  'Rock',
  'Soul',
  'Reggae',
  'R&B',
  'Country'
);
ALTER TABLE IF EXISTS albums ALTER COLUMN genre DROP NOT NULL;
ALTER TABLE IF EXISTS songs ALTER COLUMN genre DROP NOT NULL;

ALTER TABLE IF EXISTS albums ALTER COLUMN genre TYPE song_genre USING genre::song_genre;
ALTER TABLE IF EXISTS songs ALTER COLUMN genre TYPE song_genre USING genre::song_genre;
ALTER TABLE IF EXISTS songs ADD COLUMN song_time NUMERIC;