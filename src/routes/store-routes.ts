import express from 'express';

import { createStore, getStore } from '../controllers/store-controller.js';

const storeRoutes = express.Router();

storeRoutes.get('/', getStore);
storeRoutes.post('/create', createStore);

export { storeRoutes };
