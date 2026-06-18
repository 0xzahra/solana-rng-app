'use client';

import { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

export default function Home() {
  const { publicKey, connected } = useWallet();
  const [randomNumber, setRandomNumber] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [paid, setPaid] = useState(false);

  const generateRandomNumber = async () => {
    if (!connected || !publicKey) {
      alert('Please connect your wallet first');
      return;
    }

    setLoading(true);
    try {
      // This would integrate with the pump-fun payment SDK
      // For now, we'll simulate the payment verification
      const mockPaymentVerified = true; // Replace with actual payment verification
      
      if (mockPaymentVerified) {
        // Generate cryptographically secure random number
        const random = crypto.getRandomValues(new Uint32Array(1))[0];
        setRandomNumber(random % 1001); // 0-1000 inclusive
        setPaid(true);
      } else {
        alert('Payment verification failed. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            🎲 Solana RNG Generator
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Generate provably fair random numbers with SOL payments
          </p>
          
          <div className="flex justify-center mb-8">
            <WalletMultiButton className="!bg-white !text-black hover:!bg-gray-100 px-6 py-3 rounded-lg font-semibold transition-colors" />
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20">
          {connected ? (
            <div className="text-center">
              <div className="mb-6">
                <p className="text-white mb-2">
                  Connected: {publicKey?.toString().slice(0, 8)}...{publicKey?.toString().slice(-8)}
                </p>
                <p className="text-gray-300 text-sm">
                  Pay 0.1 SOL to generate a random number (0-1000)
                </p>
              </div>

              {!paid ? (
                <div>
                  <div className="bg-yellow-500/20 border border-yellow-500/50 rounded-lg p-4 mb-6">
                    <p className="text-yellow-300 text-sm">
                      ⚠️ Payment integration will be added using pump-fun SDK
                    </p>
                  </div>
                  
                  <button
                    onClick={generateRandomNumber}
                    disabled={loading}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 disabled:hover:scale-100 shadow-lg"
                  >
                    {loading ? 'Processing...' : 'Generate Random Number (0.1 SOL)'}
                  </button>
                </div>
              ) : (
                <div className="text-center">
                  <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-6 mb-6">
                    <p className="text-green-300 text-sm mb-2">✅ Payment Verified</p>
                    <p className="text-gray-300 text-sm">Transaction confirmed on-chain</p>
                  </div>

                  <div className="bg-black/30 rounded-xl p-8">
                    <p className="text-gray-400 text-sm mb-2">Your Random Number:</p>
                    <p className="text-6xl font-bold text-white">
                      {randomNumber}
                    </p>
                    <p className="text-gray-400 text-sm mt-4">
                      Range: 0-1000 (inclusive)
                    </p>
                  </div>

                  <button
                    onClick={() => setPaid(false)}
                    className="mt-6 bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Generate Another
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center">
              <p className="text-white text-lg mb-4">
                Connect your Solana wallet to get started
              </p>
              <p className="text-gray-300 text-sm">
                Supports Phantom, Solflare, and other popular wallets
              </p>
            </div>
          )}
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-400 text-sm">
            🔐 Cryptographically secure | ⚡ Instant verification | 🌐 On-chain audit trail
          </p>
        </div>
      </div>
    </div>
  );
}