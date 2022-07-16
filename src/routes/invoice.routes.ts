import { Router } from 'express';
import { updateInvoice, getInvoiceCountById } from '../controllers';

export const invoiceRouter: Router = Router();

invoiceRouter.get('/:id', getInvoiceCountById);
invoiceRouter.put('/', updateInvoice);
