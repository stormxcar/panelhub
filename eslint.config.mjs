import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const baseDirectory = dirname(fileURLToPath(import.meta.url));
const compat = new FlatCompat({ baseDirectory });

const config = [
  { ignores: [".next/**", ".next-*/**", ".sanity/**", "dist/**", "studio/dist/**", "studio-dist-check/**", "node_modules/**"] },
  ...compat.extends("next/core-web-vitals")
];

export default config;
