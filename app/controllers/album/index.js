import { AlbumModel } from '../../models';
import { Helper, constants, ApiError, DBError } from '../../utils';

const { RESOURCE_CREATE_SUCCESS,
  RESOURCE_CREATE_ERROR_STATUS, RESOURCE_CREATE_ERROR_MSG } = constants;
const { successResponse } = Helper;

/**
 * @class AlbumController
 */

class AlbumController {
  /**
   * Controllers used for adding an album
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @param {Next} next
   * @returns { JSON } A JSON response containing the details of the Album added
   * @memberof AlbumController
   */
  static async createAlbum(req, res, next) {
    try {
      const { id } = req.user;
      const album = new AlbumModel({ ...req.body, artistId: id });
      const data = await album.save();
      successResponse(res, {
        message: RESOURCE_CREATE_SUCCESS('Album'),
        code: 201,
        data
      });
    } catch (e) {
      const dbError = new DBError({
        status: RESOURCE_CREATE_ERROR_STATUS('Album'),
        message: e.message
      });
      Helper.moduleErrLogMessager(dbError);
      next(new ApiError({ message: RESOURCE_CREATE_ERROR_MSG('Album') }));
    }
  }
}

export default AlbumController;
