export default {
  createArtist: `
            INSERT INTO artist_info(
                id,
                artist_name,
                email,
                password
            ) VALUES($1, $2, $3, $4) RETURNING *;
        `,

  fetchArtist: 'SELECT * FROM artist_info WHERE email = $1 OR artist_name = $2;',

  fetchArtistByArtistName: 'SELECT * FROM artist_info WHERE email = $1;',

  fetchArtistById: 'SELECT * FROM artist_info WHERE id=$1;',

  updatePassword: `UPDATE artist_info SET password=$1, updated_at=NOW() WHERE id = $2
       RETURNING id, artist_name, email`,

  updateArtist: `UPDATE  artist_info SET  artist_name=$1, updated_at=NOW() WHERE id=$3  RETURNING id,
                artist_name,
                email`,
  fetchAllArtists: 'SELECT * FROM artists',
};
