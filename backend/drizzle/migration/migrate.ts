import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import dotenv from "dotenv";

dotenv.config()

const pool = new Pool({
  connectionString: process.env.OUTSIDE_DATABASE_URL,
});


const db = drizzle(pool);

export async function main() {
  await migrate(db, { migrationsFolder: "drizzle" });
  pool.end();
  process.exit(0);
}

main().catch((err) => {
  console.log(err);
  process.exit(0);
});