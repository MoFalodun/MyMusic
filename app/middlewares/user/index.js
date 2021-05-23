import { Helper, constants, ApiError, genericErrors } from '../../utils';
import { UserService } from '../../services';

const {
  getUser,
} = UserService;

const { errorResponse } = Helper;
const {
  USER_ALREADY_EXIST,
  USER_EXIST_VERIFICATION_FAIL,
  USER_EMAIL_EXIST_VERIFICATION_FAIL,
  USER_EXIST_VERIFICATION_FAIL_MSG,
  USER_EMAIL_EXIST_VERIFICATION_FAIL_MSG
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
      req.user = await getUser(req.body.email, req.body.username);
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
      req.user = await getUser(req.body.email, req.body.username);
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
}
export default UserMiddleware;
