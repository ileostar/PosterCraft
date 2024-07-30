import { createId } from "@paralleldrive/cuid2";
import { boolean, int, json, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

import { user } from "./user";

type ChannelProps = {
  name: string;
  id: string;
};

export const work = mysqlTable("work", {
  id: int("id").primaryKey().autoincrement(),
  uuid: varchar("id", { length: 128 })
    .$defaultFn(() => createId())
    .unique(),
  title: text("title").notNull(),
  desc: text("desc"),
  coverImg: varchar("cover_img", { length: 256 }),
  content: json("content").default({}),
  isTemplate: boolean("is_template").default(false),
  isPublic: boolean("is_public").default(false),
  isHot: boolean("is_hot").default(false),
  author: varchar("author", { length: 256 }),
  copiedCount: int("copied_count").default(0),
  status: int("status").default(1),
  userId: varchar("user_id", { length: 128 }).references(() => user.id),
  channels: json("channels").$type<Array<ChannelProps>>(),
  latestPublishAt: timestamp("latest_publishAt"),
});
