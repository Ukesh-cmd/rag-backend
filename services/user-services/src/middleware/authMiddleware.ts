import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthJwtPayload } from '../types/jwt';

export const verifyJWT = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];
  const secret = process.env.JWT_SECRET!;

  try {
    const decoded = jwt.verify(token, secret);

    if (typeof decoded === 'string') {
      return res.status(401).json({ error: 'Invalid token payload' });
    }

    req.user = {
      id: decoded.id,
      role_id: decoded.role_id,
      email: decoded.email,
    };

    next();
  } catch {
    return res.status(401).json({ error: 'Invalid token' });
  }
};
