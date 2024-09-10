import { GlobalEnvConfig } from "@/config";
import { type MetadataRoute } from "next";

const robots = (): MetadataRoute.Robots => ({
  rules: [
    {
      userAgent: "*",
    },
  ],
  sitemap: `${GlobalEnvConfig.SITE_URL}/sitemap.xml`,
  host: GlobalEnvConfig.SITE_URL,
});

export default robots;
