import type { NextConfig } from "next";

/** Statik export: barındırma kararı verilmedi, her yere konulabilsin diye.
 *  trailingSlash eski WordPress URL biçimiyle de uyuşur. */
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  reactStrictMode: true,
};

export default nextConfig;
