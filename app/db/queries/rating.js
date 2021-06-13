export default {
  createRating: `
      INSERT INTO ratings(
          song_id,
          rating,
          user_id
      ) VALUES($1, $2, $3)
      ON CONFLICT ON CONSTRAINT uniq_user_id_per_song
      DO
      UPDATE
      SET
      rating = EXCLUDED.rating
      RETURNING *;
      `,
  fetchRatingBySong: 'SELECT AVG(rating) AS rating FROM ratings WHERE song_id = $1;',
};
