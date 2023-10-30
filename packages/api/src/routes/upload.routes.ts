import express from 'express';
import { upload, uploadImage } from '../controllers/upload.controller.js';

const uploadRotues = express.Router();

uploadRotues.post('/', upload.single('image'), uploadImage);

export { uploadRotues };
