import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';

import { db } from '../lib/db.js';
import { CustomError } from '../lib/exceptions.js';
import type { User } from '../types/prisma.js';

declare global {
  namespace Express {
    interface Locals {
      user: User;
    }
  }
}

export const authentication = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies['__buyat_jwt'] as string | undefined;
    if (!token) throw new CustomError('Unauthorized', 401);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (typeof decoded === 'string' || !decoded.exp) {
      throw new CustomError('Not authorized', 401);
    }

    const user = await db.user.findUnique({
      where: {
        id: decoded.userId,
      },
      include: {
        stores: true,
      },
    });
    if (!user) throw new CustomError('User not found', 404);
    const { password, ...userWithoutPassword } = user;

    res.locals.user = userWithoutPassword;
    next();
  },
);
