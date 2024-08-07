import { mysqlEnum, mysqlTable, text, timestamp, unique, varchar } from "drizzle-orm/mysql-core";
import { v4 as uuidV4 } from "uuid";

export const user = mysqlTable(
  "user",
  {
    id: varchar("id", { length: 128 })
      .$defaultFn(() => uuidV4())
      .primaryKey(),
    username: varchar("username", { length: 256 }).notNull().unique(),
    password: text("password"),
    nickname: text("nickname"),
    avatar: varchar("avatar", { length: 256 }),
    role: mysqlEnum("role", ["admin", "normal"]).default("normal"),
    email: varchar("email", { length: 256 }),
    phone: varchar("phone", { length: 256 }),
    provider: varchar("provider", { length: 256 }),
    providerId: varchar("provider_id", { length: 256 }).unique(),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    oauthExpiresAt: timestamp("oauth_expires_at"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").onUpdateNow(),
  },
  (t) => ({
    oauthId: unique("oauth_id").on(t.provider, t.providerId),
  }),
);
