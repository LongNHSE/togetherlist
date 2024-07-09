/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: ['localhost', 'togetherlistbe.id.vn'],
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
