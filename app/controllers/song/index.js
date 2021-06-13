import { SongModel } from '../../models';
import { RatingService, SongService } from '../../services';
import { Helper, constants, ApiError, DBError } from '../../utils';

const { RESOURCE_CREATE_SUCCESS,
  RESOURCE_CREATE_ERROR_STATUS, RESOURCE_CREATE_ERROR_MSG,
  RESOURCE_FETCH_ERROR,
  INTERNAL_SERVER_ERROR,
  RESOURCE_FETCH_SUCCESS
} = constants;
const { successResponse } = Helper;
const { errorResponse } = Helper;
const { getSongById, getAllSongs, getAllSongsByRating } = SongService;
const { getSongRating } = RatingService;

/**
 * @class SongController
 */

class SongController {
  /**
   * Controllers used for adding a song
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
      const data = await song.save();
      successResponse(res, {
        message: RESOURCE_CREATE_SUCCESS('Song'),
        code: 201,
        data
      });
    } catch (e) {
      const dbError = new DBError({
        status: RESOURCE_CREATE_ERROR_STATUS('Song'),
        message: e.message
      });
      Helper.moduleErrLogMessager(dbError);
      next(new ApiError({ message: RESOURCE_CREATE_ERROR_MSG('Song') }));
    }
  }
  /**
   * Controllers used for fetching a song
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @param {Next} next
   * @returns { JSON } A JSON response containing the details of the song
   * @memberof SongController
   */

  static async fetchSong(req, res) {
    try {
      const song = await getSongById(req.params.id);
      const { rating } = await getSongRating(req.params.id);
      successResponse(res, {
        message: RESOURCE_FETCH_SUCCESS('Song'),
        data: { ...song, rating: parseFloat(rating, 10).toFixed(1) || null },
      });
    } catch (e) {
      e.status = RESOURCE_FETCH_ERROR('Song');
      Helper.moduleErrLogMessager(e);
      errorResponse(req, res,
        new ApiError({ message: INTERNAL_SERVER_ERROR }));
    }
  }

  /**
   * Controllers used for fetching all songs
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @param {Next} next
   * @returns { JSON } A JSON response containing the details of the songs
   * @memberof SongController
   */

  static async fetchAllSongs(req, res) {
    try {
      const songs = await getAllSongs();
      successResponse(res, {
        message: RESOURCE_FETCH_SUCCESS('Songs'),
        data: songs
      });
    } catch (e) {
      e.status = RESOURCE_FETCH_ERROR('Songs');
      Helper.moduleErrLogMessager(e);
      errorResponse(req, res,
        new ApiError({ message: INTERNAL_SERVER_ERROR }));
    }
  }

  /**
   * Controllers used for fetching all songs
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @param {Next} next
   * @returns { JSON } A JSON response containing the details of the songs
   * @memberof SongController
   */

  static async fetchAllSongsByRating(req, res) {
    try {
      const songs = await getAllSongsByRating({ rating: req.body.rating });
      successResponse(res, {
        message: RESOURCE_FETCH_SUCCESS('Songs'),
        data: songs
      });
    } catch (e) {
      e.status = RESOURCE_FETCH_ERROR('Songs');
      Helper.moduleErrLogMessager(e);
      errorResponse(req, res,
        new ApiError({ message: INTERNAL_SERVER_ERROR }));
    }
  }
}

export default SongController;
