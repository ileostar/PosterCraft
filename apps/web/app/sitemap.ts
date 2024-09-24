import { GlobalEnvConfig } from "@/config";
import { type MetadataRoute } from "next";

const sitemap = (): MetadataRoute.Sitemap => {
  const routes: MetadataRoute.Sitemap = [
    "",
    "/[locale]/auth/login",
    "/[locale]/auth/register",
    "/[locale]/editor",
    "/[locale]/user",
    "/[locale]/templates",
    "/[locale]/works",
  ].map((route) => ({
    url: `${GlobalEnvConfig.SITE_URL}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes];
};

export default sitemap;
