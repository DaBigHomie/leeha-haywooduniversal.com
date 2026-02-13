/** @type {import('next').NextConfig} */
const nextConfig = {
  // Fix workspace root detection issue (multiple lockfiles in parent directories)
  outputFileTracingRoot: __dirname,

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
}

module.exports = nextConfig
