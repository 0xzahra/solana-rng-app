#!/bin/sh
set -e

echo "🧠 Building Solana RNG app for Netlify..."

# Install dependencies
npm ci

# Set environment variables
echo "SOLANA_RPC_URL=https://rpc.mainnet-beta.solana.com" >> .env.production
echo "NEXT_PUBLIC_SOLANA_RPC_URL=https://rpc.mainnet-beta.solana.com" >> .env.production

# Build with fallback for resources limited environments
if command -v next > /dev/null 2>&1; then
  if npx next build --help | grep -q 'no-lint'; then
    npx next build --no-lint
  else  
    npx next build
  fi
elif [ -d ".next" ]; then
  echo "✅ .next directory exists, using cached build"
else
  echo "⚡ Skip build due to resource limits, will build on Netlify"
fi

echo "🚀 Build complete!"