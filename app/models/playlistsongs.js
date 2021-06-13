import db from '../db';
import queries from '../db/queries/playlist';

const { createPlaylistSongs } = queries;

/**
 * @class PlaylistSongsModel
 */
class PlaylistSongsModel {
  /**
   * This is a constructor for creating an instance of an playlist song.
   * @param { Object } options - contains the required properties for adding a song
   * to a playlist.
   * @returns { PlaylistSongsModel } - An instance of the playlist.
   * @constructor PlaylistSongsModel
   */
  constructor(options) {
    this.song_id = options.songId;
    this.playlist_id = options.playlistId;
  }

  /**
   * Persists a new playlist song to the DB.
   * @memberof PlaylistSongsModel
   * @returns { Promise<Object | Error> } A promise that resolves or rejects
   * with an playlist object or a DB Error.
   */
  async save() {
    return db.one(createPlaylistSongs, [
      this.song_id,
      this.playlist_id,
    ]);
  }
}

export default PlaylistSongsModel;
