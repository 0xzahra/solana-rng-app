import SolanaProvider from './SolanaProvider';
import './globals.css';

export const metadata = {
  title: 'Solana RNG Generator',
  description: 'Generate provably fair random numbers with SOL payments',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SolanaProvider>
          {children}
        </SolanaProvider>
      </body>
    </html>
  );
}