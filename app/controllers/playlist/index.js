import { PlaylistModel, PlaylistSongsModel, PlaylistLikesModel } from '../../models';
import { Helper, constants, ApiError, DBError } from '../../utils';
import { PlaylistService } from '../../services';

const { RESOURCE_CREATE_SUCCESS,
  RESOURCE_CREATE_ERROR_STATUS, RESOURCE_CREATE_ERROR_MSG,
  RESOURCE_UPDATE_SUCCESS,
  RESOURCE_UPDATE_ERROR_STATUS,
  RESOURCE_UPDATE_ERROR_MSG,
  RESOURCE_FETCH_ERROR,
  INTERNAL_SERVER_ERROR,
  RESOURCE_FETCH_SUCCESS
} = constants;
const { successResponse } = Helper;
const { errorResponse } = Helper;
const {
  getPlaylistSongs
} = PlaylistService;

/**
 * @class PlaylistController
 */

class PlaylistController {
  /**
   * Controllers used for creating a playlist
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @param {Next} next
   * @returns { JSON } A JSON response containing the details of the playlist created
   * @memberof PlaylistController
   */
  static async createPlaylist(req, res, next) {
    try {
      const playlist = new PlaylistModel({ ...req.body,
        ownerId: req.user.id
      });
      const data = await playlist.save();
      successResponse(res, {
        message: RESOURCE_CREATE_SUCCESS('Playlist'),
        code: 201,
        data
      });
    } catch (e) {
      const dbError = new DBError({
        status: RESOURCE_CREATE_ERROR_STATUS('Playlist'),
        message: e.message
      });
      Helper.moduleErrLogMessager(dbError);
      next(new ApiError({ message: RESOURCE_CREATE_ERROR_MSG('Playlist') }));
    }
  }

  /**
   * Controllers used for updating a playlist
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @param {Next} next
   * @returns { JSON } A JSON response containing the details of the playlist created
   * @memberof PlaylistController
   */
  static async addSongsToPlaylist(req, res, next) {
    try {
      const { id, playlistId } = req.query;
      const playlist = new PlaylistSongsModel({ songId: id, playlistId });
      await playlist.save();
      successResponse(res, {
        message: RESOURCE_UPDATE_SUCCESS('Playlist')
      });
    } catch (e) {
      const dbError = new DBError({
        status: RESOURCE_UPDATE_ERROR_STATUS('Playlist'),
        message: e.message
      });
      Helper.moduleErrLogMessager(dbError);
      next(new ApiError({ message: RESOURCE_UPDATE_ERROR_MSG('Playlist') }));
    }
  }

  /**
   * fetches all the songs in the playlist
   * @static
   * @param { Object } req - The request from the endpoint.
   * @param { Object } res - The response returned by the method.
   * @param { function } next - Calls the next handle.
   * @returns { JSON | Null } - Returns error response if validation fails or Null if otherwise.
   * @memberof PlaylistController
   *
   */
  static async getSongsOnPlaylist(req, res) {
    try {
      const playlistSongs = await getPlaylistSongs(req.playlist.id);
      successResponse(res, {
        message: RESOURCE_FETCH_SUCCESS('Playlist'),
        data: playlistSongs
      });
    } catch (e) {
      e.status = RESOURCE_FETCH_ERROR('Playlist');
      Helper.moduleErrLogMessager(e);
      errorResponse(
        req,
        res,
        new ApiError({ message: INTERNAL_SERVER_ERROR })
      );
    }
  }

  static async likePlaylist(req, res, next) {
    try {
      const playlistLike = new PlaylistLikesModel({
        userId: req.user.id,
        playlistId: req.params.id,
        decision: req.decision
      });
      await playlistLike.save();
      successResponse(res, {
        message: `Playlist ${req.decision}d successfully`,
      });
    } catch (e) {
      const dbError = new DBError({
        status: RESOURCE_CREATE_ERROR_STATUS('like'),
        message: e.message
      });
      Helper.moduleErrLogMessager(dbError);
      next(new ApiError({ message: RESOURCE_CREATE_ERROR_MSG('like') }));
    }
  }
}

export default PlaylistController;
