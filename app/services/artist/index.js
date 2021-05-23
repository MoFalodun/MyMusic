import db from '../../db';
import queries from '../../db/queries/artist';

const {
  fetchArtist,
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
}
export default ArtistService;
