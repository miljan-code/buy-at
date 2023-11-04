import express from 'express';

import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from '../controllers/category.controller.js';

const categoryRoutes = express.Router();

categoryRoutes.post('/', createCategory);
categoryRoutes.delete('/:id', deleteCategory);
categoryRoutes.patch('/:id', updateCategory);
categoryRoutes.get('/:slug', getCategories);

export { categoryRoutes };
