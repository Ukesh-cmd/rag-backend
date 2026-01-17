import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

export const generateToken = (payload: object) => jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
export const verifyToken = (token: string) => jwt.verify(token, JWT_SECRET);
