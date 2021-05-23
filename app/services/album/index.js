import db from '../../db';
import queries from '../../db/queries/album';

const {
  fetchAlbumById,
} = queries;

/**
 * Contains a collection of service methods for managing Album resource on the app.
 * @class AlbumService
 *
 */
class AlbumService {
/**
   * Fetches an album by id
   * @memberof AlbumService
   * @param {string} id - id
   * @returns { Promise<Array | Error> } A promise that resolves or rejects
   * with an Array of the Album resource or a DB Error.
   */
  static async getAlbumById(id) {
    return db.oneOrNone(fetchAlbumById, [id]);
  }
}
export default AlbumService;
