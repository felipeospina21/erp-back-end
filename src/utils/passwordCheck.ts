import jwt, { Secret } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Response } from 'express';

export async function checkPassword(
  reqPassword: string,
  userPassword: string,
  userId: string,
  userEmail: string,
  res: Response
) {
  const passwordCheck = await bcrypt.compare(reqPassword, userPassword);

  if (!passwordCheck) {
    res.status(401).json({ message: 'wrong password' });
  } else {
    const token = jwt.sign({ id: userId, email: userEmail }, process.env.SECRET_TOKEN_KEY as Secret, {
      expiresIn: '2h',
    });
    res.cookie('session-token', token, { httpOnly: true });
    res.status(200).json({ message: 'success' });
  }
}
