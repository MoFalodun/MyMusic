import db from '../db';
import queries from '../db/queries/song';
import { Helper } from '../utils';

const { createSong } = queries;

/**
 * @class SongModel
 */
class SongModel {
  /**
   * This is a constructor for creating an instance of an song.
   * @param { Object } options - contains the required properties for creating
   * the song.
   * @returns { SongModel } - An instance of the song.
   * @constructor SongModel
   */
  constructor(options) {
    this.id = Helper.generateId();
    this.artist_id = options.artistId;
    this.name = options.name;
    this.lyrics = options.lyrics;
    this.album_id = options.albumId;
    this.link = options.link;
    this.genre = options.genre;
    this.pictures = options.pictures;
  }

  /**
   * Persists a new Artist to the DB.
   * @memberof SongModel
   * @returns { Promise<Object | Error> } A promise that resolves or rejects
   * with an Aritst object or a DB Error.
   */
  async save() {
    return db.one(createSong, [
      this.id,
      this.artist_id,
      this.name,
      this.lyrics,
      this.album_id,
      this.link,
      this.genre,
      this.pictures
    ]);
  }
}

export default SongModel;
