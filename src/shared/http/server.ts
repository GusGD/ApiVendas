import 'reflect-metadata';
import 'dotenv/config';
import express, { Request, Response } from 'express';
import cors from 'cors';
import 'express-async-errors';
import routes from '@shared/http/routes';
import AppError from '@shared/errors/AppError';
import { errors } from 'celebrate';
import '@shared/typeorm';
import uploadConfig from '@config/upload';
import { pagination } from 'typeorm-pagination';
import rateLimiter from '@shared/middlewares/rateLimiter';

const app = express();

app.use(cors());
app.use(express.json());
app.use(rateLimiter);
app.use(pagination);
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);
app.use(errors());

app.use((error: Error, request: Request, response: Response) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    });
  }

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(3333);
