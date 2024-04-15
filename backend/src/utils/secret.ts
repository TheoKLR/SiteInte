import dotenv from "dotenv";

dotenv.config();

export const jwtSecret = process.env.JWT_SECRET || "default";
export const dev_db_url = process.env.DATABASE_URL;
export const api_prefix = process.env.API_PREFIX || "/";
export const api_client = process.env.ETU_UTT_CLIENT_ID || "default";
export const api_secret = process.env.ETU_UTT_CLIENT_SECRET || "default";
