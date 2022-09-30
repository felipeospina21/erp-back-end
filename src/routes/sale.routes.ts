import { Router } from 'express';
import { createSale, getSaleById, getSales, cancelSaleById, updateSaleStatus } from '../controllers';
import { transformPaymentTerm } from '../middlewares';
import { updateStatusOnSale } from '../middlewares/updateStatusOnSale/updateStatusOnSale';

export const saleRouter: Router = Router();

saleRouter.get('/', getSales);
saleRouter.get('/:id', getSaleById);
saleRouter.put('/cancelDoc/:id', cancelSaleById);
saleRouter.put('/updateStatus/:id', updateSaleStatus);
saleRouter.post('/', transformPaymentTerm, updateStatusOnSale, createSale);
