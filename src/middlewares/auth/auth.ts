import { Request, Response, NextFunction } from 'express';
import jwt, { Secret } from 'jsonwebtoken';

export function isAuthenticated(req: Request, res: Response, next: NextFunction) {
  if (req.headers.cookie) {
    try {
      const [tokenType, tokenValue] = req.headers.cookie?.split('=') ?? [];

      const verifiedToken = jwt.verify(tokenValue, process.env.SECRET_TOKEN_KEY as Secret);

      if (tokenType === 'session-token' && verifiedToken) {
        next();
      }
    } catch (error) {
      res.status(401).json({ error: 'unauthorized user' });
    }
  } else {
    res.status(401).json({ error: 'unauthorized user' });
  }
}
