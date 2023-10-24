import type { Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import type { User } from '../types/prisma.js';

dotenv.config();

interface UserId {
  userId: User['id'];
}

declare module 'jsonwebtoken' {
  interface JwtPayload extends UserId {}
}

const jwtSecret = {
  key: process.env.JWT_SECRET,
};

export const generateToken = (res: Response, userId: User['id']) => {
  const token = jwt.sign({ userId }, jwtSecret.key, { expiresIn: '7d' });

  res.cookie('__buyat_jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
};
