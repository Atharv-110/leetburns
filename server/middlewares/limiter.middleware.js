import { rateLimit } from "express-rate-limit";

export const rateLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 2,
  standardHeaders: "draft-7",
  keyGenerator: (req) => req.userUuid,
  legacyHeaders: false,
  message: { message: "Rate limit exceeded. Try again after 24 hours." },
  statusCode: 429,
});
