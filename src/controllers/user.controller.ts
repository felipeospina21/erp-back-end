import { IUser, User } from '../models';
import { Request, Response } from 'express';
import { createNewElement, findOneByField } from '../services/mongoose';
import { generateToken, controllerResponse } from '../utils';

export async function createUser(req: Request, res: Response) {
  const payload: IUser = req.body;
  const newUser = createNewElement(User, payload);
  controllerResponse(newUser, 201, 400, res);
}

export async function loginUser(req: Request, res: Response) {
  const { email, password } = req.body;
  if (!password || !email) {
    res.status(400).json({ message: 'password and/or email needed' });
    return;
  }

  const user = await findOneByField(User, { email });
  if (!user) {
    res.status(400).json({ message: 'user not found' });
    return;
  }

  const token = await generateToken(password, user?.password, user._id, email);
  if (!token) {
    res.status(401).json({ message: 'wrong password' });
    return;
  }

  res.cookie('session-token', token, { httpOnly: true, sameSite: 'none' });
  res.status(200).json({ message: 'success', user: { isLoggedin: true, email } });
}

export function logoutUser(req: Request, res: Response) {
  try {
    res.clearCookie('session-token');
    res.status(200).json({ message: 'session canceled' });
  } catch (error) {
    res.json({ message: 'not cookie found' });
  }
}
