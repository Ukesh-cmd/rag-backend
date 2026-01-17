// rbacMiddleware.ts
import { Request, Response, NextFunction } from "express";
import * as userService from "../services/userService";

export const requirePermission = (permissionName: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const userId = req.user.id;

    const user = await userService.getUserById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const permissions = await userService.getPermissionsByRole(user.role_id);
    const hasPermission = permissions.some(
      (p) => p.name === permissionName
    );

    if (!hasPermission) {
      return res
        .status(403)
        .json({ error: "Forbidden: insufficient permissions" });
    }

    next();
  };
};
