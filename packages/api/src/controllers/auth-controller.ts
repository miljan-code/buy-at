import type { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { createId } from '@paralleldrive/cuid2';
import bcrypt from 'bcryptjs';

import { db } from '../lib/db.js';
import { generateToken } from '../lib/jwt.js';
import {
  loginUserSchema,
  registerUserSchema,
} from '../lib/validations/auth.js';

const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const userData = registerUserSchema.parse(req.body);
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(userData.password, salt);

  const user = await db.user.create({
    data: {
      id: createId(),
      name: userData.username,
      email: userData.email,
      password: hashedPassword,
    },
  });
  const { password, ...returningUser } = user;

  generateToken(res, user.id);

  res.status(201).json({ status: 'success', data: returningUser });
});

const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const userData = loginUserSchema.parse(req.body);

  const user = await db.user.findUnique({
    where: {
      email: userData.email,
    },
  });
  if (!user) {
    res.status(200).json({
      status: 'fail',
      data: {
        errorName: 'wrongEmail',
        message: `User with that email address doesn't exist`,
      },
    });
    return;
  }
  const passwordIsCorrect = await bcrypt.compare(
    userData.password,
    user.password,
  );
  if (!passwordIsCorrect) {
    res.status(200).json({
      status: 'fail',
      data: {
        errorName: 'wrongPassword',
        message: `Password is incorrect`,
      },
    });
    return;
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
