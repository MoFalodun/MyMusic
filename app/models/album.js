import db from '../db';
import queries from '../db/queries/album';
import { Helper } from '../utils';

const { createAlbum } = queries;

/**
 * @class AlbumModel
 */
class AlbumModel {
  /**
   * This is a constructor for creating an instance of an album.
   * @param { Object } options - contains the required properties for creating
   * the album.
   * @returns { AlbumModel } - An instance of the album.
   * @constructor AlbumModel
   */
  constructor(options) {
    this.id = Helper.generateId();
    this.artist_id = options.artistId;
    this.album_name = options.albumName;
    this.description = options.description;
    this.genre = options.genre;
    this.pictures = options.pictures;
  }

  /**
   * Persists a new song to the DB.
   * @memberof AlbumModel
   * @returns { Promise<Object | Error> } A promise that resolves or rejects
   * with an song object or a DB Error.
   */
  async save() {
    return db.one(createAlbum, [
      this.id,
      this.artist_id,
      this.album_name,
      this.description,
      this.genre,
      this.pictures
    ]);
  }
}

export default AlbumModel;
