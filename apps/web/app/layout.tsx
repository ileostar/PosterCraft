import type { Metadata, Viewport } from "next";

import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import localFont from "next/font/local";

import "../style/globals.css";
import "../style/custom.css";
import "nprogress/nprogress.css";
import "cropperjs/dist/cropper.css";

import { cn } from "@/lib/utils";

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
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

const CalSans = localFont({
  src: "../public/fonts/CalSans-SemiBold.woff2",
  variable: "--font-title",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-US"
      className={cn(GeistSans.variable, GeistMono.variable, CalSans.variable, "scroll-smooth")}
      suppressHydrationWarning
    >
      <body className="relative">
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
