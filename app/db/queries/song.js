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
  fetchSongsBYId: 'SELECT * FROM songs WHERE id = $1;',
  fetchSongsByArtist: 'SELECT * FROM songs WHERE artist_id ILIKE $1;',
  fetchAllSongs: 'SELECT * FROM songs',
  fetchSongByGenre: 'SELECT * FROM songs WHERE genre = "jazz"',
};
