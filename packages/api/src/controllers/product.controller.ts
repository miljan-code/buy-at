import type { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { createId } from '@paralleldrive/cuid2';

import { createProductSchema } from '../lib/validations/product.js';
import { CustomError } from '../lib/exceptions.js';
import { db } from '../lib/db.js';

const createProduct = asyncHandler(async (req: Request, res: Response) => {
  const user = req.res?.locals.user;
  if (!user) throw new CustomError('Unauthorized', 401);

  const productData = createProductSchema.parse(req.body);

  const product = db.product.create({
    data: {
      id: createId(),
      ...productData,
    },
  });

  res.status(201).json(product);
});

const getProducts = asyncHandler(async (req: Request, res: Response) => {
  const user = req.res?.locals.user;
  if (!user) throw new CustomError('Unauthorized', 401);
  const { storeId } = req.params;

  const products = await db.product.findMany({
    where: { storeId },
  });

  res.status(200).json(products);
});

export { createProduct, getProducts };
