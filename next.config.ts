/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
      },
      {
        protocol: 'https',
        hostname: '*.supabase.co',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/en',
        destination: '/',
      },
      {
        source: '/en/:path*',
        destination: '/:path*',
      },
      {
        source: '/es',
        destination: '/',
      },
      {
        source: '/es/:path*',
        destination: '/:path*',
      },
    ];
  },
};

export default nextConfig;
