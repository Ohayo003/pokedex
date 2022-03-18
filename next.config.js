/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["marriland.com"],
  },
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/login",
      },
    ];
  },
};

module.exports = nextConfig;
