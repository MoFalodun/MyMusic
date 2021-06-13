import db from '../../db';
import queries from '../../db/queries/playlist';

const {
  fetchPlaylistByName,
  fetchPlaylistByOwner,
  fetchPlaylistSongs,
  fetchPlaylistLikes,
  fetchPlaylistById
} = queries;

/**
 * Contains a collection of service methods for managing Admin resource on the app.
 * @class UserService
 *
 */
class PlaylistService {
  /**
   * Fetches a playlist by the ownerId
   * @memberof PlaylistService
   * @param {string} playlistName - playlist
   * @param { string } ownerId - Id of the User
   * @returns { Promise<Array | Error> } A promise that resolves or rejects
   * with an Array of the playlist resource or a DB Error.
   */
  static async getPlaylist(playlistName, ownerId) {
    return db.oneOrNone(fetchPlaylistByName, [playlistName.toLowerCase().trim(), ownerId]);
  }

  /**
   * Fetches a playlist by the ownerId
   * @memberof PlaylistService
   * @param {string} playlistId - playlist
   * @param { string } ownerId - Id of the User
   * @returns { Promise<Array | Error> } A promise that resolves or rejects
   * with an Array of the playlist resource or a DB Error.
   */
  static async getPlaylistOwner(playlistId, ownerId) {
    return db.oneOrNone(fetchPlaylistByOwner, [playlistId, ownerId]);
  }

  /**
   * Fetches songs by the playlistId
   * @memberof PlaylistService
   * @param {string} playlistId - playlist to fetch
   * @returns { Promise<Array | Error> } A promise that resolves or rejects
   * with an Array of the playlist resource or a DB Error.
   */
  static async getPlaylistSongs(playlistId) {
    return db.any(fetchPlaylistSongs, [playlistId]);
  }

  /**
   * Fetches a playlist by the playlistId
   * @memberof PlaylistService
   * @param {string} playlistId - playlist to search by
   * @returns { Promise<Array | Error> } A promise that resolves or rejects
   * with an Array of the playlist resource or a DB Error.
   */
  static async getPlaylistById(id) {
    return db.oneOrNone(fetchPlaylistById, [id]);
  }

  /**
   * Fetches a playlist likes by the playlistId and the userId
   * @memberof PlaylistService
   * @param {string} playlistId - playlist to be like/dislike
   * @param {string} userId - Id of the User
   * @returns { Promise<Array | Error> } A promise that resolves or rejects
   * with an Array of the playlist resource or a DB Error.
   */
  static async getPlaylistLikes(playlistId, userId) {
    return db.oneOrNone(fetchPlaylistLikes, [playlistId, userId]);
  }
}
export default PlaylistService;
