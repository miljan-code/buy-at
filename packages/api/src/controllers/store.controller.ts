import type { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { createId } from '@paralleldrive/cuid2';

import {
  createStoreSchema,
  updateStoreSchema,
} from '../lib/validations/store.js';
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
      coverImage: storeData.coverImage || null,
    },
  });

  res.status(201).json(store);
});

const updateStore = asyncHandler(async (req: Request, res: Response) => {
  const storeData = updateStoreSchema.parse(req.body);
  const user = req.res?.locals.user;
  if (!user) throw new CustomError('Unauthorized', 401);
  const { storeId } = req.params;

  const store = await db.store.update({
    where: {
      id: storeId,
      ownerId: user.id,
    },
    data: {
      name: storeData.storeName,
      coverImage: storeData.coverImage || null,
      logo: storeData.logo || null,
      favicon: storeData.favicon || null,
      // TODO: Handle this better
      slug: storeData.slug.toLowerCase().split(' ').join('-'),
    },
  });

  res.status(200).json(store);
});

const getStore = asyncHandler(async (req: Request, res: Response) => {
  const user = req.res?.locals.user;
  if (!user) throw new CustomError('Unauthorized', 401);
  const { slug } = req.params;

  const store = await db.store.findUnique({
    where: {
      slug,
      ownerId: user.id,
    },
  });
  if (!store) throw new CustomError('Store not found', 404);

  res.status(200).json(store);
});

const getStores = asyncHandler(async (req: Request, res: Response) => {
  const user = req.res?.locals.user;
  if (!user) throw new CustomError('Unauthorized', 401);

  const stores = await db.store.findMany({
    where: {
      ownerId: user.id,
    },
  });

  res.status(200).json(stores);
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

export { createStore, getStore, getStores, updateStore, getStoresByUserId };
