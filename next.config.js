/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'qgcfwfccxzfbuurkaawl.supabase.co',
        pathname: '/storage/v1/object/public/cat-images/**',
      },
    ],
  },
}

module.exports = nextConfig
