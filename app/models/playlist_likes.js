import db from '../db';
import queries from '../db/queries/playlist';

const { createPlaylistLikes } = queries;

/**
 * @class PlaylistLikesModel
 */
class PlaylistLikesModel {
  /**
   * This is a constructor for creating an instance of a like for playlist song.
   * @param { Object } options - contains the required properties for adding a like
   * to a playlist.
   * @returns { PlaylistLikesModel } - An instance of the playlist.
   * @constructor PlaylistLikesModel
   */
  constructor(options) {
    this.user_id = options.userId;
    this.playlist_id = options.playlistId;
    this.decision = options.decision;
  }

  /**
   * Persists a new playlist song to the DB.
   * @memberof PlaylistLikesModel
   * @returns { Promise<Object | Error> } A promise that resolves or rejects
   * with an playlist object or a DB Error.
   */
  async save() {
    return db.one(createPlaylistLikes, [
      this.user_id,
      this.playlist_id,
      this.decision,
    ]);
  }
}

export default PlaylistLikesModel;
