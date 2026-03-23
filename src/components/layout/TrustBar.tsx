// src/components/layout/TrustBar.tsx

const ITEMS = [
  '2-of-3 Multisig Treasury',
  'GitHub: Open Source',
  'Seed Round Active',
  'Wyoming LLC: In Progress',
  'KYC: Pending — Synaps.io',
  'Audit: Planned Q2 2026',
]

export function TrustBar() {
  return (
    <div className="bg-green-dim border-b border-green-mid px-6 py-2.5 flex items-center gap-6 overflow-x-auto">
      {ITEMS.map((item, i) => (
        <span key={i} className="flex items-center gap-2 whitespace-nowrap text-xs text-green font-mono shrink-0">
          <span className="pulse-dot" />
          {item}
          {i < ITEMS.length - 1 && <span className="text-border ml-4">·</span>}
        </span>
      ))}
    </div>
  )
}
