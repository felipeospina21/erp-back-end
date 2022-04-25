import { Client, IClient } from '../models'
import { Request, Response } from 'express';
import { createNewElement, deletetById, findAll, findById, updateById } from '../services';
import { controllerResponse } from '../utils';

export function createClient(req:Request, res:Response) {
  const payload: IClient = req.body;
  const newClient = createNewElement(Client, payload);
  controllerResponse(newClient, 201, 400, res);
}

export function getClients(req: Request, res: Response) {
  const clients = findAll(Client);
  controllerResponse(clients, 200, 400, res);
}

export function getClientById(req: Request, res: Response) {
  const { id } = req.params;
  const client = findById(Client, id);
  controllerResponse(client, 200, 400, res);
}

export function deleteClientById(req: Request, res: Response) {
  const { _id: id } = req.body;
  const deletedClient = deletetById(Client, id);
  controllerResponse(deletedClient, 200, 400, res);
}

export function updateClientById(req: Request, res: Response) {
  const { _id: id, update } = req.body;
  const updatedClient = updateById(Client, id, update);
  controllerResponse(updatedClient, 200, 400, res);
}
