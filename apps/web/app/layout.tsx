import type { Metadata } from "next";

import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Inter } from "next/font/google";

import "./globals.css";
import "nprogress/nprogress.css";

const inter = Inter({ subsets: ["latin"] });

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AntdRegistry>{children}</AntdRegistry>
      </body>
    </html>
  );
}
