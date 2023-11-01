import express from 'express';

import {
  createProduct,
  getProducts,
} from '../controllers/product.controller.js';

const productRoutes = express.Router();

productRoutes.post('/', createProduct);
productRoutes.get('/:storeId', getProducts);

export { productRoutes };
