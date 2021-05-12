import db from '../db';
import queries from '../db/queries/user';
import { Helper } from '../utils';

const { createUser } = queries;

/**
 * @class UserModel
 */
class UserModel {
  /**
   * This is a constructor for creating an instance of an User.
   * @param { Object } options - contains the required properties for creating
   * the User.
   * @returns { UserModel } - An instance of the User profile.
   * @constructor UserModel
   */
  constructor(options) {
    this.id = Helper.generateId();
    this.first_name = options.firstName;
    this.last_name = options.lastName;
    this.email = options.email.toLowerCase();
    this.user_name = options.username.toLowerCase();
    this.password = Helper.hashString(options.password);
    this.phone_number = options.phoneNumber;
  }

  /**
   * Persists a new User to the DB.
   * @memberof UserModel
   * @returns { Promise<Object | Error> } A promise that resolves or rejects
   * with an User object or a DB Error.
   */
  async save() {
    return db.one(createUser, [
      this.id,
      this.first_name,
      this.last_name,
      this.email,
      this.user_name,
      this.password,
      this.phone_number,
    ]);
  }
}

export default UserModel;
