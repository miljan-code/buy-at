import express from 'express';
import cors, { CorsOptions } from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import { storeRoutes } from './routes/store.routes.js';
import { authRoutes } from './routes/auth.routes.js';
import { templateRoutes } from './routes/template.routes.js';
import { uploadRotues } from './routes/upload.routes.js';
import { productRoutes } from './routes/product.routes.js';
import { categoryRoutes } from './routes/category.routes.js';
import { authentication } from './middlewares/auth.middleware.js';
import { errorHandler } from './middlewares/error.middleware.js';

dotenv.config();

const port = process.env.PORT;
const app = express();

const corsOpts = {
  origin: (origin, cb) => {
    const www = 'http://localhost:4201';
    const templateRegex = `^http:\/\/[a-zA-Z0-9-]+\.localhost:4200$`;
    if (!origin || origin.match(www) || origin.match(templateRegex)) {
      cb(null, true);
    } else {
      cb(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
} satisfies CorsOptions;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOpts));
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/store', authentication, storeRoutes);
app.use('/api/product', authentication, productRoutes);
app.use('/api/category', authentication, categoryRoutes);
app.use('/api/template', templateRoutes);
app.use('/api/upload', authentication, uploadRotues);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
