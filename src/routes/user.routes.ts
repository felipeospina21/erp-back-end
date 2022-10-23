import { Router } from 'express';
import { createUser, getUserData, loginUser, logoutUser } from '../controllers';
import { isAuthenticated } from '../middlewares';

export const userRouter: Router = Router();

userRouter.post('/', createUser);
userRouter.get('/:id', isAuthenticated, getUserData);
userRouter.post('/login', loginUser);
userRouter.post('/logout', logoutUser);
