// src/hooks/useRaiseStore.ts
import { create } from 'zustand'
import { RAISE_CONFIG, TIERS, getTierByWalletCount } from '@/lib/constants'

export interface RaiseStats {
  totalSolRaised:   number
  totalContributors: number
  tier1WalletsUsed: number
  tier2WalletsUsed: number
  isActive:         boolean
}

interface RaiseStore {
  stats:     RaiseStats
  loading:   boolean
  lastFetch: number
  fetch:     () => Promise<void>
}

const DEFAULT: RaiseStats = {
  totalSolRaised:    0,
  totalContributors: 0,
  tier1WalletsUsed:  0,
  tier2WalletsUsed:  0,
  isActive:          true,
}

export const useRaiseStore = create<RaiseStore>((set, get) => ({
  stats:     DEFAULT,
  loading:   false,
  lastFetch: 0,

  fetch: async () => {
    const { loading, lastFetch } = get()
    if (loading || Date.now() - lastFetch < 15_000) return
    set({ loading: true })
    try {
      const res  = await fetch('/api/seed/stats')
      const data = await res.json()
      set({ stats: data, lastFetch: Date.now() })
    } catch {
      // keep existing stats on error
    } finally {
      set({ loading: false })
    }
  },
}))

// ── Derived helpers ────────────────────────────────────────────────────────
export function useCurrentTier(stats: RaiseStats) {
  return getTierByWalletCount(stats.totalContributors)
}

export function useTierProgress(stats: RaiseStats) {
  const t1Used = stats.tier1WalletsUsed
  const t2Used = stats.tier2WalletsUsed
  const t1Remaining = Math.max(0, 50  - t1Used)
  const t2Remaining = Math.max(0, 100 - t2Used)

  return {
    tier1: { used: t1Used, remaining: t1Remaining, pct: (t1Used / 50) * 100 },
    tier2: { used: t2Used, remaining: t2Remaining, pct: (t2Used / 100) * 100 },
    currentTier: getTierByWalletCount(stats.totalContributors),
    raisePct: Math.min(100, (stats.totalSolRaised / RAISE_CONFIG.CAP_SOL) * 100),
    spotsLeft: t1Remaining > 0
      ? { tier: 1, count: t1Remaining }
      : t2Remaining > 0
        ? { tier: 2, count: t2Remaining }
        : null,
  }
}

export function calcFitAllocation(solAmount: number, tier: typeof TIERS[0]) {
  const base  = Math.floor(solAmount * 26000)
  const bonus = Math.floor(base * (tier.bonusPct / 100))
  const total = base + bonus
  return { base, bonus, total, effectiveRate: tier.effectiveRate }
}
