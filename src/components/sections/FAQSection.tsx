// src/components/sections/FAQSection.tsx
// Honest GPS architecture: app verifies, attests on-chain, contract settles
// "Automatic" only after the 24-48h verification window closes
// No price guarantee language

'use client'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { SOCIAL_LINKS } from '@/lib/constants'
import { EMAILS } from '@/lib/constants'

const SUPPORT_EMAIL = EMAILS.support;

const FAQS = [
  {
    category: 'For Investors',
    items: [
      {
        q: 'What am I actually buying in the founding round?',
        a: 'You are receiving FIT tokens at $0.005 each — a 2x discount to the intended public sale price of $0.01. You receive 26,000 FIT per SOL contributed. 25% of your FIT allocation becomes accessible at TGE, and the remaining 75% unlocks linearly over 12 months. This is a high-risk early contribution, not a financial investment with guaranteed returns.',
      },
      {
        q: 'How does the referral program work?',
        a: 'After your SOL deposit is confirmed on-chain, a unique referral code is automatically generated for your wallet (format: FIT-XXXXXX). Share your personal link — anyone who contributes using your code gets +10% extra $FIT added to their allocation at TGE. You earn 5% of their SOL deposit value in $FIT at TGE. If you refer 10 or more people, your reward rate upgrades to 8%. All referral bonuses are tracked in our database and paid at Token Generation Event. No $FIT token exists yet — this is a pre-TGE commitment.',
      },
      {
        q: 'Where do I find my referral code after contributing?',
        a: 'Your referral dashboard appears automatically on the contribution form immediately after your transaction is confirmed. It shows your unique referral link, how many people you have referred, and your current $FIT bonus earned. You can copy your link or tweet it directly from the dashboard. Your referral code is also tied permanently to your wallet address, so you can retrieve it anytime by visiting the site with your wallet connected.',
      },
      {
        q: 'Why are some figures shown in amber? Is that a warning?',
        a: 'No. Amber indicates an important term you should read carefully — not a risk. For example, "4yr vest, 1yr cliff" on team tokens is amber because it defines when the team can access their allocation. It means the founding team receives zero tokens for the first 12 months and cannot access the full allocation for 4 years. This is disclosed because it affects token supply dynamics, not because it is negative.',
      },
      {
        q: 'What is the maximum I can lose?',
        a: 'Your entire contribution. FitSOL smart contracts are unaudited. The platform is pre-launch. Only contribute what you can afford to lose completely. This is stated clearly and without qualification.',
      },
      {
        q: 'What does my contribution fund specifically?',
        a: 'The founding round targets funding for: (1) OtterSec smart contract audit approximately $20K, (2) Lead smart contract developer hire approximately $15K, (3) Legal entity formalisation approximately $5K, (4) Community and infrastructure approximately $5K. Total approximately $45K operational need. The round cap of 4,000 SOL (~$680K at current prices) provides full runway through TGE.',
      },
      {
        q: 'When is the full round and when do tokens become tradable?',
        a: 'A larger $500K-$1M round is planned for Q2 2026, conditional on the OtterSec audit being completed and published. Tokens are planned to become tradable (TGE) in Q3 2026 on Solana decentralised exchanges. These are targets, not contractual commitments.',
      },
      {
        q: 'Why is the team not fully public yet?',
        a: 'The founding team is completing Synaps.io identity verification — an institutional KYC standard. The founding round operates under Wyoming LLC with a 2-of-3 multisig treasury that requires multiple parties to move funds. Full public identities are planned for Q2 2026 alongside the larger round. Contributing before full public identity disclosure carries additional risk, which is why individual contributions are capped at 50 SOL.',
      },
      {
        q: 'What happens if the project does not reach mainnet?',
        a: 'If the protocol does not launch, remaining treasury funds would be distributed proportionally to contributors on a best-efforts basis via the multisig. There is no legally binding guarantee of return. This is a founding-stage contribution with all the risks that entails.',
      },
    ],
  },
  {
    category: 'For Athletes',
    items: [
      {
        q: 'Do I need to understand crypto to use FitSOL?',
        a: 'You need a Solana wallet (Phantom is free, takes a few minutes to set up) and some SOL to enter challenges. The app handles all blockchain interactions. You do not need to understand smart contracts to participate.',
      },
      {
        q: 'How does challenge verification work?',
        a: 'The FitSOL app captures GPS data during running and walking challenges. It checks speed and path consistency — routes that are physically impossible are flagged. For gym challenges, you scan a time-limited QR code that changes every 60 seconds, preventing screenshot sharing. Verified data is submitted on-chain during a 24-48h review window. After the window closes, the smart contract executes prize distribution automatically.',
      },
      {
        q: 'Why is there a 24-48h delay before I receive SOL?',
        a: 'The verification window allows the system to flag anomalies, process any community disputes, and confirm all GPS and QR data before funds move on-chain. Once the window closes, smart contract settlement is automatic — no human approval is needed at that stage. The delay is the verification step, not an approval step.',
      },
      {
        q: 'What happens if I am caught cheating?',
        a: 'If fraud is confirmed during the verification window, 100% of your staked FIT is slashed — permanently destroyed. At 1,000 FIT minimum stake, the financial cost of a detected cheat exceeds realistic prize gains in small challenges. Slashing is graduated: a warning for first flags, partial slash for confirmed anomalies, full slash for verified repeated fraud.',
      },
      {
        q: 'When does the app launch?',
        a: 'Mainnet launch is planned for Q3 2026. A public testnet beta is planned for June-July 2026 where you can test challenge participation without real funds at stake. Join the Discord to be notified when the beta opens.',
      },
    ],
  },
  {
    category: 'Token & Technical',
    items: [
      {
        q: 'What is the difference between SOL and FIT?',
        a: 'SOL is Solana\'s native cryptocurrency. You pay entry fees in SOL and receive prizes in SOL. FIT is the FitSOL protocol access token. You stake FIT to unlock challenge participation. If fraud is detected on your account, your FIT stake is slashed. FIT is also subject to a supply-reduction mechanism: 5% of platform fees are used to buy FIT from the open market and permanently destroy it, reducing total circulating supply over time.',
      },
      {
        q: 'What exactly happens to platform fees?',
        a: 'Per 0.1 SOL entry: 80% (0.080 SOL) goes to the prize pool. The remaining 20% (0.020 SOL) is the platform fee, split as: 10% of entry (0.010 SOL) to protocol operations, 5% of entry (0.005 SOL) to buy and permanently burn FIT, 5% of entry (0.005 SOL) to FIT stakers proportional to their stake. At 1,000 challenges per day: 100 SOL volume means 20 SOL platform fees, 10 SOL ops, 5 SOL burned, 5 SOL stakers.',
      },
      {
        q: 'Does burning FIT guarantee the token price goes up?',
        a: 'No. Supply reduction through burns creates deflationary pressure on circulating supply, which is one factor that can influence market price. Token price is determined by many factors including overall market conditions, trading volume, and demand. Burning does not guarantee any specific price outcome.',
      },
      {
        q: 'How does GPS verification work technically?',
        a: 'GPS is not read directly by the smart contract — no blockchain can access real-world sensor data on its own. The FitSOL app captures GPS data on the user\'s device, applies anomaly detection checks server-side, and submits a verified attestation on-chain. The smart contract acts on that attestation after the review window. This is the standard architecture for any on-chain application that interacts with real-world data.',
      },
      {
        q: 'Are the smart contracts audited?',
        a: 'Not yet. This is clearly disclosed. An OtterSec audit has been commissioned, with the report expected in June 2026. The full audit report will be published publicly before mainnet launch. Do not contribute more than you can afford to lose before the audit is complete and published.',
      },
      {
        q: 'What is the total FIT supply and how is it distributed?',
        a: 'Total supply: 2 billion FIT. At TGE, approximately 250 million FIT (12.5%) will be in circulation. That 250M comes from: seed round TGE unlock (25% of 100M = 25M), public sale TGE unlock (20% of 200M = 40M), and liquidity provision allocation (estimated 185M). The remaining 87.5% is locked under vesting schedules or governance control. Distribution by allocation: 5% seed, 10% public sale, 20% team and advisors (4-year vest, 1-year cliff), 25% development (milestone-based), 20% liquidity (2-year lock), 20% protocol reserve (governance vote required).',
      },
    ],
  },
]

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={cn('border-b border-border last:border-0', open && 'bg-card/40')}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-start gap-4 px-5 py-4 text-left cursor-pointer hover:bg-card/30 transition-colors"
      >
        <span className="font-syne font-medium text-sm text-white leading-relaxed">{q}</span>
        <span className={cn(
          'text-green font-mono text-lg flex-shrink-0 transition-transform leading-none mt-0.5',
          open && 'rotate-45'
        )}>+</span>
      </button>
      {open && (
        <div className="px-5 pb-4">
          <p className="text-sm text-muted leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  )
}

export function FAQSection() {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <section id="faq" className="max-w-6xl mx-auto px-6 md:px-10 mb-20">
      <div className="section-eyebrow">FAQ</div>
      <h2 className="section-title mb-2">Common questions answered.</h2>
      <p className="text-muted text-sm mb-10 max-w-md leading-relaxed">
        Straightforward answers to the questions a serious participant or contributor should ask.
      </p>

      <div className="flex flex-wrap gap-2 mb-6">
        {FAQS.map((cat, i) => (
          <button
            key={cat.category}
            onClick={() => setActiveTab(i)}
            className={cn(
              'px-4 py-2 rounded text-xs font-mono border transition-colors cursor-pointer uppercase tracking-wider',
              activeTab === i
                ? 'bg-green-dim border-green text-green'
                : 'bg-transparent border-border text-muted hover:border-green hover:text-green'
            )}
          >
            {cat.category}
          </button>
        ))}
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        {FAQS[activeTab].items.map((item) => (
          <FAQItem key={item.q} q={item.q} a={item.a} />
        ))}
      </div>

      <div className="mt-4 bg-card2 border border-border rounded-xl p-6 flex flex-wrap justify-between items-center gap-4">
        <div>
          <div className="mono-label mb-1">Still have questions?</div>
        </div>
        <div className="flex gap-3 flex-wrap">
          {/* Social icons */}
        
          {[
            { t: 'Twitter',  h: SOCIAL_LINKS.twitter,  s: 'X'  },
            { t: 'Telegram', h: SOCIAL_LINKS.telegram, s: 'TG' },
            { t: 'GitHub',   h: SOCIAL_LINKS.github,   s: 'GH' },
          ].map((s) => (
            <a
              key={s.t}
              href={s.h}
              target="_blank"
              rel="noopener noreferrer"
              title={s.t}
              className="w-8 h-8 flex items-center justify-center border border-border rounded text-xs text-muted hover:border-green hover:text-green transition-colors no-underline font-mono"
            >
              {s.s}
            </a>
          ))}
        

          <a href={`mailto:${SUPPORT_EMAIL}`} className="btn-outline text-xs px-5 py-2.5">
            Email Us
          </a>
        </div>
      </div>
    </section>
  )
}
