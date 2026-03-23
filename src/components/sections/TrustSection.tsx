// src/components/sections/TrustSection.tsx
import { TRUST_SIGNALS, MULTISIG_SIGNERS, TREASURY_WALLET } from '@/lib/constants'
import { TrustSignal } from '@/types'
import { cn } from '@/lib/utils'

function TrustCard({ s }: { s: TrustSignal }) {
  return (
    <div className={cn(
      'bg-card rounded-lg p-6 border flex flex-col',
      s.status === 'verified' && 'border-green-mid',
      s.status === 'pending'  && 'border-amber/40',
      s.status === 'planned'  && 'border-border',
    )}>
      <div className={cn(
        'flex items-center gap-1.5 text-xs font-mono mb-2',
        s.status === 'verified' && 'text-green',
        s.status === 'pending'  && 'text-amber',
        s.status === 'planned'  && 'text-muted',
      )}>
        <span>{s.status === 'verified' ? '●' : s.status === 'pending' ? '◐' : '○'}</span>
        <span>
          {s.status === 'verified' ? 'Verified' : s.status === 'pending' ? `In Progress${s.eta ? ` — ETA ${s.eta}` : ''}` : `Planned${s.eta ? ` — ${s.eta}` : ''}`}
        </span>
      </div>
      <h3 className="font-syne font-bold text-sm mb-2">{s.label}</h3>
      <p className="text-xs text-muted leading-relaxed flex-1">{s.description}</p>
      {s.link && (
        <a href={s.link} target="_blank" rel="noopener noreferrer"
          className="mt-3 text-xs text-green font-mono hover:underline no-underline">
          {s.linkLabel} →
        </a>
      )}
    </div>
  )
}

export function TrustSection() {
  return (
    <section id="trust" className="max-w-6xl mx-auto px-6 md:px-10 mb-20">
      <div className="section-eyebrow">Transparency</div>
      <h2 className="section-title">Built to be verified</h2>
      <p className="text-muted text-sm mb-10 max-w-md">
        Every trust signal on one page. No "coming soon" without a published date.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-3">
        {TRUST_SIGNALS.map((s) => <TrustCard key={s.id} s={s} />)}
      </div>

      {/* Multisig transparency */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="mono-label mb-4">Treasury multisig — 2-of-3 required to move any funds</div>
        <div className="divide-y divide-border">
          {MULTISIG_SIGNERS.map((s, i) => (
            <div key={i} className="flex flex-wrap justify-between gap-2 py-3 text-sm">
              <span className="text-muted">{s.role}</span>
              <a
                href={`https://solscan.io/account/${s.address}`}
                target="_blank" rel="noopener noreferrer"
                className="font-mono text-xs text-green hover:underline no-underline"
              >
                {s.address}
              </a>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-border">
          <a
            href={`https://solscan.io/account/${TREASURY_WALLET}`}
            target="_blank" rel="noopener noreferrer"
            className="text-xs text-green font-mono hover:underline no-underline"
          >
            View full treasury on Solscan →
          </a>
        </div>
      </div>
    </section>
  )
}
