import type { Metadata, Viewport } from "next";

import { Analytics } from "@vercel/analytics/react";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { ViewTransitions } from "next-view-transitions";

import "@/styles/globals.css";
import "@/styles/custom.css";
import "nprogress/nprogress.css";
import "cropperjs/dist/cropper.css";
import "lenis/dist/lenis.css";

import { allLocaleCodes, availableLocalesMap, defaultLocale } from "@/config";
import { cn } from "@/lib/utils";
import { getLocale, unstable_setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import Provider from "./provider";

export const metadata: Metadata = {
  title: "PosterCraft —— 海报编辑器",
  description: "海报编辑器",
  icons: [
    {
      rel: "icon",
      url: "/favicon.png",
    },
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  if (!allLocaleCodes.includes(locale)) {
    // Forces the current locale to be the Default Locale
    unstable_setRequestLocale(defaultLocale?.code!);
    // when the locale is not listed in the locales, return NotFound
    return notFound();
  }

  // Configures the current Locale to be the given Locale of the Request
  unstable_setRequestLocale(locale);
  return (
    <ViewTransitions>
      <html
        lang="en-US"
        className={cn(GeistSans.variable, GeistMono.variable, "scroll-smooth")}
        suppressHydrationWarning
      >
        <body className="relative">
          <Provider>{children}</Provider>
          <Analytics />
        </body>
      </html>
    </ViewTransitions>
  );
}
