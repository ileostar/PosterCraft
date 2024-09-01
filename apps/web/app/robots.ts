import config from "@/config";
import { type MetadataRoute } from "next";

const robots = (): MetadataRoute.Robots => ({
  rules: [
    {
      userAgent: "*",
    },
  ],
  sitemap: `${config.SITE_URL}/sitemap.xml`,
  host: config.SITE_URL,
});

export default robots;
