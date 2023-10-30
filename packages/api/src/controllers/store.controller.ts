import type { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { createId } from '@paralleldrive/cuid2';

import { createStoreSchema } from '../lib/validations/store.js';
import { CustomError } from '../lib/exceptions.js';
import { db } from '../lib/db.js';

const createStore = asyncHandler(async (req: Request, res: Response) => {
  const storeData = createStoreSchema.parse(req.body);
  const user = req.res?.locals.user;
  if (!user) throw new CustomError('Unauthorized', 401);
  const slug = storeData.storeName.toLowerCase().split(' ').join('-');

  const store = await db.store.create({
    data: {
      id: createId(),
      name: storeData.storeName,
      slug,
      ownerId: user.id,
    },
  });

  res.status(201).json(store);
});

const getStore = asyncHandler(async (req: Request, res: Response) => {
  const user = req.res?.locals.user;
  if (!user) throw new CustomError('Unauthorized', 401);
  const slug = req.query.slug;
  if (typeof slug !== 'string') {
    throw new CustomError('Something went wrong', 500);
  }

  const store = await db.store.findUnique({
    where: {
      slug,
      ownerId: user.id,
    },
  });
  if (!store) throw new CustomError('Store not found', 404);

  res.status(200).json(store);
});

const getStoresByUserId = asyncHandler(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const user = req.res?.locals.user;
  if (!user || user.id !== userId) {
    throw new CustomError('Not authorized', 401);
  }

  const stores = await db.store.findMany({
    where: {
      ownerId: userId,
    },
  });

  res.status(200).json(stores);
});

export { createStore, getStore, getStoresByUserId };
