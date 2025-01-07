import { Router } from 'express';
import * as setsController from '@/controllers/set.controller';

export const setRoutes = Router();

setRoutes.get('/', setsController.getAllSets);
setRoutes.get('/:id', setsController.getSetById);
setRoutes.get('/:id/cards', setsController.getSetCards);
