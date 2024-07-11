import { poster } from "./schema/poster";
import { user } from "./schema/user";

export * from "./schema/user";
export * from "./schema/poster";

export const schemas = {
  user,
  poster,
};

export type SchemaType = typeof schemas;
