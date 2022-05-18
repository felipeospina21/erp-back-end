import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Express } from 'express';
import morgan from 'morgan';
import xss from 'xss-clean';
import { isAuthenticated } from './middlewares';
import { clientRouter, productRouter, saleRouter, userRouter } from './routes';

export const app: Express = express();

// middlewares
app.use(
  cors({
    origin: 'http://localhost:3000',
    allowedHeaders: ['Access-Control-Allow-Headers', 'Set-Cookie'],
    credentials: true,
  })
);
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());

// security
app.use(xss());

// routes
app.use('/api/products', isAuthenticated, productRouter);
app.use('/api/clients', isAuthenticated, clientRouter);
app.use('/api/sales', isAuthenticated, saleRouter);
app.use('/api/user', userRouter);
