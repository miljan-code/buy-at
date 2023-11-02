import express from 'express';

import {
  createCategory,
  getCategories,
} from '../controllers/category.controller.js';

const categoryRoutes = express.Router();

categoryRoutes.post('/', createCategory);
categoryRoutes.get('/:slug', getCategories);

export { categoryRoutes };
