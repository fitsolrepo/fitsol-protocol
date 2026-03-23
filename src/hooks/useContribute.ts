// src/hooks/useContribute.ts
'use client'
import { useState, useCallback } from 'react'
import { useWallet, useConnection } from '@solana/wallet-adapter-react'
import { PublicKey, SystemProgram, Transaction, LAMPORTS_PER_SOL } from '@solana/web3.js'
import { TREASURY_WALLET, RAISE_CONFIG } from '@/lib/constants'
import { useRaiseStore, calcFitAllocation } from './useRaiseStore'
import type { TIERS } from '@/lib/constants'

export type ContributeStatus =
  | 'idle' | 'checking_tier' | 'building_tx'
  | 'awaiting_approval' | 'confirming' | 'success' | 'error'

export interface ContributeResult {
  status:        ContributeStatus
  error:         string | null
  txSig:         string | null
  fitBase:       number
  fitBonus:      number
  fitTotal:      number
  tier:          number
  walletNumber:  number | null
  contribute:    (solAmount: number) => Promise<void>
  reset:         () => void
}

export function useContribute(): ContributeResult {
  const { publicKey, sendTransaction } = useWallet()
  const { connection } = useConnection()
  const { fetch: refreshStats } = useRaiseStore()

  const [status,       setStatus]      = useState<ContributeStatus>('idle')
  const [error,        setError]       = useState<string | null>(null)
  const [txSig,        setTxSig]       = useState<string | null>(null)
  const [fitBase,      setFitBase]     = useState(0)
  const [fitBonus,     setFitBonus]    = useState(0)
  const [fitTotal,     setFitTotal]    = useState(0)
  const [tier,         setTier]        = useState(3)
  const [walletNumber, setWalletNum]   = useState<number | null>(null)

  const reset = useCallback(() => {
    setStatus('idle'); setError(null); setTxSig(null)
    setFitBase(0); setFitBonus(0); setFitTotal(0)
    setTier(3); setWalletNum(null)
  }, [])

  const contribute = useCallback(async (solAmount: number) => {
    if (!publicKey) { setError('Wallet not connected'); return }
    if (solAmount < RAISE_CONFIG.MIN_SOL) { setError(`Minimum is ${RAISE_CONFIG.MIN_SOL} SOL`); return }
    if (solAmount > RAISE_CONFIG.MAX_PER_WALLET_SOL) { setError(`Maximum is ${RAISE_CONFIG.MAX_PER_WALLET_SOL} SOL`); return }

    try {
      // Step 1 — check current tier from API
      setStatus('checking_tier')
      const tierRes  = await fetch('/api/seed/tier')
      const tierData = await tierRes.json()
      if (!tierRes.ok) throw new Error(tierData.error || 'Failed to check tier')

      const currentTier = tierData.tier as typeof TIERS[0]
      const alloc       = calcFitAllocation(solAmount, currentTier)
      setTier(currentTier.tier)
      setWalletNum(tierData.walletNumber)
      setFitBase(alloc.base)
      setFitBonus(alloc.bonus)
      setFitTotal(alloc.total)

      // Check minimum for this tier
      //if (solAmount < currentTier.minSol) {
        //throw new Error(`Minimum for ${currentTier.name} tier is ${currentTier.minSol} SOL`)
      //}

      // Step 2 — build Solana transaction
      setStatus('building_tx')
      const treasury   = new PublicKey(TREASURY_WALLET)
      const lamports   = Math.floor(solAmount * LAMPORTS_PER_SOL)
      const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash()
      const tx = new Transaction()
      tx.add(SystemProgram.transfer({ fromPubkey: publicKey, toPubkey: treasury, lamports }))
      tx.recentBlockhash = blockhash
      tx.feePayer        = publicKey

      // Step 3 — wallet approval
      setStatus('awaiting_approval')
      const signature = await sendTransaction(tx, connection)
      setTxSig(signature)

      // Step 4 — confirm on-chain
      setStatus('confirming')
      await connection.confirmTransaction({ signature, blockhash, lastValidBlockHeight }, 'confirmed')

      // Step 5 — record in Supabase
      const confirmRes = await fetch('/api/seed/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          wallet:       publicKey.toBase58(),
          solAmount,
          txSignature:  signature,
          tier:         currentTier.tier,
          walletNumber: tierData.walletNumber,
          fitBase:      alloc.base,
          fitBonus:     alloc.bonus,
          fitTotal:     alloc.total,
        }),
      })
      if (!confirmRes.ok) {
        const e = await confirmRes.json()
        throw new Error(e.error || 'Failed to record contribution')
      }

      setStatus('success')
      await refreshStats()

    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Unknown error'
      // User rejected wallet prompt
      if (msg.toLowerCase().includes('user rejected') || msg.toLowerCase().includes('cancelled')) {
        setStatus('idle')
        setError(null)
      } else {
        setStatus('error')
        setError(msg)
      }
    }
  }, [publicKey, sendTransaction, connection, refreshStats])

  return { status, error, txSig, fitBase, fitBonus, fitTotal, tier, walletNumber, contribute, reset }
}
