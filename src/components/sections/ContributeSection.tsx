// src/components/sections/ContributeSection.tsx
'use client'
import { useEffect, useState, useMemo } from 'react'
import { useWalletModal } from '@solana/wallet-adapter-react-ui'
import { useWallet } from '@solana/wallet-adapter-react'
import { cn } from '@/lib/utils'
import { TIERS, RAISE_CONFIG, TREASURY_WALLET } from '@/lib/constants'
import { useRaiseStore, useTierProgress, calcFitAllocation } from '@/hooks/useRaiseStore'
import { useContribute } from '@/hooks/useContribute'
import { connection } from '@/lib/solana'
import { ReferralCard } from '@/components/ReferralCard'

// Preset amounts for quick selection
const PRESET_AMOUNTS = [1, 2, 3, 4, 5, 10, 20, 30, 40, 50]

function TierBadge({ tier, size = 'sm' }: { tier: typeof TIERS[0]; size?: 'sm' | 'lg' }) {
  const pad = size === 'lg' ? 'px-4 py-2' : 'px-2.5 py-1'
  const txt = size === 'lg' ? 'text-sm' : 'text-xs'
  return (
    <span
      className={cn('inline-flex items-center gap-1.5 rounded font-mono font-medium border', pad, txt)}
      style={{ color: tier.color, background: tier.colorDim, borderColor: tier.colorBorder }}
    >
      {tier.badge} · +{tier.bonusPct}% bonus
    </span>
  )
}

function TierProgress({ stats }: { stats: ReturnType<typeof useTierProgress> }) {
  return (
    <div className="space-y-3">
      {TIERS.slice(0, 2).map((t, i) => {
        const progress = i === 0 ? stats.tier1 : stats.tier2
        const isClosed = progress.remaining === 0
        const isCurrent = !isClosed && (
          i === 0 ? stats.currentTier.tier === 1 :
          stats.tier1.remaining === 0 && stats.currentTier.tier === 2
        )
        return (
          <div key={t.tier}>
            <div className="flex justify-between items-center mb-1.5">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-medium" style={{ color: t.color }}>
                  {t.name} Tier
                </span>
                {isCurrent && (
                  <span
                    className="text-xs font-mono px-1.5 py-0.5 rounded"
                    style={{ background: t.colorDim, color: t.color, border: `1px solid ${t.colorBorder}` }}
                  >
                    ACTIVE
                  </span>
                )}
                {isClosed && (
                  <span className="text-xs font-mono text-muted px-1.5 py-0.5 rounded bg-card border border-border">
                    CLOSED
                  </span>
                )}
              </div>
              <span className="font-mono text-xs text-muted">
                {isClosed
                  ? `${t.walletMax}/${t.walletMax} filled`
                  : `${progress.remaining} spots left`}
              </span>
            </div>
            <div className="h-2 bg-card2 border border-border rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${progress.pct}%`,
                  background: isClosed ? '#444' : t.color,
                  boxShadow: isClosed ? 'none' : `0 0 8px ${t.color}55`,
                }}
              />
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-xs text-muted font-mono">
                {i === 0 ? 'First 50 wallets' : 'Wallets 51-150'} · min {t.minSol} SOL · +{t.bonusPct}% bonus
              </span>
              <span className="text-xs font-mono" style={{ color: t.color }}>
                {t.effectiveRate.toLocaleString()} FIT/SOL
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}

type SuccessPanelProps = {
  fitBase: number
  fitBonus: number
  fitTotal: number
  tier: number
  walletNumber: number | null
  txSig: string | null
  onReset: () => void
}

function SuccessPanel(props: SuccessPanelProps) {
  const { fitBase, fitBonus, fitTotal, tier, walletNumber, txSig, onReset } = props
  const tierDef = TIERS[tier - 1]
  return (
    <div className="text-center py-6">
      <div className="text-4xl mb-3">🎉</div>
      {walletNumber && walletNumber <= 50 && fitBonus > 0 && (
  <div className="mb-3">
    <TierBadge tier={TIERS[0]} size="lg" />
  </div>
)}
<h3 className="font-syne font-black text-2xl text-green mb-1">
  Contribution confirmed
</h3>
{walletNumber && (
  <p className="text-muted text-sm mb-4">
    You are contributor #{walletNumber}
    {tier === 1 && fitBonus > 0 && ' — a Genesis wallet'}
    {tier === 1 && fitBonus === 0 && ' — Genesis wallet (base rate applied)'}
    {tier === 2 && fitBonus > 0 && ' — an Early wallet'}
    {tier === 2 && fitBonus === 0 && ' — Early wallet (base rate applied)'}
  </p>
)}
      <div className="bg-card2 border border-green-mid rounded-xl p-5 mb-4 text-left">
        <div className="mono-label text-green mb-3">Your FIT allocation</div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted">Base allocation</span>
            <span className="font-mono text-white">{fitBase.toLocaleString()} FIT</span>
          </div>
          {fitBonus > 0 && (
            <div className="flex justify-between text-sm">
              <span style={{ color: tierDef?.color }}>
                {tierDef?.name} bonus (+{tierDef?.bonusPct}%)
              </span>
              <span className="font-mono font-bold" style={{ color: tierDef?.color }}>
                +{fitBonus.toLocaleString()} FIT
              </span>
            </div>
          )}
          <div className="flex justify-between text-sm border-t border-border pt-2 mt-2">
            <span className="font-syne font-bold text-white">Total FIT</span>
            <span className="font-mono font-black text-green text-lg">
              {fitTotal.toLocaleString()} FIT
            </span>
          </div>
        </div>
        <p className="text-xs text-muted mt-3 font-mono">
          25% accessible at TGE · 75% linear over 12 months
        </p>
      </div>
      {txSig && (
        <a
          href={`https://solscan.io/tx/${txSig}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-mono text-green underline block mb-4"
        >
          View transaction on Solscan
        </a>
      )}
      <button onClick={onReset} className="btn-outline text-xs px-5 py-2.5">
        Make another contribution
      </button>
    </div>
  )
}

export function ContributeSection() {
  const { stats, fetch: fetchStats } = useRaiseStore()
  const tierProgress = useTierProgress(stats)
  const currentTier = tierProgress.currentTier
  const { publicKey, connected } = useWallet()
  const { setVisible } = useWalletModal()
  const contribute = useContribute()

  const [solInput,       setSolInput]       = useState(RAISE_CONFIG.MIN_SOL)
  const [agreed,         setAgreed]         = useState(false)
  const [previewTier,    setPreviewTier]    = useState(currentTier)
  const [balance,        setBalance]        = useState<number | null>(null)
  const [referredByCode, setReferredByCode] = useState('')
  const [showReferral,   setShowReferral]   = useState(false)

  useEffect(() => { fetchStats() }, [fetchStats])
  useEffect(() => {
    const id = setInterval(fetchStats, 30_000)
    return () => clearInterval(id)
  }, [fetchStats])

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const ref = params.get('ref')
    if (ref) setReferredByCode(ref.toUpperCase())
  }, [])

  useEffect(() => { setPreviewTier(currentTier) }, [currentTier])

  useEffect(() => {
    if (!connected || !publicKey) { setBalance(null); return }
    const walletKey = publicKey
    let cancelled = false
    async function loadBalance() {
      try {
        const lamports = await connection.getBalance(walletKey)
        const sol = Number(lamports) / 1_000_000_000
        if (!cancelled) setBalance(Number.isFinite(sol) ? sol : 0)
      } catch {
        if (!cancelled) setBalance(null)
      }
    }
    loadBalance()
    const interval = setInterval(loadBalance, 15000)
    return () => { cancelled = true; clearInterval(interval) }
  }, [connected, publicKey])

  // Calculate allocation — if below tier minimum, use base rate (no bonus)
  const belowTierMin = solInput < currentTier.minSol && currentTier.bonusPct > 0
  const effectiveTier = belowTierMin ? TIERS[2] : currentTier // fallback to standard rate

  const alloc = useMemo(
    () => calcFitAllocation(solInput, effectiveTier),
    [solInput, effectiveTier]
  )

  // Validation
  const exceedsMax    = solInput > RAISE_CONFIG.MAX_PER_WALLET_SOL
  const belowAbsMin   = solInput < RAISE_CONFIG.MIN_SOL
  const canContribute = agreed && !exceedsMax && !belowAbsMin
  const isProcessing  = ['checking_tier', 'building_tx', 'awaiting_approval', 'confirming']
    .includes(contribute.status)

  function handleSolInput(val: number) {
    if (val > RAISE_CONFIG.MAX_PER_WALLET_SOL) {
      setSolInput(RAISE_CONFIG.MAX_PER_WALLET_SOL)
      return
    }
    setSolInput(val)
  }

  function handleContribute() {
    if (!publicKey) { setVisible(true); return }
    if (!canContribute || isProcessing) return
    if (solInput > RAISE_CONFIG.MAX_PER_WALLET_SOL) return
    const depositAmount = solInput
    const walletStr = publicKey.toString()
    contribute.contribute(depositAmount).then(() => {
      window.fetch('/api/referral', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          walletAddress:  walletStr,
          depositSOL:     depositAmount,
          referredByCode: referredByCode || undefined,
        }),
      }).then(() => setShowReferral(true))
    })
  }

  const statusMessages: Record<string, string> = {
    checking_tier:     'Checking your tier position...',
    building_tx:       'Building transaction...',
    awaiting_approval: 'Approve in your wallet...',
    confirming:        'Confirming on-chain...',
  }

  // Tier bonus warning message
  function getTierWarning(): string | null {
    if (!belowTierMin) return null
    if (currentTier.tier === 1) {
      return `Your amount is below the Genesis minimum (${currentTier.minSol} SOL). Your transaction will go through but you will receive the base rate of 26,000 FIT/SOL instead of the Genesis bonus rate of 33,800 FIT/SOL. Increase to ${currentTier.minSol} SOL or more to unlock the +30% Genesis bonus.`
    }
    if (currentTier.tier === 2) {
      return `Your amount is below the Early minimum (${currentTier.minSol} SOL). Your transaction will go through but you will receive the base rate of 26,000 FIT/SOL instead of the Early bonus rate of 29,900 FIT/SOL. Increase to ${currentTier.minSol} SOL or more to unlock the +15% Early bonus.`
    }
    return null
  }

  const tierWarning = getTierWarning()

  return (
    <section id="contribute" className="max-w-6xl mx-auto px-6 md:px-10 mb-20">
      <div className="section-eyebrow">Founding Round</div>
      <h2 className="section-title">Contribute SOL. Receive FIT.</h2>
      <p className="text-muted text-sm mb-10 max-w-lg leading-relaxed">
        Early contributors receive a founding participant bonus on their FIT allocation.
        Tier is determined by wallet order — enforced automatically.
      </p>

      {/* Referral banner */}
      {referredByCode && (
        <div className="mb-6 px-4 py-3 bg-green-dim border border-green-mid rounded-xl flex items-center gap-3">
          <span className="text-green text-lg">🎁</span>
          <div>
            <p className="text-green text-xs font-syne font-bold">Referral bonus active</p>
            <p className="text-muted text-xs font-mono">
              Code <span className="text-green">{referredByCode}</span> applied — you will receive +10% extra $FIT at TGE.
            </p>
          </div>
        </div>
      )}

      <div className="bg-card border border-border rounded-xl p-6 mb-6">
        <div className="flex flex-wrap justify-between items-center gap-3 mb-5">
          <div>
            <div className="mono-label mb-1">Founding participant bonus — active now</div>
            <p className="text-xs text-muted">
              First 150 wallets receive bonus FIT allocation from within the seed pool.
              Same vesting applies to all. No new tokens created.
            </p>
          </div>
          {tierProgress.spotsLeft && (
            <div className="text-right">
              <div
                className="font-syne font-black text-2xl"
                style={{ color: TIERS[tierProgress.spotsLeft.tier - 1].color }}
              >
                {tierProgress.spotsLeft.count}
              </div>
              <div className="text-xs text-muted font-mono">
                Tier {tierProgress.spotsLeft.tier} spots left
              </div>
            </div>
          )}
        </div>
        <TierProgress stats={tierProgress} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-5">
          {TIERS.map((t, i) => {
            const progress = i === 0 ? tierProgress.tier1 : i === 1 ? tierProgress.tier2 : null
            const isClosed = progress ? progress.remaining === 0 : false
            const isActive = currentTier.tier === t.tier
            return (
              <div
                key={t.tier}
                className={cn(
                  'rounded-lg p-4 border transition-all',
                  isActive ? 'border-2' : 'border',
                  isClosed ? 'opacity-50' : ''
                )}
                style={{
                  borderColor: isActive ? t.color : t.colorBorder,
                  background:  isActive ? t.colorDim : 'transparent',
                }}
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="font-syne font-bold text-sm" style={{ color: t.color }}>
                      {t.badge}
                    </div>
                    <div className="text-xs text-muted font-mono">
                      {i === 0 ? 'Wallets 1-50' : i === 1 ? 'Wallets 51-150' : 'Wallets 151+'}
                    </div>
                  </div>
                  {isActive && !isClosed && (
                    <span
                      className="text-xs font-mono px-1.5 py-0.5 rounded"
                      style={{ background: t.colorDim, color: t.color, border: `1px solid ${t.colorBorder}` }}
                    >
                      ACTIVE
                    </span>
                  )}
                  {isClosed && (
                    <span className="text-xs font-mono text-muted">CLOSED</span>
                  )}
                </div>
                <div
                  className="font-syne font-black text-xl mb-0.5"
                  style={{ color: isClosed ? '#444' : t.color }}
                >
                  {t.bonusPct > 0 ? `+${t.bonusPct}%` : 'Base'}
                </div>
                <div className="text-xs text-muted mb-2">
                  {t.bonusPct > 0 ? 'founding bonus' : 'standard rate'}
                </div>
                <div className="text-xs font-mono" style={{ color: t.color }}>
                  {t.effectiveRate.toLocaleString()} FIT/SOL
                </div>
                <div className="text-xs text-muted mt-1">
                  min {t.minSol} SOL · max {RAISE_CONFIG.MAX_PER_WALLET_SOL} SOL
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 bg-card border border-green-mid rounded-xl p-7">
          {contribute.status === 'success' ? (
            <div>
              <SuccessPanel
                fitBase={contribute.fitBase}
                fitBonus={contribute.fitBonus}
                fitTotal={contribute.fitTotal}
                tier={contribute.tier}
                walletNumber={contribute.walletNumber}
                txSig={contribute.txSig}
                onReset={() => { contribute.reset(); setShowReferral(false) }}
              />
              {showReferral && publicKey && (
                <ReferralCard
                  walletAddress={publicKey.toString()}
                  depositSOL={solInput}
                />
              )}
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="mono-label">Your current tier</div>
                <TierBadge tier={currentTier} />
              </div>

              {publicKey && (
                <div className="mb-4 rounded-xl border border-green-mid bg-green-dim px-4 py-3 flex items-center justify-between">
                  <div>
                    <div className="mono-label text-green mb-1">Connected Wallet</div>
                    <div className="text-xs text-muted font-mono break-all">
                      {publicKey.toString()}
                    </div>
                  </div>
                  <div className="text-right ml-4">
                    <div className="text-2xl font-syne font-black text-green">
                      {balance !== null ? balance.toFixed(4) : '...'}
                    </div>
                    <div className="text-xs font-mono text-muted">SOL available</div>
                  </div>
                </div>
              )}

              {/* Referral code input */}
              <div className="mb-5">
                <div className="mono-label mb-2">
                  Referral code
                  <span className="text-muted font-normal font-mono text-xs ml-2">(optional)</span>
                </div>
                <input
                  type="text"
                  value={referredByCode}
                  onChange={(e) => setReferredByCode(e.target.value.toUpperCase())}
                  placeholder="e.g. FIT-AB23XY"
                  className="w-full bg-black/40 border border-border rounded-lg px-4 py-3 font-mono text-sm text-white outline-none focus:border-green transition-colors placeholder:text-muted/40"
                />
                {referredByCode && (
                  <p className="text-xs text-green font-mono mt-1.5">
                    Code applied — you will receive +10% extra $FIT at TGE
                  </p>
                )}
              </div>

              {/* Preset amounts */}
              <div className="mono-label mb-2">Select amount</div>
              <div className="flex flex-wrap gap-2 mb-4">
                {PRESET_AMOUNTS.map((v) => (
                  <button
                    key={v}
                    onClick={() => setSolInput(v)}
                    className={cn(
                      'px-3 py-2 rounded text-xs font-mono border transition-all',
                      solInput === v
                        ? 'border-green bg-green-dim text-green'
                        : 'border-border text-muted hover:border-green hover:text-green'
                    )}
                  >
                    {v} SOL
                  </button>
                ))}
              </div>

              {/* Amount input */}
              <div className="relative mb-2">
                <input
                  type="number"
                  value={solInput}
                  min={RAISE_CONFIG.MIN_SOL}
                  max={RAISE_CONFIG.MAX_PER_WALLET_SOL}
                  step={0.001}
                  onChange={(e) => handleSolInput(parseFloat(e.target.value) || RAISE_CONFIG.MIN_SOL)}
                  className={cn(
                    'w-full bg-black/40 border rounded-lg px-4 py-3 pr-14 font-mono text-xl text-white outline-none transition-colors [appearance:textfield]',
                    exceedsMax
                      ? 'border-danger focus:border-danger'
                      : tierWarning
                        ? 'border-amber/50 focus:border-amber'
                        : 'border-border focus:border-green'
                  )}
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted font-mono text-sm">
                  SOL
                </span>
              </div>

              {/* Hard cap warning */}
              {exceedsMax && (
                <div className="mb-4 p-3 bg-danger/10 border border-danger/30 rounded text-xs text-danger font-mono">
                  Maximum contribution is {RAISE_CONFIG.MAX_PER_WALLET_SOL} SOL per wallet. This limit is enforced by the protocol and cannot be bypassed.
                </div>
              )}

              {/* Tier bonus warning — amber, informational only */}
              {!exceedsMax && tierWarning && (
                <div className="mb-4 p-3 bg-amber/10 border border-amber/40 rounded-lg text-xs text-amber leading-relaxed">
                  <span className="font-bold">Bonus not applied:</span> {tierWarning}
                </div>
              )}

              {!exceedsMax && !tierWarning && <div className="mb-4" />}

              {/* Allocation breakdown */}
              <div
                className="rounded-xl p-4 mb-5 border"
                style={{
                  background:   belowTierMin ? TIERS[2].colorDim   : currentTier.colorDim,
                  borderColor:  belowTierMin ? TIERS[2].colorBorder : currentTier.colorBorder,
                }}
              >
                <div className="mono-label mb-3">Your FIT allocation</div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted">Base ({solInput} SOL x 26,000)</span>
                    <span className="font-mono text-white">{alloc.base.toLocaleString()} FIT</span>
                  </div>
                  {alloc.bonus > 0 && (
                    <div className="flex justify-between text-sm">
                      <span style={{ color: effectiveTier.color }}>
                        {effectiveTier.name} bonus (+{effectiveTier.bonusPct}%)
                      </span>
                      <span className="font-mono font-bold" style={{ color: effectiveTier.color }}>
                        +{alloc.bonus.toLocaleString()} FIT
                      </span>
                    </div>
                  )}
                  {belowTierMin && (
                    <div className="flex justify-between text-sm">
                      <span className="text-amber">
                        {currentTier.name} bonus (requires {currentTier.minSol} SOL)
                      </span>
                      <span className="font-mono text-amber">Not applied</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm border-t border-white/10 pt-2">
                    <span className="font-syne font-bold text-white">Total FIT received</span>
                    <span
                      className="font-mono font-black text-xl"
                      style={{ color: belowTierMin ? TIERS[2].color : effectiveTier.color }}
                    >
                      {alloc.total.toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="mt-3 text-xs font-mono text-muted">
                  Effective rate: {effectiveTier.effectiveRate.toLocaleString()} FIT/SOL · 25% at TGE · 75% over 12 months
                </div>
              </div>

              {/* Disclaimer */}
              <label className="flex gap-3 items-start mb-5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-0.5 flex-shrink-0 accent-green"
                />
                <span className="text-xs text-muted leading-relaxed">
                  I understand smart contracts are unaudited. Minimum {RAISE_CONFIG.MIN_SOL} SOL,
                  maximum {RAISE_CONFIG.MAX_PER_WALLET_SOL} SOL per wallet — this limit is enforced
                  by the protocol. FIT is a protocol access token, not a security. Founding
                  participant bonus vests on the same 25%/75% schedule as base allocation.
                  I will not contribute more than I can afford to lose entirely.
                </span>
              </label>

              {contribute.error && (
                <div className="mb-4 p-3 bg-danger/10 border border-danger/30 rounded text-xs text-danger">
                  {contribute.error}
                </div>
              )}

              {/* CTA button */}
              <button
                onClick={handleContribute}
                disabled={isProcessing || exceedsMax}
                className={cn(
                  'w-full py-4 rounded-lg font-syne font-black text-base uppercase tracking-wide border-none transition-all',
                  isProcessing || exceedsMax
                    ? 'bg-green/20 text-green/40 cursor-not-allowed'
                    : !publicKey
                      ? 'bg-green text-black hover:opacity-90 cursor-pointer'
                      : canContribute
                        ? 'bg-green text-black hover:opacity-90 cursor-pointer'
                        : 'bg-green/10 text-green/30 cursor-not-allowed'
                )}
              >
                {isProcessing
                  ? statusMessages[contribute.status] || 'Processing...'
                  : exceedsMax
                    ? `Maximum is ${RAISE_CONFIG.MAX_PER_WALLET_SOL} SOL — reduce your amount`
                    : !publicKey
                      ? 'Connect Wallet to Contribute'
                      : !agreed
                        ? 'Check the box above to continue'
                        : belowAbsMin
                          ? `Minimum contribution is ${RAISE_CONFIG.MIN_SOL} SOL`
                          : belowTierMin
                            ? `Contribute ${solInput} SOL at base rate — ${alloc.total.toLocaleString()} FIT`
                            : `Contribute ${solInput} SOL — ${alloc.total.toLocaleString()} FIT`}
              </button>

              <p className="text-center text-xs text-muted font-mono mt-3">
                Phantom and Solflare supported · SOL goes directly to 2-of-3 multisig
              </p>
            </div>
          )}
        </div>

        {/* Right panel */}
        <div className="lg:col-span-2 flex flex-col gap-3">
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="mono-label mb-3">Round progress</div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted">{stats.totalSolRaised.toFixed(1)} SOL raised</span>
              <span className="font-mono text-white">{tierProgress.raisePct.toFixed(1)}%</span>
            </div>
            <div className="h-2 bg-card2 rounded-full overflow-hidden mb-1">
              <div
                className="h-full bg-green rounded-full"
                style={{ width: `${tierProgress.raisePct}%`, boxShadow: '0 0 8px #00e56755' }}
              />
            </div>
            <div className="text-xs text-muted font-mono">
              {stats.totalContributors} contributors · cap {RAISE_CONFIG.CAP_SOL.toLocaleString()} SOL
            </div>
          </div>

          {[
            { label: 'Base rate',        val: '26,000 FIT / SOL' },
            { label: 'Genesis rate',     val: '33,800 FIT / SOL', highlight: true },
            { label: 'Early rate',       val: '29,900 FIT / SOL' },
            { label: 'TGE unlock',       val: '25% at TGE' },
            { label: 'Linear vest',      val: '75% over 12 months' },
            { label: 'Min contribution', val: `${RAISE_CONFIG.MIN_SOL} SOL` },
            { label: 'Max per wallet',   val: `${RAISE_CONFIG.MAX_PER_WALLET_SOL} SOL (hard cap)` },
          ].map((r) => (
            <div
              key={r.label}
              className="bg-card border border-border rounded-lg px-4 py-3 flex justify-between items-center"
            >
              <span className="text-xs text-muted">{r.label}</span>
              <span className={cn('font-mono text-xs font-medium', r.highlight ? 'text-amber' : 'text-white')}>
                {r.val}
              </span>
            </div>
          ))}

          <div className="bg-card border border-border rounded-lg p-4">
            <div className="mono-label mb-2">Treasury multisig</div>
            <div className="font-mono text-xs text-green break-all mb-2">{TREASURY_WALLET}</div>
            <a
              href={`https://solscan.io/account/${TREASURY_WALLET}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-muted hover:text-green transition-colors"
            >
              Verify on Solscan
            </a>
          </div>

          <div className="bg-green-dim border border-green-mid rounded-lg p-4">
            <div className="mono-label text-green mb-2">No wallet yet?</div>
            <p className="text-xs text-muted mb-3">
              Get Phantom or Solflare — free, takes 2 minutes.
            </p>
            <div className="flex gap-2">
              <a href="https://phantom.app" target="_blank" rel="noopener noreferrer"
                className="text-xs font-mono text-green border border-green-mid px-3 py-1.5 rounded hover:bg-green-mid transition-colors">
                Phantom
              </a>
              <a href="https://solflare.com" target="_blank" rel="noopener noreferrer"
                className="text-xs font-mono text-green border border-green-mid px-3 py-1.5 rounded hover:bg-green-mid transition-colors">
                Solflare
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}