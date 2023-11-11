import type { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { createId } from '@paralleldrive/cuid2';

import {
  createProductSchema,
  updateProductSchema,
} from '../lib/validations/product.js';
import { CustomError } from '../lib/exceptions.js';
import { db } from '../lib/db.js';
import { slugify } from '../lib/utils.js';

const createProduct = asyncHandler(async (req: Request, res: Response) => {
  const user = req.res?.locals.user;
  if (!user) throw new CustomError('Unauthorized', 401);

  const productData = createProductSchema.parse(req.body);

  const product = await db.product.create({
    data: {
      id: createId(),
      ...productData,
      slug: slugify(productData.name),
    },
  });

  res.status(201).json(product);
});

const getProducts = asyncHandler(async (req: Request, res: Response) => {
  const user = req.res?.locals.user;
  if (!user) throw new CustomError('Unauthorized', 401);
  const { storeSlug } = req.params;

  const products = await db.product.findMany({
    where: { storeSlug },
  });

  res.status(200).json(products);
});

const deleteProduct = asyncHandler(async (req: Request, res: Response) => {
  const user = req.res?.locals.user;
  if (!user) throw new CustomError('Unauthorized', 401);
  const { id } = req.params;

  const product = await db.product.delete({
    where: {
      id,
    },
  });

  res.status(200).json(product);
});

const updateProduct = asyncHandler(async (req: Request, res: Response) => {
  const productData = updateProductSchema.parse(req.body);
  const user = req.res?.locals.user;
  if (!user) throw new CustomError('Unauthorized', 401);
  const { id } = req.params;

  const product = await db.product.update({
    data: {
      ...productData,
      slug: slugify(productData.name),
    },
    where: { id, store: { ownerId: user.id } },
  });

  res.status(200).json(product);
});

export { createProduct, getProducts, deleteProduct, updateProduct };
