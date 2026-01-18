import rateLimit from "express-rate-limit";

/**
 * Strict: Login protection
 */
export const loginRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: "Too many login attempts. Try again later."
  }
});

/**
 * Moderate: Refresh token
 */
export const refreshRateLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: "Too many refresh requests."
  }
});

/**
 * Light: Logout
 */
export const logoutRateLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false
});
