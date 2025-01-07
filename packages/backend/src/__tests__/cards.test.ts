import dotenv from 'dotenv';
import request from 'supertest';
import { server } from '@/server';
import { Card } from '@models/card.model';
import { sequelize } from '@config/database';
import { afterAll, beforeAll, describe, expect, it, jest } from '@jest/globals';

dotenv.config({ path: '.env.test' });

describe('Cards API', () => {
  beforeAll(async () => {
    await sequelize.sync();
  });

  afterAll(async () => {
    await sequelize.close();
  });

  describe('GET /api/cards/search', () => {
    it('should search cards with query parameters', async () => {
      const mockCards = [
        {
          id: 'card1',
          name: 'Alakazam',
          supertype: 'Pokémon',
          number: '1',
          rarity: 'Rare Holo',
        },
      ];

      jest.spyOn(Card, 'findAll').mockResolvedValueOnce(mockCards as never); 

      const response = await request(server)
        .get('/api/cards/search')
        .query({ q: 'Alakazam', type: 'Psychic' })
        .expect('Content-Type', /json/)
        .expect(200);

      expect(Array.isArray(response.body)).toBeTruthy();
      expect(response.body[0]).toHaveProperty('name', 'Alakazam');
    });

    it('should handle empty search results', async () => {
      jest.spyOn(Card, 'findAll').mockResolvedValueOnce([]);

      const response = await request(server)
        .get('/api/cards/search')
        .query({ q: 'NonexistentCard' })
        .expect('Content-Type', /json/)
        .expect(200);

      expect(Array.isArray(response.body)).toBeTruthy();
      expect(response.body).toHaveLength(0);
    });
  });

  describe('GET /api/cards/:id', () => {
    it('should return a specific card', async () => {
      const mockCard = {
        id: 'card1',
        name: 'Alakazam',
        supertype: 'Pokémon',
        number: '1',
        rarity: 'Rare Holo',
      };

      jest.spyOn(Card, 'findByPk').mockResolvedValueOnce(mockCard as never);

      const response = await request(server)
        .get('/api/cards/card1')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toHaveProperty('name', 'Alakazam');
    });

    it('should return 404 for non-existent card', async () => {
      jest.spyOn(Card, 'findByPk').mockResolvedValueOnce(null);

      const response = await request(server)
        .get('/api/cards/nonexistent')
        .expect('Content-Type', /json/)
        .expect(404);

      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toMatch(/not found/i);
    });
  });
});
