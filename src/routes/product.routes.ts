import { Router} from 'express';
import {
  createProduct,
  getProductById,
  getProducts,
  deleteProductById,
  updateProductById,
  updateProductStock
} from '../controllers';
import { formData } from '../middlewares';


export const productRouter: Router = Router();

productRouter.get('/', getProducts);
productRouter.get('/:id', getProductById);
productRouter.post('/', formData, createProduct);
productRouter.delete('/', deleteProductById);
productRouter.put('/', formData, updateProductById);
productRouter.put('/updateStock', updateProductStock)

