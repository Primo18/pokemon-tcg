import type { Request, Response } from 'express';
import { SetService } from '@services/set.service';
import { asyncHandler } from '@utils/asyncHandler';
import { handleError } from '@utils/error';

const setService = new SetService();

export const getAllSets = asyncHandler(async (_req: Request, res: Response) => {
  const sets = await setService.getAllSets();
  res.json(sets);
});

export const getSetById = asyncHandler(async (req: Request, res: Response) => {
  try {
    const set = await setService.getSetById(req.params.id);
    res.json(set);
  } catch (error) {
    const { statusCode, body } = handleError(error as Error);
    res.status(statusCode).json(body);
  }
});

export const getSetCards = asyncHandler(async (req: Request, res: Response) => {
  try {
    const setWithCards = await setService.getSetCards(req.params.id);
    res.json(setWithCards);
  } catch (error) {
    const { statusCode, body } = handleError(error as Error);
    res.status(statusCode).json(body);
  }
});
