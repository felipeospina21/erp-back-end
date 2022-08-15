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
  const { _id: id, category, name, price, stockAvailable, image } = req.body as IProduct;
  const update = { category, name, image, price: Number(price), stockAvailable: Number(stockAvailable) };
  const updatedProduct = updateById(Product, id, update);
  controllerResponse(updatedProduct, 200, 400, res);
}

interface UpdateProductStockAvailable extends IProduct {
  quantity: number;
}
export async function updateProductStockAvailable(req: Request, res: Response) {
  const { _id: id, quantity } = req.body as UpdateProductStockAvailable;

  const { stockAvailable: currentStock } = await findById(Product, id, 'stockAvailable -_id -category');
  let update;
  if (currentStock >= quantity) {
    update = { stockAvailable: currentStock - quantity };
  } else {
    update = { stockAvailable: 0 };
  }
  const updatedProduct = updateById(Product, id, update);
  controllerResponse(updatedProduct, 200, 400, res);
}

interface UpdateProductStockReserved extends IProduct {
  method: 'add' | 'substract';
}
export async function updateProductStockReserved(req: Request, res: Response) {
  const { _id: id, stockReserved, method } = req.body as UpdateProductStockReserved;
  let update = await findById(Product, id, 'stockReserved -_id -category');

  switch (method) {
    case 'add':
      update = { stockReserved: Number(update.stockReserved) + Number(stockReserved) };
      break;
    case 'substract':
      update = { stockReserved: update.stockReserved - Number(stockReserved) };
      break;
    default:
      break;
  }

  const updatedProduct = updateById(Product, id, update);
  controllerResponse(updatedProduct, 200, 400, res);
}
export async function updateProductStockInBatch(req: Request, res: Response) {
  const body = req.body;
  const newStockPromises = [];
  for (const key in body) {
    const { stockAvailable: currentStock } = await findById(Product, key, 'stockAvailable -_id -category');
    const newStock = Number(currentStock) + Number(body[key]);
    newStockPromises.push(updateById(Product, key, { stockAvailable: newStock }));
  }

  try {
    await Promise.all(newStockPromises);
    res.status(200).json({ message: 'Productos actualizados' });
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar inventario' });
  }
}
