import { Router } from 'express';
import { setRoutes } from './sets.routes';
import { cardRoutes } from './cards.routes';

export const router = Router();

router.get('/health', (_, res) => {
  res.json({ status: 'OK' });
});

router.use('/sets', setRoutes);
router.use('/cards', cardRoutes);

router.use((_req, res) => {
  res.status(404).json({
    message: 'Resource not found',
  });
});
