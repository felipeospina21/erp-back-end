import { Request, Response, NextFunction } from 'express';
import { IClient } from '../../models';

export interface ClientBody extends Omit<IClient, 'retailer'> {
  retailer: string;
}

export function transformRetailer(req: Request, res: Response, next: NextFunction) {
  const { retailer } = req.body as ClientBody;
  try {
    if (retailer === 'si') req.body.retailer = true;
    if (retailer === 'no') req.body.retailer = false;
    next();
  } catch (error) {
    res.status(400).json({ message: 'unidentified retailer option' });
  }
}
