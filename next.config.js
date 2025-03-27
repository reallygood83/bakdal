/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'export',
  basePath: '/bakdal',
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig 