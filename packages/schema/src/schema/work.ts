import { createId } from "@paralleldrive/cuid2";
import { boolean, int, json, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

import { user } from "./user";

type ChannelProps = {
  channelId: string;
  name: string;
};

type Content = {
  components?: Array<any>;
  props?: any;
};

export const work = mysqlTable("work", {
  id: int("id").primaryKey().autoincrement(),
  uuid: varchar("uuid", { length: 128 })
    .$defaultFn(() => createId())
    .unique(),
  title: text("title").notNull(),
  desc: text("desc"),
  coverImg: varchar("cover_img", { length: 256 }),
  content: json("content").$type<Content>().notNull().default({}),
  isTemplate: boolean("is_template"),
  isPublic: boolean("is_public"),
  isHot: boolean("is_hot"),
  author: varchar("author", { length: 256 }),
  copiedCount: int("copied_count").default(0),
  status: int("status").default(0),
  userId: varchar("user_id", { length: 128 }).references(() => user.id),
  channels: json("channels").$type<Array<ChannelProps>>().notNull().default([]),
  latestPublishAt: timestamp("latest_publishAt"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").onUpdateNow(),
});
