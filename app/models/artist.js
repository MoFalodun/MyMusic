import db from '../db';
import queries from '../db/queries/artist';
import { Helper } from '../utils';

const { createArtist } = queries;

/**
 * @class UserModel
 */
class ArtistModel {
  /**
   * This is a constructor for creating an instance of an artist.
   * @param { Object } options - contains the required properties for creating
   * the User.
   * @returns { ArtistModel } - An instance of the User profile.
   * @constructor ArtistModel
   */
  constructor(options) {
    this.id = Helper.generateId();
    this.artist_name = options.artistName;
    this.email = options.email.toLowerCase();
    this.password = Helper.hashString(options.password);
  }

  /**
   * Persists a new Artist to the DB.
   * @memberof ArtistModel
   * @returns { Promise<Object | Error> } A promise that resolves or rejects
   * with an Aritst object or a DB Error.
   */
  async save() {
    return db.one(createArtist, [
      this.id,
      this.artist_name,
      this.email,
      this.password,
    ]);
  }
}

export default ArtistModel;
