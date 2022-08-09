import { Router } from 'express';
import { updateConsecutive, getConsecutiveById } from '../controllers';

export const consecutiveRouter: Router = Router();

consecutiveRouter.get('/:id', getConsecutiveById);
consecutiveRouter.put('/', updateConsecutive);
