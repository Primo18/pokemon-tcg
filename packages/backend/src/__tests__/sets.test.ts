import dotenv from 'dotenv';
import request from 'supertest';
import { describe, it, expect, beforeAll, afterAll, jest } from '@jest/globals';
import { server } from '@/server';
import { Set } from '@models/set.model';
import { sequelize } from '@config/database';

// Configuración de entorno
dotenv.config({ path: '.env.test' });

describe('Sets API', () => {
  beforeAll(async () => {
    await sequelize.sync();
  });

  afterAll(async () => {
    await sequelize.close();
  });

  describe('GET /api/sets', () => {
    it('should return all sets', async () => {
      const mockSets = [
        {
          id: 'set1',
          name: 'Base Set',
          series: 'Base',
          printedTotal: 102,
          total: 102,
          releaseDate: '1999-01-09',
        },
      ];

      jest
        .spyOn(Set, 'findAll')
        .mockResolvedValueOnce(mockSets as unknown as Set[]);

      const response = await request(server)
        .get('/api/sets')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(Array.isArray(response.body)).toBeTruthy();
      expect(response.body[0]).toHaveProperty('name', 'Base Set');
    });

    it('should handle database errors', async () => {
      jest
        .spyOn(Set, 'findAll')
        .mockRejectedValueOnce(new Error('Database error'));
      jest.spyOn(console, 'error').mockImplementation(() => undefined); // Mockear console.error

      const response = await request(server)
        .get('/api/sets')
        .expect('Content-Type', /json/)
        .expect(500);

      expect(response.body).toHaveProperty('message', 'Something went wrong!');
    });
  });

  describe('GET /api/sets/:id', () => {
    it('should return a specific set', async () => {
      const mockSet = {
        id: 'set1',
        name: 'Base Set',
        series: 'Base',
        printedTotal: 102,
        total: 102,
        releaseDate: '1999-01-09',
      };

      jest
        .spyOn(Set, 'findByPk')
        .mockResolvedValueOnce(mockSet as unknown as Set);

      const response = await request(server)
        .get('/api/sets/set1')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toHaveProperty('name', 'Base Set');
    });

    it('should return 404 for non-existent set', async () => {
      jest.spyOn(Set, 'findByPk').mockResolvedValueOnce(null);

      const response = await request(server)
        .get('/api/sets/nonexistent')
        .expect('Content-Type', /json/)
        .expect(404);

      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toMatch(/not found/i);
    });
  });
});
