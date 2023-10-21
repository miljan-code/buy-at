import jwt from 'jsonwebtoken';
import type { Response } from 'express';
import type { User } from '../db/schema/user.js';

interface UserId {
  userId: User['id'];
}

declare module 'jsonwebtoken' {
  interface JwtPayload extends UserId {}
}

const jwtSecret = {
  key: process.env.JWT_SECRET,
  passphrase: process.env.JWT_PASSPHRASE,
};

export const generateToken = (res: Response, userId: User['id']) => {
  const token = jwt.sign({ userId }, jwtSecret, { expiresIn: '7d' });

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
};
