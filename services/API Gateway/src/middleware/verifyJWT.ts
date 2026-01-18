import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface GatewayUser {
  id: number;
  role_id: number;
}

declare global {
  namespace Express {
    interface Request {
      user?: GatewayUser;
    }
  }
}

export const verifyJWT = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const header = req.headers.authorization;
  if (!header) {
    return res.status(401).json({ error: "Missing token" });
  }

  try {
    const token = header.split(" ")[1];
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as GatewayUser;

    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ error: "Invalid token" });
  }
};
