import { Request, Response } from 'express';
import { AppDataSource } from '../config/data-source';
import { Product } from '../models/Product';
import { Category } from '../models/Category';
import { parseId } from '../utils';
import { StatusCodes } from 'http-status-codes';

export const getProducts = async (req: Request, res: Response) => {
  const productRepository = AppDataSource.getRepository(Product);
  const products = await productRepository.find({ relations: ['category'] });
  res.status(StatusCodes.OK).json(products);
};

export const getProduct = async (req: Request, res: Response) => {
  const productRepository = AppDataSource.getRepository(Product);
  const id = parseId(req.params.id);
  const product = await productRepository.findOne({
    where: { id },
    relations: ['category'],
  });

  if (product) {
    res.status(StatusCodes.OK).json(product);
  } else {
    res.status(StatusCodes.NOT_FOUND).json({ message: 'Product not found' });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  const { title, description, sku, price, categoryId } = req.body;

  const categoryRepository = AppDataSource.getRepository(Category);
  const category = await categoryRepository.findOne({
    where: { id: categoryId },
  });

  if (!category) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'Category not found' });
  }

  const product = new Product();
  product.title = title;
  product.description = description;
  product.sku = sku;
  product.price = price;
  product.category = category;

  const productRepository = AppDataSource.getRepository(Product);
  await productRepository.save(product);

  res.status(StatusCodes.CREATED).json(product);
};

export const updateProduct = async (req: Request, res: Response) => {
  const { title, description, sku, price, categoryId } = req.body;

  const productRepository = AppDataSource.getRepository(Product);
  const id = parseId(req.params.id);
  const product = await productRepository.findOne({ where: { id } });

  if (!product) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: 'Product not found' });
  }

  const categoryRepository = AppDataSource.getRepository(Category);
  const category = await categoryRepository.findOne({
    where: { id: categoryId },
  });

  if (!category) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'Category not found' });
  }

  product.title = title;
  product.description = description;
  product.sku = sku;
  product.price = price;
  product.category = category;

  await productRepository.save(product);

  res.status(StatusCodes.OK).json(product);
};

export const deleteProduct = async (req: Request, res: Response) => {
  const productRepository = AppDataSource.getRepository(Product);
  const id = parseId(req.params.id);
  const product = await productRepository.findOne({ where: { id } });

  if (!product) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: 'Product not found' });
  }

  await productRepository.remove(product);

  res.status(StatusCodes.NO_CONTENT).send('Deleted Successfully');
};
