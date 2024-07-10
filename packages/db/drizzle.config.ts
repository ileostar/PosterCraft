import path from "path";
import type { Config } from "drizzle-kit";

import * as dotenv from "dotenv";

dotenv.config({ path: path.resolve(__dirname, "../../apps/server/.env") });

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is missing");
}

export default {
  schema: "../schema/src/schema/*",
  out: "./drizzle",
  dialect: "mysql",
  dbCredentials: {
    url: process.env.DATABASE_URL || "",
  },
  verbose: true,
  strict: true,
} satisfies Config;
