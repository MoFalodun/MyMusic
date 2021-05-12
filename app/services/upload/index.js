import fs from 'fs';
import { extname } from 'path';
import AWS from '../../../config/aws';

const { MYMUSIC_AWS_BUCKET, S3 } = AWS;

class UploadServices {
  /**
     *
     * @param {file} file - The path name to the file
     * @param {name} name - The original file name
     * @returns {Promise/Error} - it returns an object if everything is fine and otherwise
     */
  static async uploadConfig(file, name) {
    const content = fs.readFileSync(file);
    const ext = extname(name);
    const date = new Date();
    const fileName = `${date.valueOf()}${Math.random()
      .toString(32)
      .substring(2)}${ext}`;
    const params = {
      Bucket: MYMUSIC_AWS_BUCKET,
      Key: fileName,
      Body: content,
      ContentType: file.mimetype,
      ACL: 'public-read'
    };
    return S3.upload(params).promise();
  }
}
export default UploadServices;
