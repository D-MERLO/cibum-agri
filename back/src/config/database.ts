import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import Product from '../entities/Product';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Product],
  synchronize: true, // Sincroniza automáticamente, solo en desarrollo
  logging: true,
});


