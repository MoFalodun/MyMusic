export default {
  createRating: `
      INSERT INTO ratings(
          song_id,
          rating,
          user_id
      ) VALUES($1, $2, $3) RETURNING *;
      `,
};
