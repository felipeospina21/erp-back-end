import { IUser, User } from '../models';
import { Request, Response } from 'express';
import { createNewElement, findOneByField } from '../services/mongoose';
import { checkPassword, controllerResponse } from '../utils';

export async function createUser(req: Request, res: Response) {
  const payload: IUser = req.body;
  const newUser = createNewElement(User, payload);
  controllerResponse(newUser, 201, 400, res);
}

export async function loginUser(req: Request, res: Response) {
  const { email, password } = req.body;

  if (!password || !email) {
    res.status(400).json({ message: 'password and/or email needed' });
  } else {
    const user = await findOneByField(User, { email });

    if (!user) {
      res.status(400).json({ message: 'user not found' });
    } else {
      checkPassword(password, user?.password, user._id, email, res);
    }
  }
}

export function logoutUser(req: Request, res: Response) {
  try {
    res.clearCookie('session-token');
    res.status(200).json({ message: 'session canceled' });
  } catch (error) {
    res.json({ message: 'not cookie found' });
  }
}
