import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import { errorHandler } from './middleware/errorMiddleware.js';
import userRouter from './routes/user.routes.js';
import productRouter from './routes/product.routes.js';
import biddingRouter from './routes/bidding.routes.js';
import categoryRouter from './routes/categories.routes.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

const PORT = process.env.PORT || 8000;

app.get('/api', (req, res) => {
  res.send('Server loaded');
});
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/biddings', biddingRouter);
app.use('/api/categories', categoryRouter);

app.use(errorHandler);
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((e) => console.log('Error connecting to MongoDB: ' + e));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
