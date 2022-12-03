import AppError from '@shared/errors/AppError';
import { NextFunction, Request, Response } from 'express';
import { Secret, verify } from 'jsonwebtoken';
import authConfig from '@config/auth';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

function isAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT Token is Missing.');
  }

  const [, token] = authHeader.split(' ');

  try {
    const decodeToken = verify(token, authConfig.jwt.secret as Secret);
    const { sub } = decodeToken as TokenPayload;
    request.user = {
      id: sub,
    };
    return next();
  } catch {
    throw new AppError('Invalid JWT Token.');
  }
}

export default isAuthenticated;
