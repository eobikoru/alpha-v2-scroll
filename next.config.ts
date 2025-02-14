/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [ 'antd', '@ant-design', 'rc-util', 'rc-pagination', 'rc-picker', 'rc-notification', 'rc-tooltip' ],
  webpack: (config: { externals: string[]; }) => {
    config.externals.push('pino-pretty', 'lokijs', 'encoding')
    return config
  },
  images: {
    domains: ["hebbkx1anhila5yf.public.blob.vercel-storage.com" ,'olive-immediate-ptarmigan-973.mypinata.cloud'], 
  },
};

module.exports = nextConfig;
