import express from 'express';

import {
  createStore,
  getStore,
  getStoresByUserId,
} from '../controllers/store.controller.js';

const storeRoutes = express.Router();

storeRoutes.get('/', getStore);
storeRoutes.get('/:userId', getStoresByUserId);
storeRoutes.post('/', createStore);

export { storeRoutes };
