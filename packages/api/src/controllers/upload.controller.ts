import type { Request, Response } from 'express';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import asyncHandler from 'express-async-handler';
import 'dotenv/config';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({ cloudinary });
const upload = multer({ storage });

const uploadImage = asyncHandler(async (req: Request, res: Response) => {
  const imageUrl = req.file?.path || null;

  res.status(201).json(imageUrl);
});

export { upload, uploadImage };
