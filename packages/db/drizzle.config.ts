import path from "path";
import type { Config } from "drizzle-kit";

import * as dotenv from "dotenv";

dotenv.config({ path: path.resolve(__dirname, "../../apps/api/.env") });

console.log("process.env.MYSQL_DATABASE_URL: ", process.env.MYSQL_DATABASE_URL);

export default {
  schema: "../schema/src/schema/*",
  out: "./drizzle",
  dialect: "mysql",
  dbCredentials: {
    url: process.env.MYSQL_DATABASE_URL || "",
  },
} satisfies Config;
