import { createClient } from "redis";
import dotenv from "dotenv";

dotenv.config();

const connectWithRetry = async () => {
  const redisClient = createClient({
    url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
    password: process.env.REDIS_PASSWORD,
    socket: {
      connectTimeout: 10000, // 10 seconds
      readTimeout: 10000, // 10 seconds
    },
  });

  redisClient.on("error", (err) => console.error("Redis Client Error", err));

  while (true) {
    try {
      await redisClient.connect();
      console.log("Connected to Redis");
      return redisClient;
    } catch (error) {
      console.error("Failed to connect to Redis. Retrying in 5 seconds...");
      await new Promise((resolve) => setTimeout(resolve, 5000)); // Retry after 5 seconds
    }
  }
};

const redisClient = await connectWithRetry();

const RATE_LIMIT = 2;
const TIME_WINDOW = 24 * 60 * 60; // 24 hours

export const rateLimiter = async (req, res, next) => {
  const userUuid = req.userUuid; // Get UUID from the request object
  const currentTime = Math.floor(Date.now() / 1000);

  try {
    const record = await redisClient.get(userUuid);
    if (record) {
      const data = JSON.parse(record);

      if (currentTime - data.startTime < TIME_WINDOW) {
        if (data.count >= RATE_LIMIT) {
          return res.status(429).json({
            message: "Rate limit exceeded. Try again after 24 hours.",
          });
        }
        data.count += 1;
      } else {
        data.count = 1;
        data.startTime = currentTime;
      }

      await redisClient.set(userUuid, JSON.stringify(data), {
        EX: TIME_WINDOW,
      });
    } else {
      await redisClient.set(
        userUuid,
        JSON.stringify({ count: 1, startTime: currentTime }),
        {
          EX: TIME_WINDOW,
        }
      );
    }
    next();
  } catch (error) {
    console.error("Rate limiting error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
