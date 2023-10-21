import asyncHandler from 'express-async-handler';
import type { Request, Response } from 'express';

const createStore = asyncHandler(async (req: Request, res: Response) => {
  console.log('Created store');

  res.status(201).json({
    status: 'success',
  });
});

export { createStore };
