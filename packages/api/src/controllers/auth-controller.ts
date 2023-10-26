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
    include: {
      stores: true,
    },
  });
  const { password, ...returningUser } = user;

  generateToken(res, user.id);

  res.status(201).json(returningUser);
});

const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const userData = loginUserSchema.parse(req.body);

  const user = await db.user.findUnique({
    where: {
      email: userData.email,
    },
    include: {
      stores: true,
    },
  });
  if (!user) {
    res.status(403).json({
      errorName: 'wrongEmail',
      message: `User with that email address doesn't exist`,
    });
    return;
  }
  const passwordIsCorrect = await bcrypt.compare(
    userData.password,
    user.password,
  );
  if (!passwordIsCorrect) {
    res.status(401).json({
      errorName: 'wrongPassword',
      message: `Password is incorrect`,
    });
    return;
  }

  generateToken(res, user.id);

  const { password, ...returningUser } = user;
  res.status(200).json(returningUser);
});

const logoutUser = asyncHandler(async (req: Request, res: Response) => {
  res.cookie('__buyat_jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json(null);
});

const getCurrentUser = asyncHandler(async (req: Request, res: Response) => {
  const user = req.res?.locals.user;

  res.status(200).json(user);
});

export { registerUser, loginUser, logoutUser, getCurrentUser };
