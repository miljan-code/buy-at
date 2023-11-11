import express from 'express';

import {
  getProductBySlug,
  getProductsByCategory,
  getTemplate,
} from '../controllers/template.controller.js';

const templateRoutes = express.Router();

templateRoutes.get('/', getTemplate);
templateRoutes.get('/:slug', getProductBySlug);
templateRoutes.get('/category/:category', getProductsByCategory);

export { templateRoutes };
