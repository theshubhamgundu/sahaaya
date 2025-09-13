import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  // @ts-ignore - experimental in this Next version
  allowedDevOrigins: ['https://*.fly.dev'],
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
