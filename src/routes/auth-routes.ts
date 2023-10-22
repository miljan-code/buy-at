import express from 'express';

import {
  getCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
} from '../controllers/auth-controller.js';
import { authentication } from '../middlewares/auth-middleware.js';

const authRoutes = express.Router();

authRoutes.post('/register', registerUser);
authRoutes.post('/login', loginUser);
authRoutes.get('/logout', logoutUser);
authRoutes.get('/', authentication, getCurrentUser);

export { authRoutes };
