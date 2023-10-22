import express from 'express';

import { createStore, getStore } from '../controllers/store-controller.js';
import { authentication } from '../middlewares/authentication.js';

const storeRoutes = express.Router();

storeRoutes.get('/', getStore);
storeRoutes.post('/', authentication, createStore);

export { storeRoutes };
