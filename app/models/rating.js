import db from '../db';
import queries from '../db/queries/rating';

const { createRating } = queries;

/**
 * @class RatingModel
 */
class RatingModel {
  /**
   * This is a constructor for creating an instance of a user rating.
   * @param { Object } options - contains the required properties for creating
   * the album.
   * @returns { RatingModel } - An instance of the rating.
   * @constructor RatingModel
   */
  constructor(options) {
    this.song_id = options.songId;
    this.rating = options.rating;
    this.user_id = options.userId;
  }

  /**
   * Persists a new song to the DB.
   * @memberof AlbumModel
   * @returns { Promise<Object | Error> } A promise that resolves or rejects
   * with an song object or a DB Error.
   */
  async save() {
    return db.one(createRating, [
      this.song_id,
      this.rating,
      this.user_id,
    ]);
  }
}

export default RatingModel;
