// src/app/whitepaper/page.tsx
// Canonical fee model: 80% prizes / 20% platform (10% ops + 5% burn + 5% yield)
// GPS: app-verified, attested on-chain, settled by smart contract
// No price guarantee language

import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ENTITY } from '@/lib/constants'

export default function WhitepaperPage() {
  return (
    <main>
      <Navbar />
      <article className="max-w-3xl mx-auto px-6 md:px-10 py-16">

        {/* Header */}
        <div className="border-b border-border pb-8 mb-8">
          <div className="mono-label text-green mb-3">FitSOL Whitepaper — Version 1.4 · March 2026</div>
          <h1 className="font-syne font-black text-5xl mb-4" style={{ letterSpacing: '-2px' }}>
            FitSOL Protocol
          </h1>
          <p className="text-muted text-lg font-light mb-6">
            Compete-to-earn fitness on Solana. Participant-funded prize pools.
            Fee-based token burn mechanics. Zero token emissions required.
          </p>
          <div className="flex flex-wrap gap-3 items-center">
            <a href="/whitepaper.pdf" download="FitSOL-Whitepaper-v1.4.pdf"
              className="btn-primary text-xs px-5 py-2.5 flex items-center gap-2">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Download PDF
            </a>
            <a href="/#contribute" className="btn-ghost-green text-xs px-5 py-2.5">
              View Founding Round
            </a>
            <span className="font-mono text-xs text-muted">{ENTITY.NAME} · {ENTITY.STATE}</span>
          </div>
        </div>

        <div className="space-y-12 text-[15px]">

          {/* 1 */}
          <section>
            <h2 className="font-syne font-bold text-2xl mb-4">1. Executive Summary</h2>
            <p className="text-muted leading-relaxed">
              FitSOL is a fitness competition protocol on Solana. Participants stake FIT tokens
              to access challenges, pay SOL entry fees to compete, and receive prizes from
              participant-funded pools. The protocol uses two tokens: SOL for entry fees and
              prize payouts, FIT for access rights and governance. All prize pools are funded
              entirely by participant entry fees — no token emissions are required to sustain rewards.
            </p>
          </section>

          {/* 2 */}
          <section>
            <h2 className="font-syne font-bold text-2xl mb-4">2. Problem Statement</h2>
            <p className="text-muted leading-relaxed mb-4">
              Previous fitness-crypto platforms funded user rewards by continuously minting new
              tokens. When token prices declined, reward values fell, users exited, and prices
              declined further — a self-reinforcing cycle. The fundamental issue was that reward
              sustainability depended on continuous token price appreciation and new buyer inflow.
            </p>
            <p className="text-muted leading-relaxed">
              FitSOL uses participant entry fees as the sole source of prize funding. If 100 participants
              each pay 0.1 SOL, the prize pool is 0.08 SOL x 100 = 8 SOL, regardless of FIT token
              price. If participation drops, prizes drop proportionally. The system is self-regulating
              and does not require any artificial price support to function.
            </p>
          </section>

          {/* 3 */}
          <section>
            <h2 className="font-syne font-bold text-2xl mb-4">3. Fee Structure — Canonical Model</h2>
            <p className="text-muted leading-relaxed mb-4">
              Every section of this document and the protocol website uses the following single model.
              There is one fee structure, applied consistently everywhere.
            </p>
            <div className="bg-card border border-border rounded-lg overflow-hidden mb-4">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left px-5 py-3 mono-label">Allocation</th>
                    <th className="text-right px-5 py-3 mono-label">% of entry</th>
                    <th className="text-right px-5 py-3 mono-label">SOL (per 0.1 entry)</th>
                    <th className="text-right px-5 py-3 mono-label">Recipient</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr>
                    <td className="px-5 py-3 text-muted">Prize pool (1st: 60%, 2nd: 15%, 3rd: 5%)</td>
                    <td className="px-5 py-3 text-right font-mono text-green font-medium">80%</td>
                    <td className="px-5 py-3 text-right font-mono text-green">0.080 SOL</td>
                    <td className="px-5 py-3 text-right text-muted">Winners</td>
                  </tr>
                  <tr>
                    <td className="px-5 py-3 text-muted">Operations</td>
                    <td className="px-5 py-3 text-right font-mono text-white">10%</td>
                    <td className="px-5 py-3 text-right font-mono text-white">0.010 SOL</td>
                    <td className="px-5 py-3 text-right text-muted">Protocol treasury</td>
                  </tr>
                  <tr>
                    <td className="px-5 py-3 text-muted">FIT buy + permanent burn</td>
                    <td className="px-5 py-3 text-right font-mono text-green">5%</td>
                    <td className="px-5 py-3 text-right font-mono text-green">0.005 SOL</td>
                    <td className="px-5 py-3 text-right text-muted">Open market then burn</td>
                  </tr>
                  <tr>
                    <td className="px-5 py-3 text-muted">Staker yield</td>
                    <td className="px-5 py-3 text-right font-mono text-green">5%</td>
                    <td className="px-5 py-3 text-right font-mono text-green">0.005 SOL</td>
                    <td className="px-5 py-3 text-right text-muted">FIT stakers</td>
                  </tr>
                  <tr className="bg-card2">
                    <td className="px-5 py-3 text-white font-medium">Platform total</td>
                    <td className="px-5 py-3 text-right font-mono text-white font-medium">20%</td>
                    <td className="px-5 py-3 text-right font-mono text-white font-medium">0.020 SOL</td>
                    <td className="px-5 py-3 text-right text-muted">Protocol</td>
                  </tr>
                  <tr className="bg-green-dim">
                    <td className="px-5 py-3 text-green font-medium">Total</td>
                    <td className="px-5 py-3 text-right font-mono text-green font-medium">100%</td>
                    <td className="px-5 py-3 text-right font-mono text-green font-medium">0.100 SOL</td>
                    <td className="px-5 py-3 text-right text-muted"></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted font-mono">
              At 1,000 challenges/day: 100 SOL entry volume means 20 SOL platform fees,
              10 SOL ops, 5 SOL burned, 5 SOL stakers.
            </p>
          </section>

          {/* 4 */}
          <section>
            <h2 className="font-syne font-bold text-2xl mb-4">4. Verification Architecture</h2>
            <p className="text-muted leading-relaxed mb-4">
              Blockchain smart contracts cannot directly read GPS sensor data — no blockchain
              can access real-world physical data on its own. FitSOL uses a three-layer
              architecture:
            </p>
            <div className="space-y-3">
              {[
                ['App layer (off-chain)', 'The FitSOL mobile app captures GPS data during challenges. Server-side anomaly detection checks speed consistency and path plausibility. Gym challenges use time-limited QR codes that rotate every 60 seconds, preventing reuse. Community dispute submissions are also collected here.'],
                ['Attestation (on-chain bridge)', 'After the verification window, verified results are submitted as a cryptographic attestation on-chain. This bridges the off-chain verification layer to the smart contract settlement layer.'],
                ['Smart contract settlement (on-chain)', 'Once the 24-48h verification window closes and no unresolved disputes remain, the smart contract executes automatically: distributes SOL to verified winners, applies slashing to confirmed fraudulent stakes, purchases and burns FIT, and distributes staker yield. No human approval is required at the settlement stage.'],
              ].map(([t, d]) => (
                <div key={t as string} className="bg-card border border-border rounded p-4 flex gap-4">
                  <div className="font-mono text-xs text-green min-w-52 flex-shrink-0 pt-0.5">{t as string}</div>
                  <div className="text-sm text-muted leading-relaxed">{d as string}</div>
                </div>
              ))}
            </div>
          </section>

          {/* 5 */}
          <section>
            <h2 className="font-syne font-bold text-2xl mb-4">5. Anti-Cheat Architecture</h2>
            <div className="space-y-3">
              {[
                ['Device fingerprinting', 'Hardware-level binding prevents multi-account farming from a single device.'],
                ['GPS anomaly detection', 'Velocity and path consistency checks. Physically impossible speeds or teleportation are flagged automatically.'],
                ['QR code rotation', 'Gym QR codes rotate every 60 seconds. Screenshots and code sharing become immediately invalid.'],
                ['Economic stake deterrent', '1,000 FIT minimum stake with 7-day lockup creates a financial cost that makes cheating economically irrational for small prizes.'],
                ['Graduated slashing', 'Warning for first anomaly. Partial slash for confirmed irregularity. 100% slash for verified repeated fraud. Enforced by smart contract.'],
              ].map(([t, d]) => (
                <div key={t as string} className="bg-card border border-border rounded p-4 flex gap-4">
                  <div className="font-mono text-xs text-green min-w-44 flex-shrink-0 pt-0.5">{t as string}</div>
                  <div className="text-sm text-muted">{d as string}</div>
                </div>
              ))}
            </div>
          </section>

          {/* 6 */}
          <section>
            <h2 className="font-syne font-bold text-2xl mb-4">6. Token Allocation</h2>
            <div className="bg-card border border-border rounded-lg overflow-hidden mb-4">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left px-5 py-3 mono-label">Allocation</th>
                    <th className="text-right px-5 py-3 mono-label">%</th>
                    <th className="text-right px-5 py-3 mono-label">Vesting</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    ['Seed Round',       '5%',  '25% at TGE, 75% linear over 12 months'],
                    ['Public Sale',      '10%', '20% at TGE, 80% linear over 6 months'],
                    ['Team & Advisors',  '20%', '4-year vest, 1-year cliff (zero in year one)'],
                    ['Development',      '25%', 'Milestone-based unlock'],
                    ['Liquidity',        '20%', '2-year lock post-TGE'],
                    ['Protocol Reserve', '20%', 'Governance vote required to unlock'],
                  ].map(([a, p, v]) => (
                    <tr key={a as string}>
                      <td className="px-5 py-3 text-muted">{a as string}</td>
                      <td className="px-5 py-3 text-right font-mono text-white">{p as string}</td>
                      <td className="px-5 py-3 text-right font-mono text-xs text-muted">{v as string}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted font-mono">
              TGE circulating supply approximately 250M FIT (12.5%): seed TGE unlock 25M + public sale
              TGE unlock 40M + liquidity provision approximately 185M.
            </p>
          </section>

          {/* 7 */}
          <section>
            <h2 className="font-syne font-bold text-2xl mb-4">7. Legal & Entity</h2>
            <p className="text-muted leading-relaxed mb-3">
              FitSOL Protocol LLC is registered in Wyoming, USA under Wyoming's DAO LLC
              statute (W.S. 17-31-101 et seq.). All contributions are held in a 2-of-3
              Squads multisig wallet. No single party can unilaterally move treasury funds.
            </p>
            <p className="text-muted leading-relaxed mb-3">
              FIT is designed as a utility token for protocol access. Legal classification
              of digital tokens varies by jurisdiction and is subject to ongoing regulatory
              development. Nothing in this document constitutes an offer of securities,
              investment advice, or a promise of financial return. Consult qualified legal
              and financial advisors before making any contribution.
            </p>
          </section>

          {/* 8 */}
          <section>
            <h2 className="font-syne font-bold text-2xl mb-4">8. Risk Disclosure</h2>
            <div className="bg-amber/5 border border-amber/40 rounded-lg p-5 space-y-3">
              {[
                'Unaudited contracts: Smart contracts are unaudited. The OtterSec audit is expected June 2026. Do not contribute funds you cannot afford to lose entirely.',
                'Regulatory uncertainty: FIT token classification varies by jurisdiction. Participation may not be lawful in all regions. You are responsible for your own compliance.',
                'Off-chain verification: The verification layer includes off-chain components that require trust in FitSOL\'s app and server infrastructure during the early phase.',
                'Market risk: Token values can go to zero. Supply-reduction mechanisms do not guarantee any price outcome.',
                'Platform risk: FitSOL is a pre-launch protocol. There is no guarantee the protocol reaches mainnet.',
                'Physical risk: Fitness challenges carry inherent injury risk. Consult a medical professional before participating.',
              ].map((r) => (
                <p key={r} className="text-xs text-muted leading-relaxed flex gap-2">
                  <span className="text-amber flex-shrink-0">—</span>{r}
                </p>
              ))}
            </div>
          </section>

          {/* 9 — NEW: Referral Program */}
          <section>
            <h2 className="font-syne font-bold text-2xl mb-4">9. Seed Phase Referral Program</h2>
            <p className="text-muted leading-relaxed mb-4">
              To incentivise community growth during the seed phase, FitSOL operates a referral
              program that rewards contributors for bringing in new participants. The program
              runs entirely during the seed phase — before the $FIT token is created or tradable.
              All rewards are denominated in $FIT and paid at Token Generation Event (TGE).
            </p>

            <div className="bg-card border border-border rounded-lg overflow-hidden mb-4">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left px-5 py-3 mono-label">Parameter</th>
                    <th className="text-right px-5 py-3 mono-label">Value</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    ['Entry fee (seed phase challenges)', '$5 per challenge'],
                    ['Referrer reward — Tier 1 (1-9 referrals)', '5% of referee SOL deposit in $FIT at TGE'],
                    ['Referrer reward — Tier 2 (10+ referrals)', '8% of referee SOL deposit in $FIT at TGE'],
                    ['Referee bonus', '+10% extra $FIT on their own allocation at TGE'],
                    ['Code format', 'FIT-XXXXXX (auto-generated from wallet address)'],
                    ['When code is issued', 'Automatically after on-chain deposit confirmed'],
                    ['When rewards are paid', 'At TGE — no $FIT exists before then'],
                  ].map(([a, v]) => (
                    <tr key={a as string}>
                      <td className="px-5 py-3 text-muted">{a as string}</td>
                      <td className="px-5 py-3 text-right font-mono text-white text-xs">{v as string}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="space-y-3">
              {[
                ['How codes work', 'Upon confirmed SOL deposit, the system generates a unique referral code tied permanently to the contributor\'s wallet address. This code is stored in our database alongside their deposit amount. The contributor can share their referral link at any time.'],
                ['How rewards are calculated', 'When a new contributor uses a referral code, the system records the relationship. The referrer earns 5% of the new deposit (in SOL equivalent), which is converted to $FIT at the TGE price and added to their allocation. If the referrer has 10 or more referrals, the rate upgrades to 8% going forward.'],
                ['No token required', 'Because $FIT does not exist during the seed phase, all referral rewards are tracked off-chain in a Supabase database and settled on-chain at TGE. The commitment is documented publicly in this whitepaper.'],
                ['Referral reward cap', 'Referral rewards are paid from within the existing seed round token allocation (5% of total supply = 100M FIT). No new tokens are created to fund referral rewards.'],
              ].map(([t, d]) => (
                <div key={t as string} className="bg-card border border-border rounded p-4 flex gap-4">
                  <div className="font-mono text-xs text-green min-w-44 flex-shrink-0 pt-0.5">{t as string}</div>
                  <div className="text-sm text-muted leading-relaxed">{d as string}</div>
                </div>
              ))}
            </div>
          </section>

        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-wrap gap-3">
          <a href="/" className="btn-outline text-xs px-5 py-2.5">Back to Homepage</a>
          <a href="/whitepaper.pdf" download="FitSOL-Whitepaper-v1.4.pdf"
            className="btn-primary text-xs px-5 py-2.5 flex items-center gap-2">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Download PDF
          </a>
        </div>
      </article>
      <Footer />
    </main>
  )
}
