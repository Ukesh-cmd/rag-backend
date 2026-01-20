import { Request, Response, NextFunction } from "express";
import axios from "axios";

export const requirePermission = (permission: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthenticated" });
    }

    try {
      const response = await axios.get(
        `http://user-service:3000/internal/permissions/${req.user.id}`
      );

      const permissions: string[] = response.data;

      if (!permissions.includes(permission)) {
        return res.status(403).json({ error: "Forbidden" });
      }

      next();
    } catch {
      return res.status(500).json({ error: "RBAC check failed" });
    }
  };
};
