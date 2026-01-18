import { Request, Response, NextFunction } from "express";
import axios from "axios";
import { SERVICES } from "../utils/serviceRegistry";

export const requirePermission = (permission: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthenticated" });
    }

    const { role_id } = req.user;

    const response = await axios.get(
      `${SERVICES.users}/roles/${role_id}/permissions`
    );

    const permissions = response.data;
    const allowed = permissions.some(
      (p: any) => p.name === permission
    );

    if (!allowed) {
      return res.status(403).json({ error: "Forbidden" });
    }

    next();
  };
};
