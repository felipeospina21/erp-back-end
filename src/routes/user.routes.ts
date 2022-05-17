import { Router } from 'express';
import { createUser, loginUser, logoutUser } from '../controllers';

export const userRouter: Router = Router();

userRouter.post('/', createUser);
userRouter.post('/login', loginUser);
userRouter.get('/logout', logoutUser);
