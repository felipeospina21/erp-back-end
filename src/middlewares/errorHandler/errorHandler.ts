import { Request, Response, NextFunction, Errback } from 'express';

export function errorHandler(err: Errback, req: Request, res: Response, next: NextFunction) {
  res.status(404).send({ error: err });
}
