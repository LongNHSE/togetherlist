/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: [process.env.NEXT_PUBLIC_IMAGE_DOMAINS],
  },
  async redirects() {
    return [
      {
        destination: '/home',
        source: '/',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
