// src/components/layout/Footer.tsx
import Link from 'next/link'
import { ENTITY, SOCIAL_LINKS } from '@/lib/constants'
import Image from 'next/image'

export function Footer() {
  return (
    <footer className="border-t border-border px-6 md:px-10 py-10 mt-10">
      <div className="max-w-6xl mx-auto flex flex-wrap justify-between gap-8">
        {/* Brand */}
        <div>
          <div className="mb-1 flex items-center">
<Image
    src="/logo.png"
    alt="FitSOL"
    width={140}
    height={40}
    className="h-16 w-auto"
  />
</div>
          <div className="font-mono text-xs text-green mb-1">{ENTITY.NAME} · {ENTITY.STATE}</div>
          <div className="font-mono text-xs text-muted">Audits pending · Beta software · Built on Solana</div>
        </div>

        {/* Protocol links */}
        <div>
          <div className="mono-label mb-3">Protocol</div>
          <div className="flex flex-col gap-2">
            {[
              { label: 'How It Works', href: '/#how-it-works' },
              { label: 'Tokenomics',   href: '/#tokenomics'   },
              { label: 'Whitepaper',   href: '/whitepaper'    },
              { label: 'Seed Round',   href: '/#seed'         },
            ].map((l) => (
              <Link key={l.label} href={l.href}
                className="text-xs text-muted hover:text-white transition-colors no-underline">
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Community */}
        <div>
          <div className="mono-label mb-3">Community</div>
          <div className="flex flex-col gap-2">
            <a href={SOCIAL_LINKS.twitter}  target="_blank" rel="noopener noreferrer" className="text-xs text-muted hover:text-green transition-colors no-underline">Twitter / X</a>
            <a href={SOCIAL_LINKS.telegram} target="_blank" rel="noopener noreferrer" className="text-xs text-muted hover:text-green transition-colors no-underline">Telegram</a>
            <a href={SOCIAL_LINKS.github}   target="_blank" rel="noopener noreferrer" className="text-xs text-muted hover:text-green transition-colors no-underline">GitHub</a>
          </div>
        </div>

        {/* Legal */}
        <div>
          <div className="mono-label mb-3">Legal</div>
          <div className="flex flex-col gap-2">
            <Link href="/terms"   className="text-xs text-muted hover:text-white transition-colors no-underline">Terms of Service</Link>
            <Link href="/privacy" className="text-xs text-muted hover:text-white transition-colors no-underline">Privacy Policy</Link>
            <Link href="/careers" className="text-xs text-muted hover:text-white transition-colors no-underline">Careers</Link>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-border">
        <p className="text-xs text-muted font-mono">
          © 2026 {ENTITY.NAME}. FIT is a utility token. This is not financial advice.
          Investing in crypto assets carries significant risk including total loss of funds.
        </p>
      </div>
    </footer>
  )
}
