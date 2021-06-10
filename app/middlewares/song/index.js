import { Helper, constants, ApiError } from '../../utils';
import { SongService } from '../../services';

const {
  getSongById,
} = SongService;

const { errorResponse } = Helper;
const {
  RESOURCE_NOT_EXISTS,
  RESOURCE_EXISTS_VERIFICATION_FAIL,
  RESOURCE_EXISTS_VERIFICATION_FAIL_MSG,
} = constants;

/**
 * A collection of middleware methods for songs
 * of requests through protected routes.
 *
 * @class SongMiddleware
 */
class SongMiddleware {
  /**
   * Validates a song, with emphasis on the id.
   * @static
   * @param { Object } req - The request from the endpoint.
   * @param { Object } res - The response returned by the method.
   * @param { function } next - Calls the next handle.
   * @returns { JSON | Null } - Returns error response if validation fails or Null if otherwise.
   * @memberof SongMiddleware
   *
   */
  static async checkIfSongExist(req, res, next) {
    try {
      const song = await getSongById(req.query.songId || req.params.id);
      return song
        ? next()
        : errorResponse(req, res, new ApiError({ status: 409, message: RESOURCE_NOT_EXISTS('Song') }));
    } catch (e) {
      e.status = RESOURCE_EXISTS_VERIFICATION_FAIL('Song');
      Helper.moduleErrLogMessager(e);
      errorResponse(
        req,
        res,
        new ApiError({ message: RESOURCE_EXISTS_VERIFICATION_FAIL_MSG('Song') })
      );
    }
  }
}
export default SongMiddleware;
