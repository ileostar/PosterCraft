const path = require("path");
const dotenv = require("dotenv");

const envName = process.env.NODE_ENV === "production" ? ".env.prod" : ".env";

dotenv.configDotenv({
  path: path.resolve(__dirname, `../../${envName}`),
});

export default {
  isDev: true,
  serverUrl: process.env.SERVER_URL || "http://120.0.0.1",
  SITE_URL: process.env.SITE_URL || "http://localhost:3000",
};

export * from "./footerLinks";
