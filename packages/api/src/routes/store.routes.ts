import express from 'express';

import {
  createStore,
  getStore,
  getStoresByUserId,
  updateStore,
} from '../controllers/store.controller.js';

const storeRoutes = express.Router();

storeRoutes.get('/', getStore);
storeRoutes.get('/:userId', getStoresByUserId);
storeRoutes.patch('/:storeId', updateStore);
storeRoutes.post('/', createStore);

export { storeRoutes };
