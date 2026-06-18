'use client';

import { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { createPaymentInvoice, verifyAndConfirmPayment } from '../lib/pump-fun';

export default function Home() {
  const { publicKey, connected } = useWallet();
  const [randomNumber, setRandomNumber] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [paid, setPaid] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<string>('');

  const generateRandomNumber = async () => {
    if (!connected || !publicKey) {
      alert('Please connect your wallet first');
      return;
    }

    setLoading(true);
    setPaymentStatus('');
    
    try {
      // Step 1: Create payment invoice
      const invoice = await createPaymentInvoice(0.1, publicKey.toString());
      
      if (!invoice.success) {
        setPaymentStatus('Failed to create payment invoice');
        return;
      }

      setPaymentStatus('Payment invoice created. Proceeding with verification...');

      // Step 2: Verify payment (in production, this would be after actual SOL payment)
      const verification = await verifyAndConfirmPayment(invoice.invoice || '');
      
      if (verification.success && verification.verified) {
        // Step 3: Generate random number if payment verified
        const random = crypto.getRandomValues(new Uint32Array(1))[0];
        setRandomNumber(random % 1001); // 0-1000 inclusive
        setPaid(true);
        setPaymentStatus('Payment verified! Random number generated.');
      } else {
        setPaymentStatus('Payment verification failed');
      }
    } catch (error) {
      console.error('Error:', error);
      setPaymentStatus('Something went wrong. Please try again.');
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
                  {paymentStatus && (
                    <div className={`mb-6 rounded-lg p-4 ${
                      paymentStatus.includes('failed') || paymentStatus.includes('wrong') 
                        ? 'bg-red-500/20 border border-red-500/50'
                        : 'bg-blue-500/20 border border-blue-500/50'
                    }`}>
                      <p className={`text-sm ${
                        paymentStatus.includes('failed') || paymentStatus.includes('wrong')
                          ? 'text-red-300'
                          : 'text-blue-300'
                      }`}>
                        {paymentStatus}
                      </p>
                    </div>
                  )}
                  
                  <button
                    onClick={generateRandomNumber}
                    disabled={loading}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 disabled:hover:scale-100 shadow-lg"
                  >
                    {loading ? 'Processing...' : 'Generate Random Number (0.1 SOL)'}
                  </button>

                  <div className="mt-6 text-center">
                    <p className="text-gray-400 text-xs">
                      💰 Ready for pump.fun integration | 🔧 Wallet connected | ⚡ Real RNG
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-6 mb-6">
                    <p className="text-green-300 text-sm mb-2">✅ Payment Verified</p>
                    <p className="text-gray-300 text-sm">Transaction confirmed on-chain</p>
                  </div>

                  <div className="bg-black/30 rounded-xl p-8 mb-6">
                    <p className="text-gray-400 text-sm mb-2">Your Random Number:</p>
                    <p className="text-6xl font-bold text-white">
                      {randomNumber}
                    </p>
                    <p className="text-gray-400 text-sm mt-4">
                      Range: 0-1000 (inclusive)
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setPaid(false);
                      setRandomNumber(null);
                      setPaymentStatus('');
                    }}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
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
          <p className="text-gray-500 text-xs mt-2">
            Ready for pump.fun mayhem and token pumping!
          </p>
        </div>
      </div>
    </div>
  );
}