import type { NextConfig } from "next";
// @ts-expect-error: next-pwa types are not available
import withPWA from "next-pwa";

// Next.js configuration
const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:8000/:path*",
      },
      {
        source: "/eapi/:path*",
        destination: "https://criptoya.com/:path*",
      },
      {
        source: "/bitrue/:path*",
        destination: "https://openapi.bitrue.com/:path*",
      },
    ];
  },
  // add other Next.js config here if needed
};

// PWA options for next-pwa
const pwaOptions = {
  dest: "public",
  register: true,
  skipWaiting: true,
  // disable next-pwa in development to avoid caching issues
  disable: process.env.NODE_ENV === "development",
  runtimeCaching: [
    {
      // Match requests to /eapi/; if you fetch using the relative URL,
      // this rule will intercept them even when offline.
      urlPattern: new RegExp('/eapi/.*'),
      handler: 'NetworkFirst',
      options: {
        cacheName: 'eapi-cache',
        networkTimeoutSeconds: 10, // fall back to cache if network doesn't respond in 10 seconds
        expiration: {
          maxEntries: 50,       // keep a maximum of 50 entries in this cache
          maxAgeSeconds: 300,   // cache responses for up to 5 minutes
        },
        cacheableResponse: {
          statuses: [0, 200],   // cache only successful responses
        },
      },
    },
  ],
};

// Export using the curried form so that pwaOptions are kept separate
export default withPWA(pwaOptions)(nextConfig);