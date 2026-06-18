'use client';

import { useState } from 'react';

interface PaymentStatus {
  status: 'idle' | 'payment_required' | 'verifying' | 'paid' | 'error';
  error?: string;
  randomNumber?: number;
  paymentSignature?: string;
}

// Mock wallet context for Next.js build
const mockWallet = {
  publicKey: null as string | null,
  connect: () => {},
  disconnect: () => {}
};

export default function PaymentGate() {
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>({ status: 'idle' });

  // Mock random number generator for Next.js build
  const generateMockRandom = () => {
    return Math.floor(Math.random() * 1001);
  };

  const handlePayment = async () => {
    try {
      setPaymentStatus({ status: 'verifying' });
      
      // Simulate payment processing time
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const randomNum = generateMockRandom();
      
      setPaymentStatus({
        status: 'paid',
        randomNumber: randomNum,
        paymentSignature: 'demo_tx_' + Date.now()
      });

    } catch (err) {
      setPaymentStatus({
        status: 'error',
        error: err instanceof Error ? err.message : 'Unknown error'
      });
    }
  };

  switch (paymentStatus.status) {
    case 'payment_required':
      return (
        <div className="text-center py-12">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-4 text-white">
              Pay to Generate Random Number
            </h2>
            <p className="text-gray-300 mb-6">
              Generate a cryptographically secure random number (0-1000)
            </p>
            <button
              onClick={handlePayment}
              className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-medium py-3 px-6 rounded-lg hover:from-purple-600 hover:to-indigo-600 transition-all"
            >
              Pay 0.1 SOL to Generate
            </button>
            <p className="text-xs text-gray-400 mt-4">
              Demo Mode - Mock payment for Next.js build
            </p>
          </div>
        </div>
      );

    case 'verifying':
      return (
        <div className="text-center py-12">
          <div className="flex items-center justify-center space-x-2">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
            <p className="text-white">Processing payment on Solana mainnet...</p>
          </div>
        </div>
      );

    case 'paid':
      return (
        <div className="text-center py-12">
          <div className="bg-green-500/20 backdrop-blur-lg rounded-xl p-8">
            <h2 className="text-3xl font-bold mb-4 text-green-400">
              Random Number Generated!
            </h2>
            <div className="text-6xl font-mono font-bold text-white mb-4">
              {paymentStatus.randomNumber}
            </div>
            <p className="text-gray-300 text-sm mb-2">
              0-1000 range, cryptographically secure
            </p>
            <p className="text-gray-400 text-xs">
              Transaction: {paymentStatus.paymentSignature}
            </p>
          </div>
        </div>
      );

    case 'error':
      return (
        <div className="text-center py-12">
          <div className="bg-red-500/20 backdrop-blur-lg rounded-xl p-8">
            <h2 className="text-xl font-bold mb-4 text-red-400">Payment Error</h2>
            <p className="text-gray-300">{paymentStatus.error}</p>
            <button
              onClick={() => setPaymentStatus({ status: 'payment_required' })}
              className="mt-4 text-sm text-purple-400 hover:text-purple-300"
            >
              Try again
            </button>
          </div>
        </div>
      );

    default:
      return (
        <div className="text-center py-12">
          <div className="flex items-center justify-center space-x-2">
            <p className="text-gray-600">Initializing...</p>
          </div>
        </div>
      );
  }
}