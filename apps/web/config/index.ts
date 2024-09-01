const path = require("path");
const dotenv = require("dotenv");

const envName = process.env.NODE_ENV === "production" ? ".env.prod" : ".env";

dotenv.configDotenv({
  path: path.resolve(__dirname, `../../${envName}`),
});

const localePrefix = "as-needed";
export default {
  isDev: true,
  serverUrl: process.env.SERVER_URL || "http://120.0.0.1",
  SITE_URL: process.env.SITE_URL || "http://localhost:3000",
  DEV_DOCS: process.env.DEV_DOCS || "http://poster-craft-docs.vercel.app",
};
export const AppConfig = {
  name: "SaaS Template",
  locales: [
    {
      id: "en",
      name: "English",
    },
    { id: "fr", name: "Français" },
  ],
  defaultLocale: "en",
  localePrefix,
};
export const AllLocales = AppConfig.locales.map((locale) => locale.id);

export * from "./footerLinks";
