# Solana Payment-Gated Random Number Generator

A Next.js application that gates access to random number generation behind verified Solana blockchain payments.

## Features

- 🔐 **Solana Wallet Integration** - Connect Phantom, Solflare, and other popular wallets
- 💰 **Payment System** - Uses pump-fun SDK for secure transaction handling
- 🔒 **Payment Verification** - On-chain verification before granting access
- 🎲 **Random Number Generation** - Cryptographically secure numbers between 0-1000
- 🛡️ **Security** - All transactions verified on-chain before service
- 📱 **Responsive** - Mobile-optimized design with Tailwind CSS

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Blockchain**: Solana, @solana/web3.js, @solana/wallet-adapter
- **Payment**: @pump-fun/agent-payments-sdk
- **Deployment**: Netlify

## Quick Start

### Clone & Install

```bash
git clone https://github.com/0xzahra/solana-rng-app.git
cd solana-rng-app
npm install
```

### Environment Setup

Create a `.env.local` file:

```env
SOLANA_RPC_URL=https://rpc.mainnet-beta.solana.com
NEXT_PUBLIC_SOLANA_RPC_URL=https://rpc.mainnet-beta.solana.com
AGENT_TOKEN_MINT_ADDRESS=47gg3F...n### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Production Build

```bash
npm run build && npm start
```

## How It Works

1. **Connect Wallet**: User connects their Solana wallet (Phantom, Solflare, etc.)
2. **Make Payment**: User initiates 0.1 SOL payment to access RNG service
3. **Verify Transaction**: Server verifies payment on-chain before granting access
4. **Generate Number**: Cryptographically secure random number (0-1000) is generated
5. **Audit Trail**: Every generation tied to transaction hash for verification

## API Endpoints

### `POST /api/verify-payment`
Verifies Solana transactions and unlocks random number generation.

**Request:**
```json
{
  "invoiceId": "string",
  "amount": 0.1,
  "signature": "string"
}
```

**Response:**
```json
{
  "success": true,
  "verified": true,
  "amount": 0.1,
  "currency": "SOL",
  "timestamp": "2026-06-18T00:00:00Z"
}
```

## Architecture

### Components
- `PaymentGate` - Main payment flow and RNG generation
- Wallet adapters for Solana ecosystem
- Server-side payment verification

### Security
- Server-side transaction verification
- On-chain audit trails
- Cryptographically secure RNG
- No read-only access without payment

## Deployment

### Netlify
The app is configured for Netlify deployment with:
- Node.js 18 runtime
- API route redirects
- Environment variables pre-configured
- Build optimization for static assets

### Environment Variables
- `SOLANA_RPC_URL` - Solana RPC endpoint
- `NEXT_PUBLIC_SOLANA_RPC_URL` - Client-side RPC endpoint
- `AGENT_TOKEN_MINT_ADDRESS` - Your pump-fun agent mint

## Pricing

- **Per Generation**: 0.1 SOL
- **Network**: Solana mainnet
- **Range**: 0-1000 (inclusive)

## Use Cases

- **Gaming**: Provably fair random events
- **Lotteries**: Transparent number generation
- **NFT Mints**: Random trait assignment
- **DeFi**: Random selection mechanisms
- **Compliance**: Auditable randomization

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - open source for the Web3 community.

## Support

Built by **@0xarewah** - ArewaOS tokenized agent.

---

⚡ **Ready to deploy on Netlify with live Solana payments!** ⚡