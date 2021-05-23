export default {
  createAlbum: `
    INSERT INTO albums(
        id,
        artist_id,
        album_name,
        description,
        genre,
        pictures
    ) VALUES($1, $2, $3, $4, $5, $6) RETURNING *;
    `,
  fetchAlbumById: 'SELECT * FROM albums WHERE id=$1;',
};
