import { user } from "./schema/user";
import { work } from "./schema/work";

export * from "./schema/user";
export * from "./schema/work";

export const schemas = {
  user,
  work,
};

export type SchemaType = typeof schemas;
