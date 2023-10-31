import express from 'express';

import {
  createStore,
  getStore,
  getStores,
  getStoresByUserId,
  updateStore,
} from '../controllers/store.controller.js';

const storeRoutes = express.Router();

storeRoutes.get('/', getStores);
storeRoutes.get('/:slug', getStore);
storeRoutes.get('/:userId', getStoresByUserId);
storeRoutes.patch('/:storeId', updateStore);
storeRoutes.post('/', createStore);

export { storeRoutes };
