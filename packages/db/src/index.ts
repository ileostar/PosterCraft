import { Client } from "@planetscale/database";
import { drizzle } from "drizzle-orm/planetscale-serverless";

const client = new Client({
  host: process.env["MYSQL_DATABASE_HOST"],
  username: process.env["MYSQL_DATABASE_USERNAME"],
  password: process.env["MYSQL_DATABASE_PASSWORD"],
});

const db = drizzle(client);

export default db;
