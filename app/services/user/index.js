import db from '../../db';
import queries from '../../db/queries/user';

const {
  fetchUser,
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
   * @param { string } username - username of User
   * @returns { Promise<Array | Error> } A promise that resolves or rejects
   * with an Array of the User resource or a DB Error.
   */
  static async getUser(email, username) {
    const emailConverted = email || '';
    const userName = username || '';
    return db.oneOrNone(fetchUser, [emailConverted.toLowerCase(), userName.toLowerCase()]);
  }
}
export default UserService;
