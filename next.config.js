/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'uploadthing.com',
      },
      {
        protocol: 'https',
        hostname: 'utfs.io',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'https',
        hostname: 'instagram.fpnq13-1.fna.fbcdn.net',
      },
      {
        protocol: 'https',
        hostname: 'cdn.tailgrids.com',
      },
    ],
  },
}

module.exports = nextConfig
