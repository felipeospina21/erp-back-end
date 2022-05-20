import { Router } from 'express';
import { updateInvoice } from '../controllers';

export const invoiceRouter: Router = Router();

invoiceRouter.put('/', updateInvoice);
