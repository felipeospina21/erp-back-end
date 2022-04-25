import { Sale, ISale } from '../models';
import { Request, Response } from 'express';
import { createNewElement, deletetById, findAll, findById } from '../services';
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

export function deleteSaleById(req: Request, res: Response) {
  const { _id: id } = req.body;
  const deletedSale = deletetById(Sale, id);
  controllerResponse(deletedSale, 200, 400, res);
}

