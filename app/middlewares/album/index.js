import { Helper, constants, ApiError } from '../../utils';
import { AlbumService } from '../../services';

const {
  getAlbumById,
} = AlbumService;

const { errorResponse } = Helper;
const {
  ALBUM_NOT_FOUND,
  ALBUM_EXIST_VERIFICATION_FAIL,
  INTERNAL_SERVER_ERROR
} = constants;

/**
 * A collection of middleware methods for user
 * of requests through protected routes.
 *
 * @class UserMiddleware
 */
class AlbumMiddleware {
  /**
   * Validates album, with emphasis on the
   * existence of a album with the provided album id.
   * @static
   * @param { Object } req - The request from the endpoint.
   * @param { Object } res - The response returned by the method.
   * @param { function } next - Calls the next handle.
   * @returns { JSON | Null } - Returns error response if validation fails or Null if otherwise.
   * @memberof AlbumMiddleware
   *
   */
  static async checkIfAlbumExists(req, res, next) {
    try {
      if (!req.body.albumId) {
        return next();
      }
      req.data = await getAlbumById(req.body.albumId);
      return req.data
        ? next()
        : errorResponse(req, res, new ApiError({ status: 409, message: ALBUM_NOT_FOUND }));
    } catch (e) {
      e.status = ALBUM_EXIST_VERIFICATION_FAIL;
      Helper.moduleErrLogMessager(e);
      errorResponse(req, res,
        new ApiError({ message: INTERNAL_SERVER_ERROR }));
    }
  }
}
export default AlbumMiddleware;
