import { fileURLToPath } from "node:url";

import withBundleAnalyzer from "@next/bundle-analyzer";
import { withSentryConfig } from "@sentry/nextjs";
import createJiti from "jiti";
import withNextIntl from "next-intl/plugin";

// const jiti = createJiti(fileURLToPath(import.meta.url));
// jiti('./src/env');

const withNextIntlConfig = withNextIntl("./utils/i18n/index.ts");

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
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

/** @type {import('@sentry/cli').SentryCliOptions} */
const sentrySettings = {
  // We don't want Sentry to emit logs
  silent: true,
  // Define the Sentry Organisation
  org: "leostar",
  // Define the Sentry Project on our Sentry Organisation
  project: "javascript-nextjs",
};

/** @type {import('@sentry/nextjs/types/config/types').UserSentryOptions} */
const sentryConfig = {
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Automatically annotate React components to show their full name in breadcrumbs and session replay
  reactComponentAnnotation: {
    enabled: true,
  },

  // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  tunnelRoute: "/monitoring",

  // Hides source maps from generated client bundles
  hideSourceMaps: true,

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,

  // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
  // See the following for more information:
  // https://docs.sentry.io/product/crons/
  // https://vercel.com/docs/cron-jobs
  automaticVercelMonitors: true,
};

// Next.js Configuration with `next.intl` enabled
const nextWithIntl = withNextIntlConfig(nextConfig);

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
export default SENTRY_ENABLE ? nextWithSentry : nextIntlWithBundleAnalyzer;
