import type { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { createId } from '@paralleldrive/cuid2';

import { createCategorySchema } from '../lib/validations/category.js';
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
    where: { storeSlug: slug },
  });

  res.status(200).json(categories);
});

export { createCategory, getCategories };
