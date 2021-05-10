import db from '../../db';
import queries from '../../db/queries/user';

const {
  fetchUserByEmail, fetchUserByUsername, fetchUserById, updatePassword, updateUser
} = queries;

/**
 * Contains a collection of service methods for managing Admin resource on the app.
 * @class UserService
 *
 */
class UserService {
  /**
   * Fetches a user by email
   * @memberof UserService
   * @param {string} email - email of User
   * @returns { Promise<Array | Error> } A promise that resolves or rejects
   * with an Array of the User resource or a DB Error.
   */
  static async getUserByEmail(email) {
    return db.oneOrNone(fetchUserByEmail, [email.toLowerCase()]);
  }

  /**
   * Fetches a user by id
   * @memberof UserService
   * @param {string} id - id
   * @returns { Promise<Array | Error> } A promise that resolves or rejects
   * with an Array of the User resource or a DB Error.
   */
  static async getUserById(id) {
    return db.oneOrNone(fetchUserById, [id]);
  }

  /**
   * Fetches a user by username
   * @memberof UserService
   * @param {string} id - id
   * @returns { Promise<Array | Error> } A promise that resolves or rejects
   * with an Array of the User resource or a DB Error.
   */
  static async getUserByUserName(id) {
    return db.oneOrNone(fetchUserByUsername, [id]);
  }

  /**
   * update a user password
   * @memberof UserService
   * @param {string} id - id
   * @returns { Promise<Array | Error> } A promise that resolves or rejects
   * with an Array of the User resource or a DB Error.
   */

  static async updateUserPassword(id, newPassword) {
    return db.one(updatePassword, [newPassword.hash, newPassword.salt, id]);
  }

  /**
   * Update merchant profile
   * @memberof MerchantService
   * @param {Object} userData - Contains information to update
   * @returns { Promise<Array | Error> } A promise that resolves or rejects
   * with an Array of the User resource or a DB Error.
   */
  static async updateProfile(userData) {
    const dbData = await db.one(fetchUserById, [userData.id]);
    const data = { ...dbData, ...userData };
    return db.one(updateUser, [
      data.first_name,
      data.last_name,
      data.user_name,
      data.phone_number,
    ]);
  }
}
export default UserService;
