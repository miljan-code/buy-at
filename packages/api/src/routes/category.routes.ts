import express from 'express';

import {
  createCategory,
  deleteCategory,
  getCategories,
} from '../controllers/category.controller.js';

const categoryRoutes = express.Router();

categoryRoutes.post('/', createCategory);
categoryRoutes.delete('/:id', deleteCategory);
categoryRoutes.get('/:slug', getCategories);

export { categoryRoutes };
