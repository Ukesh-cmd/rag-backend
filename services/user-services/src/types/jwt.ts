// src/types/jwt.ts
import { JwtPayload } from 'jsonwebtoken';

export interface AuthJwtPayload extends JwtPayload {
  id: number;
  role_id: number;
  email: string;
}
