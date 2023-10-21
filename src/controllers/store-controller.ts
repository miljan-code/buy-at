import asyncHandler from 'express-async-handler';
import type { Request, Response } from 'express';

const createStore = asyncHandler(async (req: Request, res: Response) => {
  console.log('Created store');

  res.status(201).json({
    status: 'success',
  });
});

const getStore = asyncHandler(async (req: Request, res: Response) => {
  const storeName = req.headers.origin?.slice(7).split('.').at(0);

  // try to find store by storeName
  // if not found return res null
  // if found return storeConfig

  const truthy = {
    title: storeName,
    navLinks: [],
    coverImage: 'src/assets/images/background-2.png',
  };

  res.status(200).json(truthy);
});

export { createStore, getStore };
