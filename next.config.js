/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  reactStrictMode: false,
  output: "standalone",
  assetPrefix: isProd ? "https://obby-project.com" : "http://localhost:3000",
};

module.exports = nextConfig;
