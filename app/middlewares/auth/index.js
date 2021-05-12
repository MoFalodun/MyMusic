import { Helper, constants, ApiError } from '../../utils';

const { verifyToken, errorResponse } = Helper;
const {
  UNAVAILABLE_TOKEN,
  ERROR_VERIFYING_USER,
} = constants;

/**
 * A collection of middleware methods for authentication
 * of requests through protected routes.
 *
 * @class AuthMiddleware
 */
class AuthMiddleware {
  /**
   * authenticates a user's token credentials.
   * @static
   * @param { Object } req - The request from the endpoint.
   * @param { Object } res - The response returned by the method.
   * @param { function } next - Calls the next handle.
   * @returns { JSON | Null } - Returns error response if validation fails or Null if otherwise.
   * @memberof AuthMiddleware
   *
   */
  static async authenticate(req, res, next) {
    try {
      const { authorization } = req.headers;
      const token = authorization.split(' ')[1];
      const { err, data } = verifyToken(token);
      req.user = data;
      if (!authorization) {
        return errorResponse(req, res,
          new ApiError({ status: 401, message: UNAVAILABLE_TOKEN }));
      } if (err) {
        return errorResponse(req, res,
          new ApiError({ status: 401, message: UNAVAILABLE_TOKEN }));
      }
      return next();
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
}

export default AuthMiddleware;
