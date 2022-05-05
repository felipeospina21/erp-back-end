import { Product, IProduct } from '../models';
import { Request, Response } from 'express';
import { createNewElement, deletetById, findAll, findById, updateById } from '../services';
import { controllerResponse } from '../utils';

export function createProduct(req: Request, res: Response) {
  const payload: IProduct = req.body;
  console.log(req.file?.buffer)
  payload.image = req.file?.buffer
  const newProduct = createNewElement(Product, payload);
  controllerResponse(newProduct, 201, 400, res);
}

export function getProducts(req: Request, res: Response) {
  const products = findAll(Product);
  controllerResponse(products, 200, 400, res);
}

export function getProductById(req: Request, res: Response) {
  const { id } = req.params;
  const product = findById(Product, id);
  controllerResponse(product, 200, 400, res);
}

export function deleteProductById(req: Request, res: Response) {
  const { _id: id } = req.body;
  const deletedProduct = deletetById(Product, id);
  controllerResponse(deletedProduct, 200, 400, res);
}

export function updateProductById(req: Request, res: Response) {
  const { _id: id, update } = req.body;
  const updatedProduct = updateById(Product, id, update);
  controllerResponse(updatedProduct, 200, 400, res);
}
