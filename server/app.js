import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import roastRouter from "./routes/roast.js";
import errorRouter from "./routes/error.js";
import configMainRoutes, { mainRouter } from "./routes/main.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

const allowedOrigins = new Set([
  process.env.LOCAL_ALLOWED_URL,
  process.env.STAGED_ALLOWED_URL,
]);

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.has(origin)) {
      return callback(null, true);
    } else {
      return callback(
        new Error(
          `The CORS policy for this site does not allow access from the specified Origin: ${origin}`
        ),
        false
      );
    }
  },
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

configMainRoutes(app);

app.use("/roast", roastRouter);
app.use("/", mainRouter);
app.use("*", errorRouter);

app.listen(PORT, () => {
  console.log(`🚀 Server is started at PORT : ${PORT}`);
});

export default app;
