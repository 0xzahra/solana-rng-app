/** @type {import('next').NextConfig} */
const nextConfig = {
  // Config options for Solana RNG app
  experimental: {
        serverComponentsExternalPackages: ['@pump-fun/agent-payments-sdk']
    }
};

module.exports = nextConfig;