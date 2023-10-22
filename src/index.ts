import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import { storeRoutes } from './routes/store-routes.js';
import { authRoutes } from './routes/auth-routes.js';
import { errorHandler } from './middlewares/error-handler.js';

dotenv.config();

const port = process.env.PORT;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

app.use('/api/store', storeRoutes);
app.use('/api/auth', authRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
