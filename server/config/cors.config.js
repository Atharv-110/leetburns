import dotenv from "dotenv";
dotenv.config();
const allowedOrigins = [
  process.env.LOCAL_ALLOWED_URL,
  process.env.STAGED_ALLOWED_UR,
];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

export default corsOptions;
