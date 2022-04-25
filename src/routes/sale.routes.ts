import { Router } from "express";
import { createSale, getSaleById, getSales, deleteSaleById } from "../controllers";

export const saleRouter: Router = Router();

saleRouter.get("/", getSales);
saleRouter.get("/:id", getSaleById);
saleRouter.post("/", createSale);
saleRouter.delete("/", deleteSaleById);
