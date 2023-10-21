import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import { eq } from 'drizzle-orm';

import { db } from '../db/index.js';
import { CustomError } from '../lib/exceptions.js';
import { users, userFields, type User } from '../db/schema/user.js';

declare global {
  namespace Express {
    interface Locals {
      user: User;
    }
  }
}

export const authentication = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.jwt as string | undefined;
    if (!token) throw new CustomError('Unauthorized', 401);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (typeof decoded === 'string' || !decoded.exp) {
      throw new CustomError('Not authorized', 401);
    }

    const [user] = await db
      .select(userFields)
      .from(users)
      .where(eq(users.id, decoded.userId));
    if (!user) throw new CustomError('User not found', 404);

    res.locals.user = user;
    next();
  }
);
