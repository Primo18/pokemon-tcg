import { Set } from '@models/set.model';
import { Card } from '@models/card.model';
import { Image } from '@models/image.model';
import { AppError } from '@utils/error';

export class SetService {
  async getAllSets() {
    return await Set.findAll({
      order: [['releaseDate', 'DESC']],
    });
  }

  async getSetById(id: string) {
    const set = await Set.findByPk(id);
    if (!set) {
      throw new AppError('Set not found', 404);
    }
    return set;
  }

  async getSetCards(id: string) {
    const set = await Set.findByPk(id, {
      include: [
        {
          model: Card,
          include: [
            {
              model: Image,
              where: { type: 'small' },
              required: false,
            },
          ],
        },
      ],
    });

    if (!set) {
      throw new AppError('Set not found', 404);
    }

    return set;
  }
}
