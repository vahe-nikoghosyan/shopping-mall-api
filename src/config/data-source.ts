import { DataSource } from 'typeorm';
import { Product } from '../models/Product';
import { Category } from '../models/Category';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'shopping_mall.db',
  synchronize: true,
  logging: false,
  entities: [Category, Product],
});

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });
