import { Helper, constants, ApiError, DBError } from '../../utils';
import { UserModel, ArtistModel } from '../../models';

const {
  USER_SIGNUP_ERROR,
  ARTIST_SIGNUP_ERROR_STATUS,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_ERROR_STATUS,
  INVALID_EMAIL,
  LOGIN_USER_SUCCESSFULLY
} = constants;
const { successResponse, errorResponse, compareHash, addTokenToData } = Helper;
/**
 * @class AuthController
 */
class AuthController {
  /**
   * Controllers used for adding a user
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @param {Next} next
   * @returns { JSON } A JSON response containing the details of the user added
   * @memberof AuthController
   */
  static async userSignup(req, res, next) {
    try {
      const user = new UserModel({ ...req.body });
      await user.save();
      successResponse(res, {
        message: USER_SIGNUP_SUCCESS,
        status: 201
      });
    } catch (e) {
      const dbError = new DBError({
        status: USER_SIGNUP_ERROR_STATUS,
        message: e.message
      });
      Helper.moduleErrLogMessager(dbError);
      next(new ApiError({ message: USER_SIGNUP_ERROR }));
    }
  }

  /**
   * Controllers used for adding a user
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @param {Next} next
   * @returns { JSON } A JSON response containing the details of the user added
   * @memberof AuthController
   */
  static async artistSignup(req, res, next) {
    try {
      const user = new ArtistModel({ ...req.body });
      await user.save();
      successResponse(res, {
        message: USER_SIGNUP_SUCCESS,
        status: 201
      });
    } catch (e) {
      const dbError = new DBError({
        status: ARTIST_SIGNUP_ERROR_STATUS,
        message: e.message
      });
      Helper.moduleErrLogMessager(dbError);
      next(new ApiError({ message: USER_SIGNUP_ERROR }));
    }
  }

  /**
   * Controllers used for logging in a user
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @param {Next} next
   * @returns { JSON } A JSON response containing the details of the logged in user
   * @memberof AuthController
   */
  static async login(req, res, next) {
    const token = addTokenToData(req.user);
    const { password, ...user } = req.user;
    if (compareHash(req.body.password, password)) {
      return successResponse(res, {
        status: 200,
        message: LOGIN_USER_SUCCESSFULLY,
        data: {
          token,
          user
        }
      });
    }
    next(errorResponse(res, {
      message: INVALID_EMAIL, status: 401
    }));
  }
}

export default AuthController;
