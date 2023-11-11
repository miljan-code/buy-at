import express from 'express';

import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from '../controllers/product.controller.js';

const productRoutes = express.Router();

productRoutes.post('/', createProduct);
productRoutes.delete('/:id', deleteProduct);
productRoutes.patch('/:id', updateProduct);
productRoutes.get('/:storeSlug', getProducts);

export { productRoutes };
