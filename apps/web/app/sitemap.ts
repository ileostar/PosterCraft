import config from "@/config";
import { type MetadataRoute } from "next";

const sitemap = (): MetadataRoute.Sitemap => {
  const routes: MetadataRoute.Sitemap = [
    "",
    "/auth/login",
    "/auth/register",
    "/editor",
    "/user",
    "/templates",
    "/works",
  ].map((route) => ({
    url: `${config.SITE_URL}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes];
};

export default sitemap;
