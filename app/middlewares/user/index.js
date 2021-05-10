import { Helper, constants, ApiError, genericErrors } from '../../utils';
import { UserService } from '../../services';

const {
  getUserByEmail,
  getUserById,
  getUserByUserName,
} = UserService;

const { errorResponse } = Helper;
const {
  INVALID_EMAIL,
  ERROR_VERIFYING_USER,
  INVALID_USER_ID,
  USER_ALREADY_EXIST,
  USER_EXIST_VERIFICATION_FAIL,
  USER_EMAIL_EXIST_VERIFICATION_FAIL,
  USER_EXIST_VERIFICATION_FAIL_MSG,
  USER_NOT_FOUND,
  USER_EMAIL_EXIST_VERIFICATION_FAIL_MSG,
  USERNAME_ALREADY_EXIST
} = constants;

/**
 * A collection of middleware methods for user
 * of requests through protected routes.
 *
 * @class UserMiddleware
 */
class UserMiddleware {
  /**
   * Validates user's login credentials, with emphasis on the
   * existence of a user with the provided email address.
   * @static
   * @param { Object } req - The request from the endpoint.
   * @param { Object } res - The response returned by the method.
   * @param { function } next - Calls the next handle.
   * @returns { JSON | Null } - Returns error response if validation fails or Null if otherwise.
   * @memberof UserMiddleware
   *
   */
  static async userLoginEmailValidator(req, res, next) {
    try {
      req.user = await getUserByEmail(req.body.email);
      return req.user
        ? next()
        : errorResponse(req, res, genericErrors.inValidLogin);
    } catch (e) {
      e.status = USER_EMAIL_EXIST_VERIFICATION_FAIL;
      Helper.moduleErrLogMessager(e);
      errorResponse(
        req,
        res,
        new ApiError({ message: USER_EMAIL_EXIST_VERIFICATION_FAIL_MSG })
      );
    }
  }

  static async checkIfUserExistById(req, res, next) {
    try {
      req.user = await getUserById(req.data.id);
      return req.user
        ? next()
        : errorResponse(
          req,
          res,
          new ApiError({ status: 400, message: INVALID_USER_ID })
        );
    } catch (e) {
      e.status = ERROR_VERIFYING_USER;
      Helper.moduleErrLogMessager(e);
      errorResponse(
        req,
        res,
        new ApiError({ message: ERROR_VERIFYING_USER })
      );
    }
  }

  static async findUserByEmail(req, res, next) {
    try {
      req.data = await getUserByEmail(req.body.email);
      return req.data
        ? next()
        : errorResponse(
          req,
          res,
          new ApiError({ status: 400, message: INVALID_EMAIL })
        );
    } catch (e) {
      e.status = ERROR_VERIFYING_USER;
      Helper.moduleErrLogMessager(e);
      errorResponse(
        req,
        res,
        new ApiError({ message: ERROR_VERIFYING_USER })
      );
    }
  }

  /**
   * Validates user, with emphasis on the
   * existence of a user with the provided user email.
   * @static
   * @param { Object } req - The request from the endpoint.
   * @param { Object } res - The response returned by the method.
   * @param { function } next - Calls the next handle.
   * @returns { JSON | Null } - Returns error response if validation fails or Null if otherwise.
   * @memberof UserMiddleware
   *
   */
  static async checkIfUserExistsByEmail(req, res, next) {
    try {
      req.user = await getUserByEmail(req.body.email);
      return req.user
        ? errorResponse(req, res, new ApiError({ status: 409, message: USER_ALREADY_EXIST }))
        : next();
    } catch (e) {
      e.status = USER_EXIST_VERIFICATION_FAIL;
      Helper.moduleErrLogMessager(e);
      errorResponse(req, res,
        new ApiError({ message: USER_EXIST_VERIFICATION_FAIL_MSG }));
    }
  }

  /**
   * Validates user, with emphasis on the
   * existence of a user with the provided user username.
   * @static
   * @param { Object } req - The request from the endpoint.
   * @param { Object } res - The response returned by the method.
   * @param { function } next - Calls the next handle.
   * @returns { JSON | Null } - Returns error response if validation fails or Null if otherwise.
   * @memberof UserMiddleware
   *
   */
  static async checkIfUserExistsByUsername(req, res, next) {
    try {
      req.user = await getUserByUserName(req.body.userName);
      return req.user
        ? errorResponse(req, res, new ApiError({ status: 409, message: USERNAME_ALREADY_EXIST }))
        : next();
    } catch (e) {
      e.status = USER_EXIST_VERIFICATION_FAIL;
      Helper.moduleErrLogMessager(e);
      errorResponse(req, res,
        new ApiError({ message: USER_EXIST_VERIFICATION_FAIL_MSG }));
    }
  }

  /**
   * Validates user, with emphasis on the
   * existence of a user with the provided user id.
   * @static
   * @param { Object } req - The request from the endpoint.
   * @param { Object } res - The response returned by the method.
   * @param { function } next - Calls the next handle.
   * @returns { JSON | Null } - Returns error response if validation fails or Null if otherwise.
   * @memberof UserMiddleware
   *
   */
  static async checkIfUserExistsById(req, res, next) {
    try {
      req.merchant = await getUserById(req.params.merchantId);
      return req.merchant
        ? next()
        : errorResponse(req, res, new ApiError({ status: 404, message: USER_NOT_FOUND }));
    } catch (e) {
      e.status = USER_EXIST_VERIFICATION_FAIL;
      Helper.moduleErrLogMessager(e);
      errorResponse(req, res,
        new ApiError({ message: USER_EXIST_VERIFICATION_FAIL_MSG }));
    }
  }
}
export default UserMiddleware;
