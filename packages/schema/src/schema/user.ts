import { mysqlEnum, mysqlTable, serial, text, timestamp, varchar } from "drizzle-orm/mysql-core";

export const user = mysqlTable("user", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password"),
  nickname: text("nickname"),
  avatar: varchar("avatar", { length: 256 }),
  role: mysqlEnum("role", ["admin", "normal"]).default("normal"),
  email: varchar("email", { length: 256 }).notNull(),
  phoneNumber: varchar("phone_number", { length: 256 }),
  oauthUid: varchar("oauth_uid", { length: 256 }).unique(),
  oauthAccessToken: text("oauth_access_token"),
  oauthRefreshToken: text("oauth_refresh_token"),
  oauthExpiresAt: timestamp("oauth_expires_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").onUpdateNow(),
});
