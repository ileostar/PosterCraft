import { int, mysqlTable, serial, text, timestamp, varchar } from "drizzle-orm/mysql-core";

export const user = mysqlTable("user", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 256 }),
  password: int("country_id"),
  email: varchar("email", { length: 256 }),
  phoneNumber: varchar("email", { length: 256 }),
  oauthUid: varchar("oauth_uid", { length: 256 }).unique(),
  oauthAccessToken: text("oauth_access_token"),
  oauthRefreshToken: text("oauth_refresh_token"),
  oauthExpiresAt: timestamp("oauth_expires_at"),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});
