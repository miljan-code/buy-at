import express from 'express';

import { createStore } from '../controllers/store-controller.js';

const storeRoutes = express.Router();

storeRoutes.post('/create', createStore);

export { storeRoutes };
