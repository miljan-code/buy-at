import express from 'express';

import {
  createProduct,
  deleteProduct,
  getProducts,
} from '../controllers/product.controller.js';

const productRoutes = express.Router();

productRoutes.post('/', createProduct);
productRoutes.delete('/:id', deleteProduct);
productRoutes.get('/:slug', getProducts);

export { productRoutes };
