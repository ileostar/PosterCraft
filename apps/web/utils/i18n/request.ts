import { routing } from "@/utils/i18n/routing";
import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";

export default getRequestConfig(async ({ locale }) => {
  if (!routing.locales.includes(locale as any)) notFound();

  return {
    messages: (await import(`../../locales/${locale}.json`)).default,
  };
});
