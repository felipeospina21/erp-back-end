import { Request, Response, NextFunction } from 'express';
import { ISale } from '../../models';

export interface SaleBody extends Omit<ISale, 'paymentTerm'> {
  paymentTerm: string;
}

export function transformPaymentTerm(req: Request, res: Response, next: NextFunction) {
  const { paymentTerm } = req.body as SaleBody;
  try {
    if (paymentTerm.toLowerCase() === 'contado') {
      req.body.paymentTerm = 0;
    } else {
      req.body.paymentTerm = parseInt(paymentTerm);
    }
    next();
  } catch (error) {
    res.status(400).json({ message: 'unidentified payment term' });
  }
}
