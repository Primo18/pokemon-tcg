// src/config/database.ts
import { Sequelize } from 'sequelize-typescript';
import { config } from './env';
import { Set } from '@models/set.model';
import { Card } from '@models/card.model';
import { Image } from '@models/image.model';
import { Market } from '@models/market.model';

export const sequelize = new Sequelize({
  dialect: 'postgres',
  host: config.DB_HOST,
  port: config.DB_PORT,
  database: config.DB_NAME,
  username: config.DB_USER,
  password: config.DB_PASSWORD,
  models: [Set, Card, Image, Market],
  logging: false, // set to true if you want to see SQL queries
});

export const initDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('📦 Database connection has been established successfully.');

    // Solo en desarrollo
    if (config.NODE_ENV === 'development') {
      await sequelize.sync();
      console.log('All models were synchronized successfully.');
    }
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
};
