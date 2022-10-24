import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Express } from 'express';
import morgan from 'morgan';
import xss from 'xss-clean';
import { isAuthenticated } from './middlewares';
import {
  clientRouter,
  productRouter,
  saleRouter,
  userRouter,
  invoiceRouter,
  categoryRouter,
  withholdingTaxRouter,
  consecutiveRouter,
  homeRouter,
} from './routes';

export const app: Express = express();

// middlewares
app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'https://erp-dlt.vercel.app',
      'https://erp-dlt-dev.vercel.app',
      'https://erp-felipeospina21.vercel.app',
    ],
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
    allowedHeaders: ['Access-Control-Allow-Headers', 'Set-Cookie', 'Content-Type'],
    credentials: true,
  })
);
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());

// security
app.use(xss());

// routes
app.use('/', homeRouter);
app.use('/api/products', isAuthenticated, productRouter);
app.use('/api/clients', isAuthenticated, clientRouter);
app.use('/api/sales', isAuthenticated, saleRouter);
app.use('/api/invoice', isAuthenticated, invoiceRouter);
app.use('/api/consecutive', isAuthenticated, consecutiveRouter);
app.use('/api/category', isAuthenticated, categoryRouter);
app.use('/api/tax', isAuthenticated, withholdingTaxRouter);
app.use('/api/user', userRouter);
