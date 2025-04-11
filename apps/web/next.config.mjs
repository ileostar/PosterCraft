import withBundleAnalyzer from "@next/bundle-analyzer";
import createNextIntlPlugin from "next-intl/plugin";

// const jiti = createJiti(fileURLToPath(import.meta.url));

// jiti('./src/env');

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const withNextIntl = createNextIntlPlugin("./utils/i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "poster-craft.oss-cn-shenzhen.aliyuncs.com",
      },
      {
        protocol: "https",
        hostname: "img.daisyui.com",
      },
      {
        protocol: "https",
        hostname: "cimg.co",
      },
    ],
  },
};

// Next.js Configuration with `next.intl` enabled
const nextWithIntl = withNextIntl(nextConfig);

// Next.js Configuration with `next.intl` and `bundle-analyzer` enabled
const nextIntlWithBundleAnalyzer = bundleAnalyzer(nextWithIntl);

export default nextIntlWithBundleAnalyzer;
