import type { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { Prisma } from '@prisma/client';

import { CustomError } from '../lib/exceptions.js';

export const errorHandler = (
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (error instanceof z.ZodError) {
    return res.status(422).json({
      message: error.issues,
    });
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === 'P2002' && req.url.includes('register')) {
      return res.status(409).json({
        message: 'Email address is already in use',
      });
    }
  }

  if (error instanceof CustomError) {
    return res.status(error.code).json({
      message: error.message,
    });
  }

  return res.status(500).json({
    message: 'Something went wrong',
  });
};
