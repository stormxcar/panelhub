import { dirname } from "path";
import { fileURLToPath } from "url";

const projectRoot = dirname(fileURLToPath(import.meta.url));

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
            value: "default-src 'self'; base-uri 'self'; form-action 'self' mailto:; frame-ancestors 'none'; object-src 'none'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https://res.cloudinary.com https://cdn.sanity.io https://printgo.vn https://banner2.cleanpng.com https://multipanelmexico.com https://file.hstatic.net https://encrypted-tbn0.gstatic.com; media-src 'self' blob: https://res.cloudinary.com; connect-src 'self' https://syr5q4gg.api.sanity.io https://syr5q4gg.apicdn.sanity.io; font-src 'self' data:; upgrade-insecure-requests"
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
