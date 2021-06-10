import db from '../db';
import queries from '../db/queries/playlist';

const { createPlaylist } = queries;

/**
 * @class PlaylistModel
 */
class PlaylistModel {
  /**
   * This is a constructor for creating an instance of an playlist.
   * @param { Object } options - contains the required properties for creating
   * the playlist.
   * @returns { PlaylistModel } - An instance of the playlist.
   * @constructor PlaylistModel
   */
  constructor(options) {
    this.playlist_name = options.playlistName.toLowerCase().trim();
    this.owner_id = options.ownerId;
  }

  /**
   * Persists a new playlist to the DB.
   * @memberof PlaylistModel
   * @returns { Promise<Object | Error> } A promise that resolves or rejects
   * with an playlist object or a DB Error.
   */
  async save() {
    return db.one(createPlaylist, [
      this.playlist_name,
      this.owner_id,
    ]);
  }
}

export default PlaylistModel;
