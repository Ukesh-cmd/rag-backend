import { Router } from "express";
import { proxyRequest } from "../proxy/proxy";
import { SERVICES } from "../utils/serviceRegistry";
import { verifyJWT } from "../middleware/verifyJWT";
import { requirePermission } from "../middleware/rbac";

const router = Router();

router.use(verifyJWT);

router.get(
  "/users/:id",
  requirePermission("user:read"),
  (req, res) => proxyRequest(req, res, SERVICES.users)
);

router.patch(
  "/users/:id/role",
  requirePermission("role:assign"),
  (req, res) => proxyRequest(req, res, SERVICES.users)
);

export default router;
