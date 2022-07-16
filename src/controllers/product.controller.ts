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
  const products = findAll(Product, 'name');
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
  const { _id: id, category, name, price, stock, image } = req.body as IProduct;
  const update = { category, name, image, price: Number(price), stock: Number(stock) };
  const updatedProduct = updateById(Product, id, update);
  controllerResponse(updatedProduct, 200, 400, res);
}

export function updateProductStock(req: Request, res: Response) {
  const { _id: id, stock } = req.body as IProduct;
  const update = { stock: Number(stock) };
  const updatedProduct = updateById(Product, id, update);
  controllerResponse(updatedProduct, 200, 400, res);
}

export async function updateProductStockInBatch(req: Request, res: Response) {
  const body = req.body;
  const newStockPromises = [];
  for (const key in body) {
    const { stock: currentStock } = await findById(Product, key, 'stock -_id -category');
    const newStock = Number(currentStock) + Number(body[key]);
    newStockPromises.push(updateById(Product, key, { stock: newStock }));
  }

  try {
    await Promise.all(newStockPromises);
    res.status(200).json({ message: 'Productos actualizados' });
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar inventario' });
  }

  // const { _id: id, stock } = req.body as IProduct;
  // const update = { stock: Number(stock) };
  // const updatedProduct = updateById(Product, id, update);
  // controllerResponse(updatedProduct, 200, 400, res);
}
