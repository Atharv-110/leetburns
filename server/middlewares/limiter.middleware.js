import { createClient } from "redis";
import dotenv from "dotenv";

dotenv.config();

const redisClient = createClient({
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
  password: process.env.REDIS_PASSWORD,
});

redisClient.on("error", (err) => console.error("Redis Client Error", err));

await redisClient.connect();

const RATE_LIMIT = 2;
const TIME_WINDOW = 24 * 60 * 60;

export const rateLimiter = async (req, res, next) => {
  const userIp = req.headers["x-forwarded-for"] || req.ip;

  console.log("uuid: ", req.cookies.uuid);
  try {
    const record = await redisClient.get(userIp);
    if (record) {
      const data = JSON.parse(record);
      const currentTime = Math.floor(Date.now() / 1000);

      if (currentTime - data.startTime < TIME_WINDOW) {
        if (data.count >= RATE_LIMIT) {
          return res.status(429).json({
            message: "Rate limit exceeded. Try again after 24 hours.",
          });
        } else {
          data.count += 1;
          await redisClient.set(userIp, JSON.stringify(data), {
            EX: TIME_WINDOW,
          });
        }
      } else {
        await redisClient.set(
          userIp,
          JSON.stringify({ count: 1, startTime: currentTime }),
          { EX: TIME_WINDOW }
        );
      }
    } else {
      const startTime = Math.floor(Date.now() / 1000);
      await redisClient.set(userIp, JSON.stringify({ count: 1, startTime }), {
        EX: TIME_WINDOW,
      });
    }

    next();
  } catch (error) {
    console.error("Rate limiting error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
