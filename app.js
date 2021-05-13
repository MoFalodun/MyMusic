import express from 'express';
import { appConfig } from './config';
import Logger from './config/logger';

global.logger = Logger.createLogger({ label: 'MYMUSIC_API' });

const app = express();

appConfig(app);

export default app;
