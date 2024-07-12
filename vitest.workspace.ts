import { defineWorkspace } from "vitest/config";

export default defineWorkspace([
  "apps/server",
  "apps/web",
  "packages/db",
  "packages/shared",
  "packages/ui",
]);
