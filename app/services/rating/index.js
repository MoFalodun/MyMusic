import db from '../../db';
import queries from '../../db/queries/rating';

const {
  fetchRatingBySong,
} = queries;

/**
 * Contains a collection of service methods for managing rating resource on the app.
 * @class RatingService
 *
 */
class RatingService {
  /**
   * Fetches a song rating by id
   * @memberof RatingService
   * @param {string} songId - id of Song
   * @returns { Promise<Array | Error> } A promise that resolves or rejects
   * with an Array of the rating resource or a DB Error.
   */
  static async getSongRating(songId) {
    return db.oneOrNone(fetchRatingBySong, [songId]);
  }
}
export default RatingService;
