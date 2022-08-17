import { Sale, ISale, Product } from '../models';
import { Request, Response } from 'express';
import { createNewElement, deletetById, findAll, findById, updateById } from '../services/mongoose';
import { controllerResponse } from '../utils';

export function createSale(req: Request, res: Response) {
  const payload: ISale = req.body;
  const newSale = createNewElement(Sale, payload);
  controllerResponse(newSale, 201, 400, res);
}

export function getSales(req: Request, res: Response) {
  const sales = findAll(Sale);
  controllerResponse(sales, 200, 400, res);
}

export function getSaleById(req: Request, res: Response) {
  const { id } = req.params;
  const sale = findById(Sale, id);
  controllerResponse(sale, 200, 400, res);
}

export async function deleteSaleById(req: Request, res: Response) {
  const { _id: id } = req.body;
  const { orderedProducts }: ISale = await deletetById(Sale, id);

  for (const { item, quantity } of orderedProducts) {
    const { stockAvailable: currentAvailable, stockReserved: currentReserved } = await findById(
      Product,
      item._id,
      'stockAvailable stockReserved'
    );
    await updateById(Product, item._id, {
      stockAvailable: currentAvailable + quantity,
      stockReserved: currentReserved - quantity,
    });
  }

  controllerResponse(Promise.resolve({ message: 'sale deleted' }), 200, 400, res);
}
