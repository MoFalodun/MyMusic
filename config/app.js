/* eslint-disable no-unused-vars */
import morgan from 'morgan';
import expressFileUpload from 'express-fileupload';
import { json, urlencoded } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import config from './env';
import router from '../app/routes';
import { Helper, genericErrors, constants } from '../app/utils';

const { errorResponse, successResponse } = Helper;
const { notFoundApi } = genericErrors;

const {
  WELCOME,
  MYMUSIC_RUNNING
} = constants;

const appConfig = (app) => {
  app.use(morgan('combined', { stream: logger.stream }));
  app.use(helmet());
  app.use(cors());
  app.use(json());
  app.use(urlencoded({ extended: true }));
  app.use(expressFileUpload({ useTempFiles: true }));
  app.use(router);

  app.get('/', (req, res) => successResponse(res, { message: WELCOME }));
  app.use((req, res, next) => {
    next(notFoundApi);
  });
  app.use((err, req, res, next) => errorResponse(req, res, err));
  const port = config.PORT || 3500;
  app.listen(port, () => {
    logger.info(`${MYMUSIC_RUNNING} ${port}`);
  });
};

export default appConfig;
