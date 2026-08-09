import { dirname } from "path";
import { fileURLToPath } from "url";

const projectRoot = dirname(fileURLToPath(import.meta.url));
const isDevelopment = process.env.NODE_ENV !== "production";

const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "form-action 'self' mailto:",
  "frame-ancestors 'none'",
  "object-src 'none'",
  `script-src 'self' 'unsafe-inline'${isDevelopment ? " 'unsafe-eval'" : ""} https://www.googletagmanager.com https://pagead2.googlesyndication.com https://googleads.g.doubleclick.net`,
  "script-src-elem 'self' 'unsafe-inline' https://www.googletagmanager.com https://pagead2.googlesyndication.com https://googleads.g.doubleclick.net",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://res.cloudinary.com https://cdn.sanity.io https://printgo.vn https://banner2.cleanpng.com https://multipanelmexico.com https://file.hstatic.net https://encrypted-tbn0.gstatic.com https://www.google-analytics.com https://www.googletagmanager.com https://googleads.g.doubleclick.net https://*.googlesyndication.com https://*.doubleclick.net",
  "media-src 'self' blob: https://res.cloudinary.com",
  "connect-src 'self' https://syr5q4gg.api.sanity.io https://syr5q4gg.apicdn.sanity.io https://www.google-analytics.com https://analytics.google.com https://www.googletagmanager.com https://pagead2.googlesyndication.com https://googleads.g.doubleclick.net https://*.googlesyndication.com https://*.doubleclick.net",
  "frame-src 'self' https://googleads.g.doubleclick.net https://*.googlesyndication.com",
  "font-src 'self' data:",
  ...(isDevelopment ? [] : ["upgrade-insecure-requests"])
].join("; ");

/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: projectRoot,
  distDir: process.env.NEXT_BUILD_DIST_DIR || ".next",
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: contentSecurityPolicy
          },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), geolocation=(), microphone=(), payment=(), usb=()" },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" }
        ]
      }
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com"
      },
      { protocol: "https", hostname: "cdn.sanity.io" },
      { protocol: "https", hostname: "printgo.vn" },
      { protocol: "https", hostname: "banner2.cleanpng.com" },
      { protocol: "https", hostname: "multipanelmexico.com" },
      { protocol: "https", hostname: "file.hstatic.net" },
      { protocol: "https", hostname: "encrypted-tbn0.gstatic.com" }
    ]
  }
};

export default nextConfig;
