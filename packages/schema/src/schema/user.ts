import { mysqlTable, serial, text, timestamp, varchar } from "drizzle-orm/mysql-core";

export const user = mysqlTable("user", {
  id: serial("id").primaryKey(),
  username: text("username").notNull(),
  password: text("password").notNull(),
  email: varchar("email", { length: 256 }).notNull(),
  phoneNumber: varchar("phone_number", { length: 256 }),
  oauthUid: varchar("oauth_uid", { length: 256 }).unique(),
  oauthAccessToken: text("oauth_access_token"),
  oauthRefreshToken: text("oauth_refresh_token"),
  oauthExpiresAt: timestamp("oauth_expires_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").onUpdateNow(),
});
