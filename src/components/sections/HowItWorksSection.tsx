// src/components/sections/HowItWorksSection.tsx
// Canonical fee model: 80% prizes / 20% platform (10% ops + 5% burn + 5% yield)
// GPS is app-verified, attested on-chain — not read directly by smart contract
// Settlement is triggered automatically AFTER 24–48h verification window closes

import { STEPS } from '@/lib/constants'

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="max-w-6xl mx-auto px-6 md:px-10 mb-20">
      <div className="section-eyebrow">Protocol</div>
      <h2 className="section-title">4 steps to compete and earn</h2>
      <p className="text-muted text-sm mb-10 max-w-xl leading-relaxed">
        Participant-funded prize pools. Platform retains 20% per entry for operations,
        burn, and staker yield. No token emissions required.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border rounded-lg overflow-hidden mb-3">
        {[
          {
            num: '01',
            title: 'Stake FIT',
            desc: 'Stake minimum 1,000 FIT to unlock challenge access. 7-day unstaking lockup creates an economic deterrent against multi-account farming.',
          },
          {
            num: '02',
            title: 'Enter Challenges',
            desc: 'Pay 0.1 SOL per challenge. Running, walking, or gym — activity data captured by the FitSOL app using GPS and time-bound QR codes.',
          },
          {
            num: '03',
            title: 'Compete and Win',
            desc: 'Top 3 split 80% of the pool: 1st place 60%, 2nd place 15%, 3rd place 5%. Platform retains 20% for operations, burn, and staker yield.',
          },
          {
            num: '04',
            title: 'Verified Settlement',
            desc: 'Activity data is verified during a 24–48h window. After verification closes, prize distribution executes on-chain via smart contract. 5% of fees buy and burn FIT; 5% distribute to stakers.',
          },
        ].map((s) => (
          <div key={s.num} className="bg-card p-7">
            <div className="font-mono text-xs text-green mb-4">{s.num}</div>
            <h3 className="font-syne font-bold text-base mb-3">{s.title}</h3>
            <p className="text-sm text-muted leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>

      {/* Verification architecture — honest explanation */}
      <div className="bg-card border border-border rounded-lg p-6 mb-3">
        <div className="mono-label mb-4">How verification works — the honest architecture</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              step: '1. App layer',
              desc: 'The FitSOL mobile app captures GPS data and records gym QR code scans. It applies anomaly detection — impossible speeds, path inconsistencies, and QR reuse are flagged.',
              note: 'Off-chain — runs on user device and FitSOL servers',
            },
            {
              step: '2. Attestation',
              desc: 'Verified activity results are submitted as a cryptographic attestation on-chain during the 24–48h review window. Community dispute can be raised during this period.',
              note: 'Bridge between off-chain verification and on-chain settlement',
            },
            {
              step: '3. Smart contract settlement',
              desc: 'Once the verification window closes and no disputes remain, the smart contract executes automatically: distributes SOL to winners, slashes fraudulent stakes, applies burn and yield.',
              note: 'Fully on-chain — no human approval required at settlement stage',
            },
          ].map((v) => (
            <div key={v.step} className="bg-card2 border border-border rounded-lg p-4">
              <div className="font-mono text-xs text-green mb-2">{v.step}</div>
              <p className="text-xs text-muted leading-relaxed mb-2">{v.desc}</p>
              <p className="text-xs text-muted font-mono italic">{v.note}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Canonical fee breakdown */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="mono-label mb-5">
          Canonical fee model — per 0.1 SOL entry (used consistently throughout)
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Prize distribution */}
          <div>
            <div className="text-xs text-muted font-mono mb-3">Prize pool (80% of entry = 0.080 SOL)</div>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: '1st Place', pct: '60%', sol: '0.060 SOL', color: 'text-green' },
                { label: '2nd Place', pct: '15%', sol: '0.015 SOL', color: 'text-green/70' },
                { label: '3rd Place', pct: '5%',  sol: '0.005 SOL', color: 'text-green/50' },
              ].map((p) => (
                <div key={p.label} className="text-center p-3 border border-border rounded-lg">
                  <div className={`font-syne font-black text-2xl mb-1 ${p.color}`}>{p.pct}</div>
                  <div className="text-xs font-mono text-muted mb-1">{p.label}</div>
                  <div className="text-xs text-muted">{p.sol}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Platform breakdown */}
          <div>
            <div className="text-xs text-muted font-mono mb-3">Platform (20% of entry = 0.020 SOL)</div>
            <div className="divide-y divide-border border border-border rounded-lg overflow-hidden">
              {[
                { label: 'Operations',        pct: '10% of entry', sol: '0.010 SOL', color: 'text-white' },
                { label: 'FIT buy + burn',    pct: '5% of entry',  sol: '0.005 SOL', color: 'text-green' },
                { label: 'Staker yield',      pct: '5% of entry',  sol: '0.005 SOL', color: 'text-green' },
                { label: 'Platform total',    pct: '20% of entry', sol: '0.020 SOL', color: 'text-white' },
              ].map((r, i) => (
                <div key={r.label}
                  className={`flex justify-between items-center px-4 py-2.5 text-xs ${i === 3 ? 'bg-card2 font-medium' : 'bg-card'}`}>
                  <span className="text-muted">{r.label}</span>
                  <div className="flex gap-4 text-right">
                    <span className="text-muted font-mono">{r.pct}</span>
                    <span className={`font-mono ${r.color}`}>{r.sol}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-2 p-2 bg-green-dim border border-green-mid rounded text-xs text-muted font-mono">
              Total: 80% prizes + 20% platform = 100% ✓
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
