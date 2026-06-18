import { NextResponse } from 'next/server';

// Test endpoint to verify the server is running
export async function GET() {
  return NextResponse.json({
    message: 'Test server connection - Solana RNG Payment Verification',
    envCheck: {
      agentMint: process.env.AGENT_TOKEN_MINT_ADDRESS?.substring(0, 10) + '...',
      rpcUrl: process.env.SOLANA_RPC_URL?.substring(0, 40) + '...',
      nextPublicRpc: process.env.NEXT_PUBLIC_SOLANA_RPC_URL?.substring(0, 40) + '...',
    }
  });
}

/**
    * Verify payment on Solana blockchain
    * In production, this would use pump-fun agent to verify transactions
    * This is a mock implementation for Next.js build testing
    */
export async function POST(request: Request) {
  try {
    const { invoiceId, amount, signature } = await request.json();
    
    if (!invoiceId) {
      return NextResponse.json({ error: 'Invoice ID is required' }, { status: 400 });
    }

    console.log('Verifying payment on Solana:', { invoiceId, amount, signature });

    // Mock verification for Next.js build
    // In production, create PumpAgent and validateInvoicePayment
    const paymentStatus = {
      success: true,
      invoiceId,
      amount: amount || 0.1,
      currency: 'SOL',
      verified: true,
      network: 'solana-mainnet-beta',
      timestamp: new Date().toISOString()
    };

    if (!paymentStatus.success) {
      return NextResponse.json({
        error: 'Payment verification failed',
        details: paymentStatus,
      }, { status: 400 });
    }

    // Payment was successful! Enable number generation
    return NextResponse.json({
      success: true,
      invoiceId,
      verified: paymentStatus.verified,
      amount: paymentStatus.amount,
      currency: paymentStatus.currency,
      network: paymentStatus.network,
      unlockTime: paymentStatus.timestamp,
    });

  } catch (error) {
    console.error('Payment verification error:', error);
    return NextResponse.json({
      error: 'Internal server error during verification',
      details: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}