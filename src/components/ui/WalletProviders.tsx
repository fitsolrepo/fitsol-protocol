// src/components/ui/WalletProviders.tsx
'use client'
import { useMemo } from 'react'
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import { WalletAdapterNetwork }                from '@solana/wallet-adapter-base'
import { WalletModalProvider }                  from '@solana/wallet-adapter-react-ui'
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from '@solana/wallet-adapter-wallets'
import { clusterApiUrl } from '@solana/web3.js'
import '@solana/wallet-adapter-react-ui/styles.css'
import { SOLANA_CONFIG } from '@/lib/constants'

export function WalletProviders({ children }: { children: React.ReactNode }) {
  const network  = WalletAdapterNetwork.Mainnet
  const endpoint = SOLANA_CONFIG.RPC || clusterApiUrl(network)
  const wallets  = useMemo(() => [
    new PhantomWalletAdapter(),
    new SolflareWalletAdapter(),
  ], [])

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}
