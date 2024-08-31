import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import { dev_db_url } from '../utils/secret';

const client = new Client({
  connectionString: dev_db_url,
});

client.connect();

export const db = drizzle(client);