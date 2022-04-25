import { Router } from "express";
import { createClient, getClientById, getClients, deleteClientById, updateClientById } from "../controllers";

export const clientRouter: Router = Router();

clientRouter.get("/", getClients);
clientRouter.get("/:id", getClientById);
clientRouter.post("/", createClient);
clientRouter.delete("/", deleteClientById);
clientRouter.put("/", updateClientById);
