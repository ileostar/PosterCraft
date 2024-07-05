import path from "path";
import type { Config } from "drizzle-kit";

import * as dotenv from "dotenv";

dotenv.config({ path: path.resolve(__dirname, "../../apps/server/.env.test") });

if (!process.env.MYSQL_DATABASE) {
  throw new Error("MYSQL_DATABASE is missing");
}

export default {
  schema: "../schema/src/schema/*",
  out: "./drizzle",
  dialect: "mysql",
  dbCredentials: {
    host: process.env.MYSQL_DATABASE_HOST || "localhost",
    port: Number(process.env.MYSQL_DATABASE_PORT) || 3306,
    user: process.env.MYSQL_DATABASE_USERNAME || "root",
    password: process.env.MYSQL_DATABASE_PASSWORD || "root",
    database: process.env.MYSQL_DATABASE || "poster_craft",
  },
  verbose: true,
  strict: true,
} satisfies Config;
