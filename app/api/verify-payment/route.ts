import { NextResponse } from 'next/server';

// Mock payment verification for Next.js build
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { invoiceId, amount, signature } = body;

    console.log('Verifying payment:', { invoiceId, amount, signature });

    // Mock verification for Next.js build
    // In production, this would verify on-chain using Solana RPC
    
    // Simulate verification time
    await new Promise(resolve => setTimeout(resolve, 1000));

    // For demo purposes, return success
    const verificationResult = {
      success: true,
      invoiceId,
      amount,
      signature,
      verified: true,
      blockHeight: Date.now(),
      timestamp: new Date().toISOString(),
      network: 'solana-mainnet-beta'
    };

    return NextResponse.json(verificationResult);
  } catch (error) {
    console.error('Payment verification failed:', error);
    return NextResponse.json(
      { success: false, error: 'Payment verification failed' },
      { status: 400 }
    );
  }
}