import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async rewrites() {
    return [
      {
        source: '/videos/:path*',
        destination: `${process.env.VIDEO_DIRECTORY}/:path*`,
      },
    ];
  },
  environment: {
    VIDEO_DIRECTORY: process.env.VIDEO_DIRECTORY,
  },
};

export default nextConfig;
