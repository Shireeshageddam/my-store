/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https',
        hostname: 'hclg7yggf1.ufs.sh',
      },
      {
        protocol: 'https',
        hostname: 'utfs.io', // ✅ Good domain
        
      }
    ]
  }
};

export default nextConfig;
