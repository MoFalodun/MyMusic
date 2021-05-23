import { Helper, constants, ApiError } from '../../utils';
import { UploadServices } from '../../services';

const { uploadConfig } = UploadServices;

const { errorResponse } = Helper;
const {
  RESOURCE_UPLOAD_ERROR_MSG, RESOURCE_UPLOAD_ERROR_STATUS
} = constants;

/**
   * A collection of middleware methods for file upload
   * through protected routes.
   *
   * @class UploadMiddleware
   */
class UploadMiddleware {
  /**
     * Upload the pictures and music and returns the links
     * @static
     * @param { Object } req - The request from the endpoint.
     * @param { Object } res - The response returned by the method.
     * @param { function } next - Calls the next handle.
     * @returns { JSON | Null } - Returns error response if validation fails or Null if otherwise.
     * @memberof UploadMiddleware
     *
     */
  static async fileUpload(req, res, next) {
    try {
      const { tempFilePath: picturePath, name: pictureFileName } = req.files.pictures;
      const { tempFilePath: musicPath, name: musicFileName } = req.files.music;
      const [pictures, music] = await Promise.all([uploadConfig(picturePath, pictureFileName),
        uploadConfig(musicPath, musicFileName)]);
      req.body.pictures = pictures.Location;
      req.body.link = music.Location;
      next();
    } catch (e) {
      e.status = RESOURCE_UPLOAD_ERROR_STATUS('MEDIA');
      Helper.moduleErrLogMessager(e);
      errorResponse(
        req,
        res,
        new ApiError({ message: RESOURCE_UPLOAD_ERROR_MSG('MEDIA') })
      );
    }
  }
}
export default UploadMiddleware;
