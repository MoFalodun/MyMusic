import { RatingModel } from '../../models';
import { Helper, constants, ApiError, DBError } from '../../utils';

const { RESOURCE_CREATE_SUCCESS,
  RESOURCE_CREATE_ERROR_STATUS, RESOURCE_CREATE_ERROR_MSG } = constants;
const { successResponse } = Helper;

/**
 * @class RatingController
 */

class RatingController {
  /**
   * Controllers used for adding a rating
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @param {Next} next
   * @returns { JSON } A JSON response containing the details of the rating added
   * @memberof RatingController
   */
  static async rate(req, res, next) {
    try {
      const rating = new RatingModel({ ...req.body, userId: req.user.id, songId: req.params.id });
      await rating.save();
      return successResponse(res, {
        message: RESOURCE_CREATE_SUCCESS('Rating'),
        code: 201,
        rating
      });
    } catch (e) {
      const dbError = new DBError({
        status: RESOURCE_CREATE_ERROR_STATUS('Rating'),
        message: e.message
      });
      Helper.moduleErrLogMessager(dbError);
      next(new ApiError({ message: RESOURCE_CREATE_ERROR_MSG('Rating') }));
    }
  }
}

export default RatingController;
