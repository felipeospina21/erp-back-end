import { Sale, ISale, Product } from '../models';
import { Request, Response } from 'express';
import { createNewElement, findAll, findById, updateById } from '../services/mongoose';
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

export function updateSaleStatus(req: Request, res: Response) {
  const { id } = req.params;
  const { status, invoiceRef, discounts, creditNotes } = req.body as ISale;
  const sale = updateById(Sale, id, { status, invoiceRef, discounts, creditNotes });
  controllerResponse(sale, 200, 400, res);
}

export async function cancelSaleById(req: Request, res: Response) {
  const { id } = req.params;
  const { orderedProducts }: ISale = await updateById(Sale, id, { status: 'anulado' });

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

  controllerResponse(Promise.resolve({ message: 'sale canceled' }), 200, 400, res);
}
