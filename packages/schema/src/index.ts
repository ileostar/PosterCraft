import { user } from "./schema/user";

export * from "./schema/user";

export const schemas = {
  user,
};

export type SchemaType = typeof schemas;
