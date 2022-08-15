import { Request, Response, NextFunction } from 'express';
import { IOrderedProduct, ISale, Product } from '../../models';
import { findById } from '../../services';

interface OrderedProduct extends Omit<IOrderedProduct, 'item'> {
  item: string;
}

interface SaleBody extends Omit<ISale, 'orderedProducts'> {
  orderedProducts: OrderedProduct[];
}
export async function updateSaleStatus(req: Request, res: Response, next: NextFunction) {
  const { orderedProducts } = req.body as SaleBody;
  try {
    for await (const { item, quantity } of orderedProducts) {
      const { stockAvailable } = await findById(Product, item, 'stockAvailable -_id -category');
      if (quantity > stockAvailable) {
        req.body.status = 'producción';
        break;
      } else {
        req.body.status = 'alistamiento';
      }
    }
    next();
  } catch (error) {
    res.status(400).json({ message: 'unidentified retailer option' });
  }
}
