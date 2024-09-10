import withBundleAnalyzer from "@next/bundle-analyzer";
import { withSentryConfig } from "@sentry/nextjs";
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

/** @type {import('@sentry/cli').SentryCliOptions} */
const sentrySettings = {
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options
  // We don't want Sentry to emit logs
  silent: !process.env.CI,
  // Define the Sentry Organisation
  org: "leostar",
  // Define the Sentry Project on our Sentry Organisation
  project: "javascript-nextjs",
};

/** @type {import('@sentry/nextjs/types/config/types').UserSentryOptions} */
const sentryConfig = {
  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Automatically annotate React components to show their full name in breadcrumbs and session replay
  reactComponentAnnotation: {
    enabled: true,
  },

  // Tree shake Sentry stuff from the bundle
  disableLogger: true,
  // Applies same WebPack Transpilation as Next.js. Transpiles SDK to be compatible with IE11 (increases bundle size)
  transpileClientSDK: true,
  // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  tunnelRoute: "/monitoring",

  // Hides source maps from generated client bundles
  hideSourceMaps: true,

  // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
  // See the following for more information:
  // https://docs.sentry.io/product/crons/
  // https://vercel.com/docs/cron-jobs
  automaticVercelMonitors: true,
};

// Next.js Configuration with `next.intl` and `bundle-analyzer` enabled
const nextIntlWithBundleAnalyzer = bundleAnalyzer(nextWithIntl);

// Next.js Configuration with `sentry` enabled
const nextWithSentry = withSentryConfig(
  // Next.js Config with i18n Configuration
  nextIntlWithBundleAnalyzer,
  // Default Sentry Settings
  sentrySettings,
  // Default Sentry Extension Configuration
  sentryConfig,
);

// Decides whether enabling Sentry or not
// By default we only want to enable Sentry within a Vercel Environment
export default process.env.SENTRY_ENABLE === "true" ? nextWithSentry : nextIntlWithBundleAnalyzer;
