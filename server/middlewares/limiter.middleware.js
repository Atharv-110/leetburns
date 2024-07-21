import { rateLimit } from "express-rate-limit";

export const rateLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000,
  limit: 3,
  standardHeaders: "draft-7",
  keyGenerator: (req) => req.userUuid,
  legacyHeaders: false,
  message: {
    message:
      "Slow down, speed racer! You've maxed out your 3 roasts. Try again in 24 hours.",
  },
  statusCode: 429,
});
