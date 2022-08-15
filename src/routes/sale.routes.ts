import { Router } from 'express';
import { createSale, getSaleById, getSales, deleteSaleById } from '../controllers';
import { transformPaymentTerm } from '../middlewares';
import { updateSaleStatus } from '../middlewares/updateSaleStatus/updateSaleStatus';

export const saleRouter: Router = Router();

saleRouter.get('/', getSales);
saleRouter.get('/:id', getSaleById);
saleRouter.post('/', transformPaymentTerm, updateSaleStatus, createSale);
saleRouter.delete('/', deleteSaleById);
