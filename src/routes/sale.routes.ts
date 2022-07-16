import { Router } from 'express';
import { createSale, getSaleById, getSales, deleteSaleById } from '../controllers';
import { transformPaymentTerm } from '../middlewares';

export const saleRouter: Router = Router();

saleRouter.get('/', getSales);
saleRouter.get('/:id', getSaleById);
saleRouter.post('/', transformPaymentTerm, createSale);
saleRouter.delete('/', deleteSaleById);
