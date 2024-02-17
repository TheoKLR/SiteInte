import dotenv from "dotenv";

dotenv.config()

export const jwtSecret = process.env.JWT_SECRET || 'default';
export const dev_db_url = process.env.OUTSIDE_DATABASE_URL;