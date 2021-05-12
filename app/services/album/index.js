import db from '../../db';
import { AlbumModel, SongModel } from '../../models';

/**
 * Contains a collection of service methods for managing Album resource on the app.
 * @class AlbumService
 *
 */
class AlbumService {
  /**
   * Creates an Album
   * @memberof AlbumService
   * @param {object} data - properties of Album
   * @returns { Promise<Array | Error> } A promise that resolves or rejects
   * with an Array of the album resource or a DB Error.
   */
  static async createAlbumTransaction(data) {
    const { albumName, description,
      genre, pictures, artist_id, name, lyrics, link } = data;
    await db.tx(t => {
      const album = t.one(new AlbumModel({ artist_id,
        albumName,
        description,
        genre,
        pictures }));
      const song = t.one(new SongModel({
        artist_id, name, lyrics, link, genre, pictures }));
      return t.batch([album, song]);
    });
  }
}
export default AlbumService;
