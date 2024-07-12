import path from "node:path";
import url from "node:url";

import dotenv from "dotenv";
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

const envName = process.env.NODE_ENV === "production" ? ".env.prod" : ".env";
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: path.resolve(__dirname, `../../../apps/server/${envName}`),
});
const connection = await mysql.createConnection({
  uri: process.env.DATABASE_URL,
  multipleStatements: true,
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10,
  idleTimeout: 60000,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

export const db = drizzle(connection);
