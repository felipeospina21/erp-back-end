import { Router } from 'express';
import { createClient, getClientById, getClients, deleteClientById, updateClientById } from '../controllers';
import { transformRetailer } from '../middlewares/transformRetailer';

export const clientRouter: Router = Router();

clientRouter.get('/', getClients);
clientRouter.get('/:id', getClientById);
clientRouter.post('/', transformRetailer, createClient);
clientRouter.delete('/', deleteClientById);
clientRouter.put('/', transformRetailer, updateClientById);
