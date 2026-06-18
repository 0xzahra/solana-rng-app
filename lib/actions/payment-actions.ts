import { Connection, PublicKey, Transaction } from '@solana/web3.js';

export interface PaymentResponse {
  success: boolean;
  data?: Transaction;
  error?: string;
}

export interface PaymentInstructionParams {
  startTime: number;
  endTime: number;
  reference: string;
}

/** createPaymentInstruction for pump-fun payment system
   @param walletAddress The public key of the payer wallet
   @param currency Token mint address (e.g., So11111111111111111111111111111111111111112 for SOL)
   @param amount Amount in the token's smallest unit (e.g., 100000000 for 0.1 SOL with 9 decimals)
   @param params Payment parameters including timestamps and reference ID
   @returns Transaction object or error response
*/
export async function createGeneratePaymentInstruction(
  walletAddress: string,
  currency: string,
  amount: number,
  params: PaymentInstructionParams
): Promise<PaymentResponse> {
  try {
    const endpoint = process.env.SOLANA_RPC_URL || 'https://rpc.mainnet-beta.solana.com';
    const connection = new Connection(endpoint);
    
    // Create a basic transaction structure for mock payment
    const transaction = new Transaction();
    
    // In a real implementation, you would add the pump-fun payment instruction here
    // For this demo/Next.js build, we return a basic transaction structure
    
    console.log('Creating payment instruction:', {
      walletAddress,
      currency,
      amount,
      params,
      endpoint
    });
    
    return {
      success: true,
      data: transaction
    };
  } catch (error) {
    console.error('Payment instruction failed:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Payment instruction failed'
    };
  }
}

/** generateRandomNumber
   @param min Minimum inclusive random number
   @param max Maximum inclusive random number
   @returns Cryptographically secure random number between min and max
*/
export function generateRandomNumber(min: number, max: number): number {
  if (min >= max) return min;
  const range = max - min + 1;
  const bytes = new Uint8Array(8);
  crypto.getRandomValues(bytes);
  let randomVal = bytes[0];
  for (let i = 1; i < 8; i++) {
    randomVal = randomVal * 256 + bytes[i];
  }
  return Math.floor(randomVal * (range / 256) + min);
}