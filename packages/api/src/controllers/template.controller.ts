import type { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';

import { db } from '../lib/db.js';
import { CustomError } from '../lib/exceptions.js';

const getTemplate = asyncHandler(async (req: Request, res: Response) => {
  const templateSlug = req.headers.origin?.slice(7).split('.').at(0);

  const store = await db.store.findUnique({
    where: {
      slug: templateSlug,
    },
    include: {
      products: true,
      categories: true,
    },
  });
  if (!store) throw new CustomError('Store not found', 404);

  const template = {
    title: store.name,
    categories: store.categories,
    coverImage: store.coverImage || 'src/assets/images/background-2.png',
    logo: store.logo,
    favicon: store.favicon,
    products: store.products,
  };

  res.status(200).json(template);
});

export { getTemplate };
