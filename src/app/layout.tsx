// src/app/layout.tsx
import type { Metadata } from 'next'
import '@/styles/globals.css'
import { WalletProviders } from '@/components/ui/WalletProviders'
import { Toaster } from 'react-hot-toast'
import { ENTITY } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'FitSOL Protocol',
  description: 'The first on-chain fitness competition protocol on Solana. Stake FIT, enter GPS-verified challenges, win SOL from participant-funded prize pools.',
  keywords: ['FitSOL', 'Solana', 'fitness', 'crypto', 'compete-to-earn', 'DeFi'],
  openGraph: {
    title: 'FitSOL Protocol',
    description: 'Compete. Verify. Earn SOL.',
    siteName: 'FitSOL',
    locale: 'en_US',
    type: 'website',
  },
  twitter: { card: 'summary_large_image', title: 'FitSOL Protocol', description: 'Compete. Verify. Earn SOL.' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <WalletProviders>
          {children}
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: { background: '#0d110d', color: '#f0f5f0', border: '1px solid #1e2b1e', fontFamily: "'DM Sans',sans-serif", fontSize: '14px' },
              success: { iconTheme: { primary: '#00e567', secondary: '#080a08' } },
              error:   { iconTheme: { primary: '#ff4444', secondary: '#080a08' } },
            }}
          />
        </WalletProviders>
      </body>
    </html>
  )
}
