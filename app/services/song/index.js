import db from '../../db';
import queries from '../../db/queries/song';

const {
  fetchSongById,
  fetchAllSongs,
  fetchSongByRating
} = queries;

/**
 * Contains a collection of service methods for managing Song resource on the app.
 * @class SongService
 *
 */
class SongService {
  /**
   * Fetches a Song by id
   * @memberof SongService
   * @param {string} id - id of Song
   * @returns { Promise<Array | Error> } A promise that resolves or rejects
   * with an Array of the Song resource or a DB Error.
   */
  static async getSongById(id) {
    return db.oneOrNone(fetchSongById, [id]);
  }

  /**
   * Fetches all songs
   * @memberof SongService
   * @returns { Promise<Array | Error> } A promise that resolves or rejects
   * with an Array of the Song resource or a DB Error.
   */
  static async getAllSongs() {
    return db.any(fetchAllSongs);
  }

  /**
   * Fetches all songs by rating
   * @params {number} data - rating to filter by
   * @memberof SongService
   * @returns { Promise<Array | Error> } A promise that resolves or rejects
   * with an Array of the Song resource or a DB Error.
   */
  static async getAllSongsByRating(data) {
    const { rating } = data;
    return db.manyOrNone(fetchSongByRating, [rating]);
  }
}
export default SongService;
