/* eslint-disable no-console */
import express from 'express';
import dotenv from 'dotenv';
import { appConfig } from './config';
import Logger from './config/logger';

global.logger = Logger.createLogger({ label: 'MYMUSIC_API' });

dotenv.config();

const app = express();

appConfig(app);

export default app;
