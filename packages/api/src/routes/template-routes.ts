import express from 'express';

import { getTemplate } from '../controllers/template-controller.js';

const templateRoutes = express.Router();

templateRoutes.get('/', getTemplate);

export { templateRoutes };
