import { Consecutive } from '../models';
import { Request, Response } from 'express';
import { findById, updateById } from '../services/mongoose';
import { controllerResponse } from '../utils';

export async function updateConsecutive(req: Request, res: Response) {
  const { _id: id } = req.body;

  const { count } = await findById(Consecutive, id);
  const updateCount = updateById(Consecutive, id, { count: count + 1 });
  controllerResponse(updateCount, 200, 400, res);
}

export function getConsecutiveById(req: Request, res: Response) {
  const { id } = req.params;
  const consecutive = findById(Consecutive, id);
  controllerResponse(consecutive, 200, 400, res);
}
