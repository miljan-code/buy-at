import express from 'express';

import {
  createStore,
  getStore,
  getStoresByUserId,
} from '../controllers/store-controller.js';
import { authentication } from '../middlewares/authentication.js';

const storeRoutes = express.Router();

storeRoutes.get('/', getStore);
storeRoutes.get('/:userId', authentication, getStoresByUserId);
storeRoutes.post('/', authentication, createStore);

export { storeRoutes };
