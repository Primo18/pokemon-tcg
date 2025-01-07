import { Router } from 'express';
import * as cardsController from '@/controllers/cards.controller';

export const cardRoutes = Router();

cardRoutes.get('/search', cardsController.searchCards);
cardRoutes.get('/:id', cardsController.getCardById);
