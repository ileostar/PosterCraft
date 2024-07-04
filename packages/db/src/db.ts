import path from "node:path";

import dotenv from "dotenv";
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

dotenv.config({ path: path.resolve(__dirname, "../../../apps/server/.env") });

const connection = await mysql.createConnection({
  host: process.env.MYSQL_DATABASE_HOST,
  user: process.env.MYSQL_DATABASE_USERNAME,
  password: process.env.MYSQL_DATABASE_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

export const db = drizzle(connection);
