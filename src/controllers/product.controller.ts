import { Product, IProduct } from '../models';
import { Request, Response } from 'express';
import { createNewElement, deletetById, findAll, findById, updateById } from '../services/mongoose';
import { controllerResponse } from '../utils';

export function createProduct(req: Request, res: Response) {
  const payload: IProduct = req.body;
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
  const { _id: id } = req.body as IProduct;
  const deletedProduct = deletetById(Product, id);
  controllerResponse(deletedProduct, 200, 400, res);
}

export function updateProductById(req: Request, res: Response) {
  const { _id: id, category, name, price, stock } = req.body as IProduct;
  const update = { category, name, price: Number(price), stock: Number(stock) };
  const updatedProduct = updateById(Product, id, update);
  controllerResponse(updatedProduct, 200, 400, res);
}

export function updateProductStock(req: Request, res: Response) {
  const { _id: id, stock } = req.body as IProduct;
  const update = { stock: Number(stock) };
  const updatedProduct = updateById(Product, id, update);
  controllerResponse(updatedProduct, 200, 400, res);
}
