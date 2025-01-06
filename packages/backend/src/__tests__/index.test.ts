import request from 'supertest';
import { describe, test, expect } from '@jest/globals';
import { server } from '@/server';

describe('Pruebas de la API', () => {
  test('GET / - debería responder con un mensaje', async () => {
    const response = await request(server).get('/');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: '¡Hola Mundo! 🌎' });
  });

  test('POST /echo - debería devolver el mismo cuerpo', async () => {
    const data = { name: 'Node.js', type: 'framework' };
    const response = await request(server).post('/echo').send(data);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ data });
  });
});
