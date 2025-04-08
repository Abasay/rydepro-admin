/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  // swcMinify: true,
  images: {
    domains: ['localhost', 'objects.liquidweb.services'],
    unoptimized: true,
  },
  // output: 'export',
  basePath: process.env.BASE_PATH ? process.env.BASE_PATH : '',
  assetPrefix: process.env.URL ? process.env.URL : undefined,
};

export default nextConfig;
