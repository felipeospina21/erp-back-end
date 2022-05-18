import express, { Express, Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import xss from 'xss-clean';
import { productRouter, clientRouter, saleRouter, userRouter } from './routes';
import { isAuthenticated } from './middlewares';
import cookieParser from 'cookie-parser';

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
app.use('/api/clients', clientRouter);
app.use('/api/sales', saleRouter);
app.use('/api/user', userRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});
