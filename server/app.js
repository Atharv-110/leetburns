import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import roastRouter from "./routes/roast.js";
import errorRouter from "./routes/error.js";
import configMainRoutes, { mainRouter } from "./routes/main.js";
import { rateLimiter } from "./middlewares/limiter.middleware.js";
import corsOptions from "./config/cors.config.js";
import { uuidMiddleware } from "./middlewares/uuid.middleware.js";
import cookieParser from "cookie-parser";
import connectDB from "./utils/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`🚀 Server is started at PORT: ${PORT}`);
});
await connectDB();
configMainRoutes(app);
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(uuidMiddleware);
app.use("/roast", rateLimiter, roastRouter);
app.use("/", mainRouter);
app.use("*", errorRouter);
