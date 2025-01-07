import { Op } from 'sequelize';
import type { WhereOptions } from 'sequelize';
import { Card } from '@models/card.model';
import { Image } from '@models/image.model';
import { Market } from '@models/market.model';
import { AppError } from '@utils/error';

export class CardService {
  async searchCards(params: {
    q?: string;
    type?: string;
    rarity?: string;
    setId?: string;
  }) {
    const { q, type, rarity, setId } = params;
    const where: WhereOptions<Card> = {};

    if (q) {
      where.name = { [Op.iLike]: `%${q}%` };
    }

    if (type) {
      where.types = { [Op.contains]: [type] };
    }

    if (rarity) {
      where.rarity = rarity;
    }

    if (setId) {
      where.setId = setId;
    }

    return await Card.findAll({
      where,
      include: [
        {
          model: Image,
          where: { type: 'small' },
          required: false,
        },
      ],
      order: [['number', 'ASC']],
    });
  }

  async getCardById(id: string) {
    const card = await Card.findByPk(id, {
      include: [
        {
          model: Image,
          required: false,
        },
        {
          model: Market,
          required: false,
          order: [['updatedAt', 'DESC']],
          limit: 1,
        },
      ],
    });

    if (!card) {
      throw new AppError('Card not found', 404);
    }

    return card;
  }
}
