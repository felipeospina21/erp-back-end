import { Router } from 'express';
import { createSale, getSaleById, getSales, cancelSaleById } from '../controllers';
import { transformPaymentTerm } from '../middlewares';
import { updateSaleStatus } from '../middlewares/updateSaleStatus/updateSaleStatus';

export const saleRouter: Router = Router();

saleRouter.get('/', getSales);
saleRouter.get('/:id', getSaleById);
saleRouter.put('/cancelDoc/:id', cancelSaleById);
saleRouter.post('/', transformPaymentTerm, updateSaleStatus, createSale);
