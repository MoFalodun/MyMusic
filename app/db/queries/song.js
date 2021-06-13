export default {
  createSong: `
    INSERT INTO songs(
      id,
      artist_id,
      name,
      lyrics,
      album_id,
      link,
      genre,
      pictures
    ) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;`,
  fetchSongByAlbum: 'SELECT * FROM songs WHERE album_id = $1;',
  fetchSongsByName: 'SELECT * FROM songs WHERE name ILIKE $1;',
  fetchSongById: 'SELECT * FROM songs WHERE id = $1;',
  fetchSongsByArtist: 'SELECT * FROM songs WHERE artist_id ILIKE $1;',
  fetchAllSongs: `SELECT s.id,  ROUND(AVG(rating), 2) AS rating, name FROM songs s
  JOIN ratings r ON r.song_id = s.id
  group by s.id`,
  fetchSongByRating: `SELECT * FROM (SELECT * FROM (SELECT ROUND(AVG(rating), 2) AS rating , song_id
                        FROM ratings GROUP BY song_id )
                        AS rate JOIN songs ON rate.song_id = songs.id) As rated WHERE rated.rating >= $1`,
  fetchSongByGenre: 'SELECT * FROM songs WHERE genre = $1',
};
