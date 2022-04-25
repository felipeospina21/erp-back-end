import { Router } from "express";
import { createProduct, getProductById, getProducts, deleteProductById, updateProductById } from "../controllers";

export const productRouter: Router = Router();

productRouter.get("/", getProducts);
productRouter.get("/:id", getProductById);
productRouter.post("/", createProduct);
productRouter.delete("/", deleteProductById);
productRouter.put("/", updateProductById);
