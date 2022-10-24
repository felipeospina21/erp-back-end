import { Router, Response, Request } from 'express';

export const homeRouter: Router = Router();

homeRouter.get('/', (req: Request, res: Response) => {
  res.status(200).json({ status: 'connected' });
});
