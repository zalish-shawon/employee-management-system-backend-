import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import routes from './routes';
import { errorHandler } from './middleware/error.middleware';
import { logger } from './middleware/logger.middleware';
import { config } from './config';

export const app = express();

app.use(helmet());
app.use(cors({ origin: config.FRONTEND_ORIGIN, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(logger);
app.use(rateLimit({ windowMs: 15*60*1000, max: 200 }));

app.use('/api', routes);

app.get('/', (req, res) => res.send('EMS Backend is running'));
app.use(errorHandler);
