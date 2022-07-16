import { Router } from 'express';
import { createWithholdingTax, updateWithholdingTax, getWithholdingTaxes, getWithholdingTaxById } from '../controllers';

export const withholdingTaxRouter: Router = Router();

withholdingTaxRouter.post('/', createWithholdingTax);
withholdingTaxRouter.put('/', updateWithholdingTax);
withholdingTaxRouter.get('/', getWithholdingTaxes);
withholdingTaxRouter.get('/:id', getWithholdingTaxById);
