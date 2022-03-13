import express, { Application } from 'express';
import morgan from 'morgan';

import helmet from 'helmet'; // avoids header information leaks
import hpp from 'hpp'; // avoids parameter pollution attacks
import cors from 'cors';

export const configureMiddleware = async (app: Application) => {
  app.use(morgan('dev')); // loggea los datos de las request y los errores
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(hpp());
  app.use(helmet());
  app.use(cors({ origin: true, credentials: true }));
  console.log('🟢 Middlewares configured.');
};