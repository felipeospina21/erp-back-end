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
app.use('/api/products', productRouter);
app.use('/api/clients', clientRouter);
app.use('/api/sales', saleRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});
