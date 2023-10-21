import type { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import { createId } from '@paralleldrive/cuid2';
import { eq } from 'drizzle-orm';

import { db } from '../db/index.js';
import { userFields, users } from '../db/schema/user.js';
import { generateToken } from '../lib/jwt.js';
import {
  loginUserSchema,
  registerUserSchema,
} from '../lib/validations/auth.js';
import { CustomError } from '../lib/exceptions.js';

const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const userData = registerUserSchema.parse(req.body);
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(userData.password, salt);

  const [user] = await db
    .insert(users)
    .values({
      id: createId(),
      name: userData.name,
      email: userData.email,
      password: hashedPassword,
    })
    .returning();
  const { password, ...returningUser } = user;

  generateToken(res, user.id);

  res.status(201).json({ status: 'success', data: returningUser });
});

const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const userData = loginUserSchema.parse(req.body);

  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.email, userData.email))
    .limit(1);
  if (!user) {
    throw new CustomError(
      `User with email address ${userData.email} doesn't exist.`,
      404
    );
  }
  const passwordIsCorrect = await bcrypt.compare(
    userData.password,
    user.password
  );
  if (!passwordIsCorrect) {
    throw new CustomError('Password is incorrect.', 403);
  }

  generateToken(res, user.id);

  const { password, ...returningUser } = user;
  res.status(200).json({
    status: 'success',
    data: returningUser,
  });
});

const logoutUser = asyncHandler(async (req: Request, res: Response) => {
  res.clearCookie('jwt');
  res.status(200).json({
    status: 'success',
    data: null,
  });
});

const getCurrentUser = asyncHandler(async (req: Request, res: Response) => {
  const user = req.res?.locals.user;

  res.status(200).json({ status: 'success', data: user });
});

export { registerUser, loginUser, logoutUser, getCurrentUser };
