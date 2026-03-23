// src/components/sections/TokenomicsSection.tsx
// Canonical fee model: 80% prizes / 20% platform (10% ops + 5% burn + 5% yield)
// Burn = supply reduction, buy-side pressure — NOT a price guarantee
// TGE circulating supply reconciled to component unlocks

'use client'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import {
  TOKENOMICS_FEE_SPLIT,
  TOKENOMICS_SUPPLY,
  TOKENOMICS_VESTING,
  TOKENOMICS_VOLUME,
} from '@/lib/constants'
import { TokenomicsRow } from '@/types'

function ColorLegend() {
  return (
    <div className="flex flex-wrap gap-3 mb-8 p-4 bg-card border border-border rounded-lg items-center">
      <span className="mono-label">Color guide:</span>
      {[
        { label: 'Green',  bg: 'bg-green-dim border-green-mid',  text: 'text-green',  meaning: 'Healthy / confirmed / positive signal' },
        { label: 'Amber',  bg: 'bg-amber/10 border-amber/30',    text: 'text-amber',  meaning: 'Important term to note — not a risk' },
        { label: 'Red',    bg: 'bg-danger/10 border-danger/30',  text: 'text-danger', meaning: 'Actual risk or warning' },
        { label: 'White',  bg: 'bg-card2 border-border',         text: 'text-white',  meaning: 'Neutral factual data' },
      ].map((c) => (
        <div key={c.label} className={cn('flex items-center gap-2 px-3 py-1.5 rounded text-xs border', c.bg)}>
          <span className={cn('font-mono font-bold', c.text)}>{c.label}</span>
          <span className="text-muted">= {c.meaning}</span>
        </div>
      ))}
    </div>
  )
}

function TokenTable({ title, rows, note }: { title: string; rows: TokenomicsRow[]; note?: string }) {
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="font-syne font-bold text-sm mb-4">{title}</div>
      <div className="divide-y divide-border">
        {rows.map((r) => (
          <div key={r.label} className="table-row">
            <span className="text-muted pr-4 text-xs leading-relaxed">{r.label}</span>
            <span className={cn(
              'font-mono font-medium text-right text-sm',
              r.highlight === 'green' && 'text-green',
              r.highlight === 'amber' && 'text-amber',
              r.highlight === 'red'   && 'text-danger',
              (!r.highlight || r.highlight === 'none') && 'text-white',
            )}>{r.value}</span>
          </div>
        ))}
      </div>
      {note && (
        <p className="mt-3 text-xs text-muted leading-relaxed border-t border-border pt-3">{note}</p>
      )}
    </div>
  )
}

const ALLOCATION_BREAKDOWN = [
  {
    category: 'Seed Round',
    pct: 5, tokens: '100,000,000 FIT', color: '#00e567', risk: 'none' as const,
    purpose: 'Early contributors who fund the audit and first developer hire.',
    vest: '25% accessible at TGE, 75% unlocks linearly over 12 months.',
    price: '$0.005 per FIT',
  },
  {
    category: 'Public Sale',
    pct: 10, tokens: '200,000,000 FIT', color: '#5DCAA5', risk: 'low' as const,
    purpose: 'Open market participants at launch. The linear vest reduces Day 1 sell pressure.',
    vest: '20% accessible at TGE, 80% unlocks linearly over 6 months.',
    price: '$0.010 per FIT (intended)',
  },
  {
    category: 'Team & Advisors',
    pct: 20, tokens: '400,000,000 FIT', color: '#EF9F27', risk: 'low' as const,
    purpose: 'Core team and advisor compensation over a 4-year period.',
    vest: '4-year vest with 1-year cliff. Zero tokens accessible in year one. Unlocks linearly over years 2–4.',
    price: 'N/A',
  },
  {
    category: 'Development',
    pct: 25, tokens: '500,000,000 FIT', color: '#7F77DD', risk: 'none' as const,
    purpose: 'Ongoing protocol development: smart contracts, mobile app, integrations, security upgrades.',
    vest: 'Milestone-based. Tokens release only when verifiable development milestones are met.',
    price: 'N/A',
  },
  {
    category: 'Liquidity',
    pct: 20, tokens: '400,000,000 FIT', color: '#378ADD', risk: 'none' as const,
    purpose: 'Providing trading liquidity on Solana decentralised exchanges at and after TGE.',
    vest: '2-year lock. Cannot be accessed for 24 months post-TGE.',
    price: 'N/A',
  },
  {
    category: 'Protocol Reserve',
    pct: 20, tokens: '400,000,000 FIT', color: '#888780', risk: 'none' as const,
    purpose: 'Long-term sustainability, ecosystem grants, strategic partnerships, emergency reserve.',
    vest: 'Governance controlled. A community vote is required before any of this allocation unlocks.',
    price: 'N/A',
  },
]

const RISK_LABELS = {
  none: { label: 'Low risk',  color: 'text-green',  bg: 'bg-green-dim border-green-mid' },
  low:  { label: 'Watch',     color: 'text-amber',  bg: 'bg-amber/10 border-amber/30'   },
}

function AllocationBreakdown() {
  const [active, setActive] = useState<number | null>(null)

  return (
    <div className="bg-card border border-border rounded-xl p-6 mb-3">
      <div className="font-syne font-bold text-sm mb-1">
        Full token allocation — 2,000,000,000 FIT total supply
      </div>
      <p className="text-xs text-muted mb-5 leading-relaxed">
        Click any row to see what the allocation funds, who holds it, and the full vesting schedule.
      </p>

      {/* Proportional bar */}
      <div className="flex h-8 rounded-lg overflow-hidden mb-6 gap-0.5">
        {ALLOCATION_BREAKDOWN.map((a, i) => (
          <div
            key={a.category}
            className="relative cursor-pointer transition-opacity duration-200"
            style={{ width: `${a.pct}%`, background: a.color, opacity: active === null || active === i ? 1 : 0.3 }}
            onClick={() => setActive(active === i ? null : i)}
            title={`${a.category}: ${a.pct}%`}
          >
            {a.pct >= 10 && (
              <span className="absolute inset-0 flex items-center justify-center text-xs font-mono font-bold text-black">
                {a.pct}%
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="space-y-1.5">
        {ALLOCATION_BREAKDOWN.map((a, i) => {
          const risk = RISK_LABELS[a.risk]
          const isOpen = active === i
          return (
            <div key={a.category}>
              <button
                onClick={() => setActive(isOpen ? null : i)}
                className={cn(
                  'w-full flex items-center gap-3 p-3 rounded-lg border text-left transition-all cursor-pointer',
                  isOpen ? 'bg-card2 border-border' : 'bg-transparent border-transparent hover:bg-card2 hover:border-border'
                )}
              >
                <span className="w-3 h-3 rounded-sm flex-shrink-0" style={{ background: a.color }} />
                <span className="font-syne font-bold text-sm flex-1">{a.category}</span>
                <span className="font-mono text-sm font-medium" style={{ color: a.color }}>{a.pct}%</span>
                <span className="font-mono text-xs text-muted hidden md:block w-44 text-right">{a.tokens}</span>
                <span className={cn('text-xs font-mono px-2 py-0.5 rounded border hidden sm:block', risk.bg, risk.color)}>
                  {risk.label}
                </span>
                <span className={cn('text-muted text-xs transition-transform', isOpen && 'rotate-180')}>▾</span>
              </button>
              {isOpen && (
                <div className="mx-2 mb-2 p-4 bg-card2 border border-border rounded-b-lg -mt-1">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <div className="mono-label mb-2">Purpose</div>
                      <p className="text-xs text-muted leading-relaxed">{a.purpose}</p>
                    </div>
                    <div>
                      <div className="mono-label mb-2">Vesting schedule</div>
                      <p className="text-xs leading-relaxed" style={{ color: a.color }}>{a.vest}</p>
                    </div>
                    <div>
                      <div className="mono-label mb-2">Price / access</div>
                      <p className="text-xs text-muted font-mono">{a.price}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* TGE circulating reconciliation */}
      <div className="mt-5 p-4 bg-card2 border border-border rounded-lg">
        <div className="mono-label mb-3">TGE circulating supply reconciliation — 250,000,000 FIT</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          {[
            { label: 'Seed round TGE unlock (25% of 100M)', val: '25,000,000 FIT' },
            { label: 'Public sale TGE unlock (20% of 200M)', val: '40,000,000 FIT' },
            { label: 'Liquidity provision at launch', val: '~185,000,000 FIT' },
          ].map((r) => (
            <div key={r.label} className="flex justify-between gap-2 border-b border-border pb-2">
              <span className="text-muted">{r.label}</span>
              <span className="font-mono text-white">{r.val}</span>
            </div>
          ))}
        </div>
        <div className="text-xs text-muted mt-2 font-mono">Total ≈ 250,000,000 FIT = 12.5% of total supply ✓</div>
      </div>

      {/* Structure summary */}
      <div className="mt-3 p-4 bg-green-dim border border-green-mid rounded-lg">
        <div className="mono-label text-green mb-2">Supply structure summary</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-muted">
          <div className="flex gap-2"><span className="text-green flex-shrink-0">✓</span><span>Team locked 4 years with 1-year cliff — no team tokens in year one</span></div>
          <div className="flex gap-2"><span className="text-green flex-shrink-0">✓</span><span>12.5% circulating at TGE — controlled initial supply</span></div>
          <div className="flex gap-2"><span className="text-green flex-shrink-0">✓</span><span>65% locked 2+ years across development, liquidity, and reserve</span></div>
        </div>
      </div>
    </div>
  )
}

export function TokenomicsSection() {
  return (
    <section id="tokenomics" className="max-w-6xl mx-auto px-6 md:px-10 mb-20">
      <div className="section-eyebrow">Tokenomics</div>
      <h2 className="section-title">Consistent math. Transparent structure.</h2>
      <p className="text-muted text-sm mb-6 max-w-xl leading-relaxed">
        One canonical fee model used consistently throughout. Platform retains 20% of each
        entry: 10% operations, 5% buy-and-burn, 5% staker yield. All numbers on this page
        use that model.
      </p>

      <ColorLegend />
      <AllocationBreakdown />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
        <TokenTable
          title="Fee distribution — per 0.1 SOL entry"
          rows={TOKENOMICS_FEE_SPLIT}
          note="Platform retains 20% total. All four rows sum to exactly 100%. Consistent with every other section of this site."
        />
        <TokenTable
          title="TGE supply metrics — Q3 2026"
          rows={TOKENOMICS_SUPPLY}
          note="Amber on team tokens: 4-year vest with 1-year cliff. The team receives zero tokens in year one. This limits early supply from the team side."
        />
        <TokenTable
          title="Vesting schedule"
          rows={TOKENOMICS_VESTING}
          note="Amber = timing you need to know as a contributor. These are the dates that affect when tokens become accessible. They are scheduled and disclosed upfront."
        />
        <TokenTable
          title="Daily volume projection"
          rows={TOKENOMICS_VOLUME}
          note="Based on the 20% platform fee model. At 1,000 challenges/day: 100 SOL volume → 20 SOL platform fees → 10 SOL ops, 5 SOL burned, 5 SOL stakers. Projections, not guarantees."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="bg-card border border-green-mid rounded-lg p-6">
          <div className="mono-label text-green mb-3">FIT buy-and-burn mechanic</div>
          <p className="text-sm text-muted leading-relaxed mb-3">
            5% of every platform fee (0.005 SOL per entry) is used to purchase FIT from
            the open market and permanently remove it from circulation. At 1,000 challenges/day
            this removes approximately 65K–130K FIT from supply each day.
          </p>
          <p className="text-xs text-muted leading-relaxed border-t border-border pt-3">
            Supply reduction through burning creates deflationary pressure on circulating supply.
            It does not guarantee any specific price outcome — token price is determined by
            market conditions, demand, and many other factors.
          </p>
        </div>
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="mono-label mb-3">Staker yield formula</div>
          <code className="block bg-black/50 border border-border rounded p-3 text-xs text-green font-mono mb-3">
            Yield = (Daily volume × 5%) ÷ Total staked FIT
          </code>
          <p className="text-xs text-muted leading-relaxed">
            Staker yield is funded entirely by protocol fees from real challenge volume.
            There are no token emissions. If challenge volume is zero, staker yield is zero.
            Yield scales directly with actual platform usage.
          </p>
        </div>
      </div>
    </section>
  )
}
