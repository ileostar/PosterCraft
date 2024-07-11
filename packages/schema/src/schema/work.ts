import { boolean, int, mysqlTable, serial, text, timestamp, varchar } from "drizzle-orm/mysql-core";

import { user } from "./user";

interface ChannelProps {
  name: string;
  id: string;
}

export const work = mysqlTable("work", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  desc: text("title"),
  coverImg: varchar("cover_img", { length: 256 }),
  content: text("title"),
  isTemplate: boolean("is_template"),
  isPublic: boolean("is_public"),
  isHot: boolean("is_hot"),
  author: varchar("author", { length: 256 }),
  copiedCount: int("copied_count"),
  status: int("status").default(1),
  user: int("user_id").references(() => user.id),
  channels: int("channels").$type<Array<ChannelProps>>(),
  latestPublishAt: timestamp("latest_publishAt"),
});
