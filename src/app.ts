import express, { Express, Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import xss from 'xss-clean';
import { productRouter, clientRouter, saleRouter } from './routes';

export const app: Express = express();

// middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());

// security
app.use(xss());

// routes
app.use('/products', productRouter);
app.use('/clients', clientRouter);
app.use('/sales', saleRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});
