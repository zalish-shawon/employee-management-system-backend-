import dotenv from "dotenv";
dotenv.config();

export const config = {
  PORT: process.env.PORT || "5000",
  NODE_ENV: process.env.NODE_ENV || "development",

  MONGO_URI: process.env.MONGO_URI as string,

  JWT_SECRET: process.env.JWT_SECRET as string,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET as string,

  ACCESS_TOKEN_EXPIRY: process.env.ACCESS_TOKEN_EXPIRY as string || "15m",
  REFRESH_TOKEN_EXPIRY: process.env.REFRESH_TOKEN_EXPIRY as string || "7d",

  SALT_ROUNDS: Number(process.env.SALT_ROUNDS) || 10,

  UPLOAD_DIR: process.env.UPLOAD_DIR || "uploads",

  FRONTEND_ORIGIN: process.env.FRONTEND_ORIGIN || "https://employee-management-system-frontend-chi.vercel.app"
};
