import db from '../../db';
import queries from '../../db/queries/artist';

const {
  fetchArtist, fetchArtistById, updatePassword, updateArtist
} = queries;

/**
 * Contains a collection of service methods for managing Artist resource on the app.
 * @class ArtistService
 *
 */
class ArtistService {
  /**
   * Fetches a Artist by email
   * @memberof ArtistService
   * @param {string} email - email of artist
   * @param { string } artistName - name of the artist
   * @returns { Promise<Array | Error> } A promise that resolves or rejects
   * with an Array of the artist resource or a DB Error.
   */
  static async getArtist(email, artistName) {
    const emailConverted = email || '';
    const artist = artistName || '';
    return db.oneOrNone(fetchArtist, [emailConverted.toLowerCase(), artist.toLowerCase()]);
  }

  /**
   * Fetches a artist by id
   * @memberof ArtistService
   * @param {string} id - id
   * @returns { Promise<Array | Error> } A promise that resolves or rejects
   * with an Array of the artist resource or a DB Error.
   */
  static async getArtistById(id) {
    return db.oneOrNone(fetchArtistById, [id]);
  }

  /**
   * update a artist password
   * @memberof ArtistService
   * @param {string} id - id
   * @returns { Promise<Array | Error> } A promise that resolves or rejects
   * with an Array of the artist resource or a DB Error.
   */

  static async updateUserPassword(id, newPassword) {
    return db.one(updatePassword, [newPassword.hash, newPassword.salt, id]);
  }

  /**
   * Update artist profile
   * @memberof ArtistService
   * @param {Object} userData - Contains information to update
   * @returns { Promise<Array | Error> } A promise that resolves or rejects
   * with an Array of the artist resource or a DB Error.
   */
  static async updateProfile(userData) {
    const dbData = await db.one(fetchArtistById, [userData.id]);
    const data = { ...dbData, ...userData };
    return db.one(updateArtist, [
      data.artist_name,
      data.phone_number,
    ]);
  }
}
export default ArtistService;
