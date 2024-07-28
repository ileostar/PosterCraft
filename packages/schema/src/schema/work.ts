import { boolean, int, json, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

import { user } from "./user";

type ChannelProps = {
  name: string;
  id: string;
};

export const work = mysqlTable("work", {
  id: int("id").primaryKey().autoincrement(),
  uuid: varchar("uuid", { length: 256 }).unique(),
  title: text("title").notNull(),
  desc: text("desc"),
  coverImg: varchar("cover_img", { length: 256 }),
  content: json("content").default({}),
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
