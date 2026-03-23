// src/lib/solana.ts
import {
  Connection,
  PublicKey,
  Transaction,
  SystemProgram,
  LAMPORTS_PER_SOL,
} from '@solana/web3.js'
import { SOLANA_CONFIG, RAISE_CONFIG } from './constants'

export const connection = new Connection(SOLANA_CONFIG.RPC, 'confirmed')

export const lamportsToSol  = (l: number) => l / LAMPORTS_PER_SOL
export const solToLamports  = (s: number) => Math.round(s * LAMPORTS_PER_SOL)
export const fitForSol      = (s: number) => s * RAISE_CONFIG.FIT_PER_SOL
export const usdForSol      = (s: number) => s * RAISE_CONFIG.SOL_PRICE_USD

export const shortenAddress = (addr: string, chars = 4) =>
  `${addr.slice(0, chars)}...${addr.slice(-chars)}`

/** Build a SOL transfer to treasury */
export async function buildContributionTx(
  fromWallet: PublicKey,
  solAmount: number
): Promise<Transaction> {
  const toWallet  = new PublicKey(SOLANA_CONFIG.TREASURY_WALLET)
  const lamports  = solToLamports(solAmount)

  const tx = new Transaction().add(
    SystemProgram.transfer({ fromPubkey: fromWallet, toPubkey: toWallet, lamports })
  )

  const { blockhash, lastValidBlockHeight } =
    await connection.getLatestBlockhash('confirmed')
  tx.recentBlockhash      = blockhash
  tx.lastValidBlockHeight = lastValidBlockHeight
  tx.feePayer             = fromWallet
  return tx
}

/** Confirm a tx signature on-chain — returns true if success */
export async function confirmTransaction(sig: string): Promise<boolean> {
  try {
    const result = await connection.confirmTransaction(sig, 'confirmed')
    return !result.value.err
  } catch {
    return false
  }
}

export async function getWalletBalance(address: string): Promise<number> {
  try {
    const lamports = await connection.getBalance(new PublicKey(address))
    return lamportsToSol(lamports)
  } catch {
    return 0
  }
}
