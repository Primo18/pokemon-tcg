import type { Request, Response } from 'express';
import { CardService } from '@services/cards.service';
import { asyncHandler } from '@utils/asyncHandler';
import { handleError } from '@utils/error';

const cardService = new CardService();

export const searchCards = asyncHandler(async (req: Request, res: Response) => {
  const { q, type, rarity, setId } = req.query as {
    q?: string;
    type?: string;
    rarity?: string;
    setId?: string;
  };

  const cards = await cardService.searchCards({
    q,
    type,
    rarity,
    setId,
  });

  res.json(cards);
});

export const getCardById = asyncHandler(async (req: Request, res: Response) => {
  try {
    const card = await cardService.getCardById(req.params.id);
    res.json(card);
  } catch (error) {
    const { statusCode, body } = handleError(error as Error);
    res.status(statusCode).json(body);
  }
});
