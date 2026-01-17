import { Router } from "express";
import * as authController from "../controllers/authController";
import {
  loginRateLimiter,
  refreshRateLimiter,
  logoutRateLimiter
} from "../middleware/rateLimitMiddleware";

const router = Router();

router.post("/login", loginRateLimiter, authController.loginController);
router.post("/refresh", refreshRateLimiter, authController.refreshTokenController);
router.post("/logout", logoutRateLimiter, authController.logoutController);
router.post("/register", authController.registerController);

export { router as authRoutes };
