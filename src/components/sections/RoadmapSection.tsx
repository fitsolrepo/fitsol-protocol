// src/components/sections/RoadmapSection.tsx
import { cn } from '@/lib/utils'

const MILESTONES = [
  {
    date: 'March–April 2026',
    title: 'Community Founding Round',
    active: true,
    items: [
      { text: '2-of-3 Multisig treasury live',   done: true  },
      { text: 'Founding round opens',             done: true  },
      { text: 'Seed phase referral system live',  done: true  },
      { text: 'Wyoming LLC registration',         done: false },
      { text: 'Founder KYC via Synaps.io',        done: false },
      { text: 'GitHub open-sourced',              done: false },
    ],
  },
  {
    date: 'May 2026',
    title: 'Build Phase',
    active: false,
    items: [
      { text: 'Smart contract developer hired',       done: false },
      { text: 'Staking contracts on Solana devnet',   done: false },
      { text: 'Challenge verification system built',  done: false },
      { text: 'Twitter grows to 1,000+ members',      done: false },
      { text: 'First gym partner LOI signed',         done: false },
    ],
  },
  {
    date: 'June 2026',
    title: 'Audit & Full Seed Round',
    active: false,
    items: [
      { text: 'OtterSec audit completed + published',    done: false },
      { text: 'Devnet live with explorer links',         done: false },
      { text: 'Full seed round opens ($500K–$1M)',       done: false },
      { text: 'Team fully doxxed publicly',              done: false },
      { text: 'Legal opinion on token classification',   done: false },
    ],
  },
  {
    date: 'Q3 2026',
    title: 'Mainnet & TGE',
    active: false,
    items: [
      { text: 'Mainnet launch on Solana',          done: false },
      { text: 'FIT token TGE',                     done: false },
      { text: '10 gym partners onboarded',         done: false },
      { text: 'Mobile app beta (iOS + Android)',   done: false },
      { text: 'First 1,000 challenges completed',  done: false },
    ],
  },
]

export function RoadmapSection() {
  return (
    <section id="roadmap" className="max-w-6xl mx-auto px-6 md:px-10 mb-20">
      <div className="section-eyebrow">Roadmap</div>
      <h2 className="section-title">Honest milestones.</h2>
      <p className="text-muted text-sm mb-10 max-w-md">
        Every date is a public commitment. We update this page when things change.
        Completed items are marked with a checkmark. Pending items are in progress
        or planned.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {MILESTONES.map((m) => (
          <div
            key={m.date}
            className={cn(
              'rounded-lg p-6 border',
              m.active ? 'bg-green-dim border-green-mid' : 'bg-card border-border'
            )}
          >
            <div className={cn(
              'font-mono text-xs mb-2 uppercase tracking-wider',
              m.active ? 'text-green' : 'text-muted'
            )}>
              {m.date}
            </div>
            {m.active && (
              <div className="inline-flex items-center gap-1.5 text-xs font-mono text-green bg-green/10 border border-green-mid px-2 py-0.5 rounded mb-2">
                <span className="pulse-dot" /> In Progress
              </div>
            )}
            <h3 className="font-syne font-bold text-sm mb-3">{m.title}</h3>
            <ul className="space-y-1.5">
              {m.items.map((item) => (
                <li key={item.text} className="flex gap-2 text-xs text-muted">
                  <span className={
                    item.done
                      ? 'text-green font-bold flex-shrink-0'
                      : m.active
                        ? 'text-muted flex-shrink-0'
                        : 'text-border flex-shrink-0'
                  }>
                    {item.done ? '✓' : '—'}
                  </span>
                  <span className={item.done ? 'text-green' : 'text-muted'}>
                    {item.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
