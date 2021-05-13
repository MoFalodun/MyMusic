import { S3 as _S3 } from 'aws-sdk';
import config from '../env';

const { MYMUSIC_AWS_ACCESS_KEY, MYMUSIC_AWS_SECRET_KEY, MYMUSIC_AWS_BUCKET
} = config;
const S3 = new _S3({
  accessKeyId: MYMUSIC_AWS_ACCESS_KEY,
  secretAccessKey: MYMUSIC_AWS_SECRET_KEY,
  ACL: 'public-read'
});

export default { MYMUSIC_AWS_BUCKET, S3 };
