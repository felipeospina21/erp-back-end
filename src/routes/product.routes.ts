import { Router } from 'express';
import {
  createProduct,
  getProductById,
  getProducts,
  deleteProductById,
  updateProductById,
  updateProductStockAvailable,
  updateProductStockInBatch,
  updateProductStockReserved,
} from '../controllers';
import { formData } from '../middlewares';

export const productRouter: Router = Router();

productRouter.get('/', getProducts);
productRouter.get('/:id', getProductById);
productRouter.post('/', formData, createProduct);
productRouter.delete('/', deleteProductById);
productRouter.put('/', formData, updateProductById);
productRouter.put('/updateStockAvailable', updateProductStockAvailable);
productRouter.put('/updateStockReserved', updateProductStockReserved);
productRouter.put('/updateStockInBatch', updateProductStockInBatch);
