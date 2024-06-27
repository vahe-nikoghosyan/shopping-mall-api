import { AppDataSource } from './data-source';
import { Category } from '../models/Category';

const testCategories = [
  { title: 'Electronics', description: 'Electronic items' },
  { title: 'Books', description: 'Books and literature' },
  { title: 'Clothing', description: 'Apparel and clothing items' },
];

const seedDatabase = async () => {
  await AppDataSource.initialize();

  const categoryRepository = AppDataSource.getRepository(Category);

  const existingCategories = await categoryRepository.find();

  if (existingCategories.length === 0) {
    for (const category of testCategories) {
      const newCategory = categoryRepository.create(category);
      await categoryRepository.save(newCategory);
    }

    console.log('Test categories have been added.');
  } else {
    console.log('Categories already exist.');
  }

  await AppDataSource.destroy();
};

seedDatabase().catch((err) => {
  console.error('Error seeding database:', err);
});
