/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: '/canna-for-cancer',
        destination: '/Canna-for-Cancer.html',
      },
    ]
  },
}

export default nextConfig
