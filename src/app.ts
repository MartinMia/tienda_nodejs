import express, { Application } from 'express';
import { registeredRoutes } from './routes';
import { configureDatabase } from '../database/connection';
import { configureMiddleware } from './middlewares';
import 'dotenv/config';

const app: Application = express();
const port = process.env.PORT || 5000;

app.set('port', port);
configureMiddleware(app);
configureDatabase();
registeredRoutes(app);
// app.use(globalHandler);
export default app;
