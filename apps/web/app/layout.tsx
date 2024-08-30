import type { Metadata } from "next";

import { Inter } from "next/font/google";

import "../style/globals.css";
import "../style/custom.css";
import "nprogress/nprogress.css";
import "cropperjs/dist/cropper.css";

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
      <body className={inter.className}>{children}</body>
    </html>
  );
}
