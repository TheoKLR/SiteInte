import dotenv from "dotenv";

dotenv.config()

export const jwtSecret = process.env.JWT_SECRET || 'default';
export const dev_db_url = process.env.OUTSIDE_DATABASE_URL;
export const api_client = process.env.ETU_UTT_CLIENT_ID || 'default';
export const api_secret = process.env.ETU_UTT_CLIENT_SECRET || 'default';