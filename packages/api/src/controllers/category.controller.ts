import type { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { createId } from '@paralleldrive/cuid2';

import {
  createCategorySchema,
  updateCategorySchema,
} from '../lib/validations/category.js';
import { CustomError } from '../lib/exceptions.js';
import { db } from '../lib/db.js';
import { slugify } from '../lib/utils.js';

const createCategory = asyncHandler(async (req: Request, res: Response) => {
  const user = req.res?.locals.user;
  if (!user) throw new CustomError('Unauthorized', 401);

  const categoryData = createCategorySchema.parse(req.body);

  const category = await db.category.create({
    data: {
      id: createId(),
      slug: slugify(categoryData.name),
      ...categoryData,
    },
  });

  res.status(201).json(category);
});

const getCategories = asyncHandler(async (req: Request, res: Response) => {
  const user = req.res?.locals.user;
  if (!user) throw new CustomError('Unauthorized', 401);
  const { slug } = req.params;

  const categories = await db.category.findMany({
    where: { storeSlug: slug, store: { ownerId: user.id } },
  });

  res.status(200).json(categories);
});

const deleteCategory = asyncHandler(async (req: Request, res: Response) => {
  const user = req.res?.locals.user;
  if (!user) throw new CustomError('Unauthorized', 401);
  const { id } = req.params;

  const category = await db.category.delete({
    where: { id, store: { ownerId: user.id } },
  });

  res.status(200).json(category);
});

const updateCategory = asyncHandler(async (req: Request, res: Response) => {
  const categoryData = updateCategorySchema.parse(req.body);
  const user = req.res?.locals.user;
  if (!user) throw new CustomError('Unauthorized', 401);
  const { id } = req.params;

  const category = await db.category.update({
    data: categoryData,
    where: { id, store: { ownerId: user.id } },
  });

  res.status(200).json(category);
});

export { createCategory, getCategories, deleteCategory, updateCategory };
