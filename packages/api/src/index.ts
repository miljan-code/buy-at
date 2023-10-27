import express from 'express';
import cors, { CorsOptions } from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import { storeRoutes } from './routes/store-routes.js';
import { authRoutes } from './routes/auth-routes.js';
import { templateRoutes } from './routes/template-routes.js';
import { authentication } from './middlewares/authentication.js';
import { errorHandler } from './middlewares/error-handler.js';

dotenv.config();

const port = process.env.PORT;
const app = express();

const corsOpts = {
  origin: 'http://localhost:4201',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
} satisfies CorsOptions;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOpts));
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/store', authentication, storeRoutes);
app.use('/api/template', templateRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
