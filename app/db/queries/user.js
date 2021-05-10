export default {
  createUser: `
          INSERT INTO user_info(
              id,
              first_name,
              last_name,
              email,
              user_name,
              password,
              phone_number
          ) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *;
      `,

  fetchUserByEmail: 'SELECT * FROM user_info WHERE email ILIKE $1;',

  fetchUserByUsername: 'SELECT * FROM user_info WHERE email = $1;',

  fetchUserById: 'SELECT * FROM user_info WHERE id=$1;',

  updatePassword: `UPDATE user_info SET password=$1, updated_at=NOW() WHERE id = $2
     RETURNING id, first_name, last_name, email, address, phone_number`,

  updateUser: `UPDATE  user_info SET  first_name=$1, last_name=$2, user_name=$3, phone_number=$4, updated_at=NOW() WHERE id=$5  RETURNING id,
              first_name,
              last_name,
              email,
              user_name,
              phone_number`
};
