import { Helper, constants, ApiError, DBError } from '../../utils';
import { UserModel, ArtistModel } from '../../models';
import { UserService, ArtistService } from '../../services';

const {
  USER_SIGNUP_ERROR,
  ARTIST_SIGNUP_ERROR_STATUS,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_ERROR_STATUS,
  USER_NOT_FOUND,
  LOGIN_USER_SUCCESSFULLY,
  USER_EMAIL_EXIST_VERIFICATION_FAIL,
  USER_EMAIL_EXIST_VERIFICATION_FAIL_MSG
} = constants;
const { successResponse, errorResponse, compareHash, addTokenToData } = Helper;
const { getUserByEmail } = UserService;
const { getArtistByEmail } = ArtistService;

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
      const data = await user.save();
      successResponse(res, {
        message: USER_SIGNUP_SUCCESS,
        data
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
      const data = await user.save();
      successResponse(res, {
        message: USER_SIGNUP_SUCCESS,
        data
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
  // eslint-disable-next-line max-lines-per-function
  static async userLogin(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await getUserByEmail(email);
      const token = addTokenToData({
        id: user.id,
        email,
        role: user.role,
      });
      if (user && compareHash(password, user.password)) {
        return successResponse(res, {
          message: LOGIN_USER_SUCCESSFULLY,
          data: {
            token,
            user
          }
        });
      }
      errorResponse(res, {
        message: USER_NOT_FOUND,
      });
    } catch (e) {
      const dbError = new DBError({
        status: USER_EMAIL_EXIST_VERIFICATION_FAIL,
        message: e.message
      });
      Helper.moduleErrLogMessager(dbError);
      next(new ApiError({ message: USER_EMAIL_EXIST_VERIFICATION_FAIL_MSG }));
    }
  }

  /**
   * Controllers used for logging in a artist
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @param {Next} next
   * @returns { JSON } A JSON response containing the details of the logged in user
   * @memberof AuthController
   */
  // eslint-disable-next-line max-lines-per-function
  static async artistLogin(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await getArtistByEmail(email);
      const token = addTokenToData({
        id: user.id,
        email,
        role: user.role,
      });
      if (user && compareHash(password, user.password)) {
        return successResponse(res, {
          message: LOGIN_USER_SUCCESSFULLY,
          data: {
            token,
            user
          }
        });
      }
      errorResponse(res, {
        message: USER_NOT_FOUND,
      });
    } catch (e) {
      const dbError = new DBError({
        status: USER_EMAIL_EXIST_VERIFICATION_FAIL,
        message: e.message
      });
      Helper.moduleErrLogMessager(dbError);
      next(new ApiError({ message: USER_EMAIL_EXIST_VERIFICATION_FAIL_MSG }));
    }
  }
}

export default AuthController;
