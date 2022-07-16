import { IWithholdingTax, WithholdingTax } from '../models';
import { Request, Response } from 'express';
import { createNewElement, findAll, findById, updateById } from '../services/mongoose';
import { controllerResponse } from '../utils';

export function createWithholdingTax(req: Request, res: Response) {
  const payload: IWithholdingTax = req.body;
  const newTaxConcept = createNewElement(WithholdingTax, { ...payload, percentage: payload.percentage / 100 });
  controllerResponse(newTaxConcept, 201, 400, res);
}

export function updateWithholdingTax(req: Request, res: Response) {
  const { _id, concept, base, percentage } = req.body as IWithholdingTax;
  const updateTaxConcept = updateById(WithholdingTax, _id, { concept, base, percentage: percentage / 100 });
  controllerResponse(updateTaxConcept, 200, 400, res);
}

export function getWithholdingTaxes(req: Request, res: Response) {
  const taxConcepts = findAll(WithholdingTax, 'concept');
  controllerResponse(taxConcepts, 200, 400, res);
}

export function getWithholdingTaxById(req: Request, res: Response) {
  const { id } = req.params;
  const taxConcept = findById(WithholdingTax, id);
  controllerResponse(taxConcept, 200, 400, res);
}
