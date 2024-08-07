import dotenv from "dotenv";

dotenv.config();

export const jwtSecret = process.env.JWT_SECRET || "default";
export const dev_db_url = process.env.DATABASE_URL;
export const api_prefix = process.env.API_PREFIX || "/";
export const api_client = process.env.ETU_UTT_CLIENT_ID || "default";
export const api_secret = process.env.ETU_UTT_CLIENT_SECRET || "default";
export const zimbra_host = process.env.ZIMBRA_HOST || "default";
export const zimbra_user = process.env.ZIMBRA_USER || "default";
export const zimbra_password = process.env.ZIMBRA_PASSWORD || "default";
export const cas_login_url = process.env.CAS_LOGIN_URL || "default";
export const cas_validate_url = process.env.CAS_VALIDATE_URL || "default";
export const service_url = process.env.SERVICE_URL || "default";
export const api_utt_username = process.env.API_UTT_USERNAME || "default";
export const api_utt_password = process.env.API_UTT_PASSWORD || "default";
export const api_utt_auth_url = process.env.API_UTT_AUTH_URL || "default";
export const api_utt_admis_url = process.env.API_UTT_ADMIS_URL || "default";
