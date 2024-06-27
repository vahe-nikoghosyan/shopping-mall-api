import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { Category } from "../models/Category";
import { StatusCodes } from "http-status-codes";

export const getCategories = async (req: Request, res: Response) => {
    const categoryRepository = AppDataSource.getRepository(Category);
    const categories = await categoryRepository.find();
    res.status(StatusCodes.OK).json(categories);
};