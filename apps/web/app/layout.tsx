import type { Metadata, Viewport } from "next";

import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";

import "../style/globals.css";
import "../style/custom.css";
import "nprogress/nprogress.css";
import "cropperjs/dist/cropper.css";

import config from "@/config";
import { cn } from "@/lib/utils";

import Provider from "./provider";

export const metadata: Metadata = {
  metadataBase: new URL(config.SITE_URL),
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-US"
      className={cn(GeistSans.variable, GeistMono.variable, "scroll-smooth", "dark")}
      suppressHydrationWarning
    >
      <body className="relative">
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
