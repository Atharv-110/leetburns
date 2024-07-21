import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import roastRouter from "./routes/roast.js";
import errorRouter from "./routes/error.js";
import configMainRoutes, { mainRouter } from "./routes/main.js";
import { rateLimiter } from "./middlewares/limiter.middleware.js";
import corsOptions from "./config/cors.config.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

configMainRoutes(app);

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use("/roast", rateLimiter, roastRouter);
app.use("/", mainRouter);
app.use("*", errorRouter);

app.listen(PORT, () => {
  console.log(`🚀 Server is started at PORT: ${PORT}`);
});
