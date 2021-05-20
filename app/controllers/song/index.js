import { SongModel } from '../../models';
import { Helper, constants, ApiError, DBError } from '../../utils';

const { RESOURCE_CREATE_SUCCESS, RESOURCE_CREATE_ERROR_STATUS } = constants;
const { successResponse } = Helper;

/**
 * @class SongController
 */

class SongController {
  /**
   * Controllers used for adding an song
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @param {Next} next
   * @returns { JSON } A JSON response containing the details of the Album & Song added
   * @memberof SongController
   */
  static async createSong(req, res, next) {
    try {
      const song = new SongModel({ ...req.body,
        artistId: req.user.id });
      await song.save();
      successResponse(res, {
        message: RESOURCE_CREATE_SUCCESS('Song'),
        status: 200
      });
    } catch (e) {
      const dbError = new DBError({
        status: RESOURCE_CREATE_ERROR_STATUS('Song'),
        message: e.message
      });
      Helper.moduleErrLogMessager(dbError);
      next(new ApiError({ message: RESOURCE_CREATE_ERROR_STATUS('Album') }));
    }
  }
}

export default SongController;
