import { Request, Response } from 'express';
import { Invoice } from '../models';
import { findById, updateById } from '../services/mongoose';
import { controllerResponse } from '../utils';

export async function updateInvoice(req: Request, res: Response) {
  const { _id: id } = req.body;

  const { count } = await findById(Invoice, id);
  const updateInvoice = updateById(Invoice, id, { count: count + 1 });
  controllerResponse(updateInvoice, 200, 400, res);
}
