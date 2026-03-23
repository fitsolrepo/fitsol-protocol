// src/app/terms/page.tsx
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ENTITY } from '@/lib/constants'
import { EMAILS } from '@/lib/constants'

const LEGAL_EMAIL = EMAILS.legal;

export default function TermsPage() {
  return (
    <main>
      <Navbar />
      <div className="max-w-3xl mx-auto px-6 md:px-10 py-16">
        <div className="mono-label mb-3">Legal</div>
        <h1 className="font-syne font-black text-4xl mb-2" style={{ letterSpacing: '-1.5px' }}>
          Terms of Service
        </h1>
        <p className="text-muted text-sm font-mono mb-10">Last Updated: March 2026</p>

        <div className="space-y-8 text-sm text-muted leading-relaxed">

          <section>
            <h2 className="font-syne font-bold text-lg text-white mb-3">1. Agreement to Terms</h2>
            <p>
              By accessing or using the FitSOL Protocol platform, website, or any associated
              services, you agree to be bound by these Terms of Service and all applicable laws
              and regulations. If you do not agree with any part of these terms, you may not
              access the platform. {ENTITY.NAME} ({ENTITY.STATE}) operates this platform.
            </p>
          </section>

          <section>
            <h2 className="font-syne font-bold text-lg text-white mb-3">2. Platform Description</h2>
            <p className="mb-3">
              FitSOL is a pre-launch, experimental compete-to-earn fitness protocol being built
              on the Solana blockchain. The protocol is not yet live on mainnet. This website
              operates as a seed round contribution platform and informational resource only.
            </p>
            <p>
              When launched, participants will be able to stake FIT tokens to access fitness
              challenges and compete for participant-funded prizes denominated in SOL. All
              challenge prize pools are funded entirely by participant entry fees — no token
              emissions are used to fund rewards. Smart contracts are currently unaudited.
              Use at your own risk.
            </p>
          </section>

          <section>
            <h2 className="font-syne font-bold text-lg text-white mb-3">3. Risk Acknowledgment</h2>
            <p className="mb-3">By using this platform you explicitly acknowledge and accept:</p>
            <ul className="space-y-2 list-none">
              {[
                'Cryptocurrency contributions carry extremely high risk. Token values can go to zero.',
                'Smart contracts are unaudited beta software and may contain critical vulnerabilities.',
                'You may lose your entire contribution. Never contribute more than you can afford to lose entirely.',
                'This is not financial advice. Nothing on this platform constitutes investment advice or a solicitation of funds.',
                'Regulatory status of FIT tokens varies by jurisdiction. You are solely responsible for compliance in your region.',
                'The protocol may not reach mainnet. There is no guarantee of launch, token tradability, or any specific outcome.',
                'Physical fitness challenges carry inherent injury risk. You participate at your own physical risk.',
              ].map((r) => (
                <li key={r} className="flex gap-2">
                  <span className="text-amber flex-shrink-0">—</span>{r}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="font-syne font-bold text-lg text-white mb-3">4. Eligibility</h2>
            <p>
              You must be at least 18 years old to use this platform. By accessing FitSOL you
              represent and warrant that you meet this age requirement, that you are not located
              in a jurisdiction where participation is prohibited, and that your use complies
              with all applicable local laws and regulations.
            </p>
          </section>

          <section>
            <h2 className="font-syne font-bold text-lg text-white mb-3">5. Contribution Terms</h2>
            <p className="mb-3">
              The following contribution limits apply to the FitSOL seed round and are enforced
              at the protocol level. These limits cannot be bypassed under any circumstances:
            </p>
            <ul className="space-y-2 list-none mb-4">
              {[
                'Minimum contribution: 1 SOL per transaction.',
                'Maximum contribution: 50 SOL per wallet address. This is a hard protocol cap — contributions exceeding 50 SOL will be rejected by the system.',
                'The 50 SOL per wallet limit applies across all contributions from the same wallet address combined.',
                'Contributions are non-refundable once confirmed on-chain.',
                'All contributions go directly to a 2-of-3 Squads multisig treasury. No single party can move funds unilaterally.',
              ].map((r) => (
                <li key={r} className="flex gap-2">
                  <span className="text-green flex-shrink-0">—</span>{r}
                </li>
              ))}
            </ul>
            <p>
              FIT token allocations are calculated at the time of contribution based on the
              active tier rate. 25% of your allocation becomes accessible at TGE, and the
              remaining 75% unlocks linearly over 12 months. These vesting terms are fixed
              at contribution time and will not be altered retrospectively.
            </p>
          </section>

          <section>
            <h2 className="font-syne font-bold text-lg text-white mb-3">6. FIT Token Utility</h2>
            <p className="mb-3">
              FIT tokens are designed solely as utility tokens for accessing the FitSOL protocol.
              They do not represent equity, ownership, dividend rights, profit-sharing rights,
              or any other financial instrument. Holding FIT tokens does not confer any ownership
              rights against {ENTITY.NAME} or its members.
            </p>
          </section>

          <section>
            <h2 className="font-syne font-bold text-lg text-white mb-3">7. Seed Phase Referral Program</h2>
            <p className="mb-3">
              During the seed phase, contributors who deposit SOL are automatically assigned
              a unique referral code tied to their wallet address. The referral program operates
              as follows:
            </p>
            <ul className="space-y-2 list-none mb-3">
              {[
                'Referrers earn 5% of each referred deposit value in $FIT at TGE (upgrading to 8% at 10+ referrals).',
                'Referees who use a valid referral code receive a +10% bonus on their own FIT allocation at TGE.',
                'All referral relationships and bonus amounts are tracked off-chain in our database.',
                'Referral rewards are settled on-chain at TGE from within the existing seed round token allocation.',
                'No additional tokens are created to fund referral rewards.',
              ].map((r) => (
                <li key={r} className="flex gap-2">
                  <span className="text-green flex-shrink-0">—</span>{r}
                </li>
              ))}
            </ul>
            <p className="text-xs font-mono text-muted border border-border rounded p-3">
              Important: Referral bonuses are a best-efforts commitment by {ENTITY.NAME}.
              They are not a legally binding financial instrument. If the protocol does not
              reach TGE, referral bonuses cannot be distributed. By participating in the
              referral program you acknowledge this risk.
            </p>
          </section>

          <section>
            <h2 className="font-syne font-bold text-lg text-white mb-3">8. Smart Contract Operations</h2>
            <p className="mb-3">
              The platform is provided as is without warranty of any kind. {ENTITY.NAME}
              makes no representations regarding uptime, security, or fitness for any purpose.
            </p>
            <p className="mb-3">
              Once deployed, the core prize distribution logic of FitSOL smart contracts is
              designed to execute as written — no single party can alter prize distribution
              rules mid-challenge. However, {ENTITY.NAME} reserves the right to pause protocol
              operations for security reasons, deploy upgrades to fix vulnerabilities, or
              deprecate contracts in the event of critical security risks. Any such action
              will be communicated publicly.
            </p>
            <p>
              This operational flexibility applies to protocol maintenance only — it does not
              permit retroactive alteration of prize distributions already in progress or
              completed.
            </p>
          </section>

          <section>
            <h2 className="font-syne font-bold text-lg text-white mb-3">9. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, {ENTITY.NAME} and its members shall not
              be liable for any indirect, incidental, special, or consequential damages arising
              from your use of the platform, including loss of funds due to smart contract bugs,
              hacks, exploits, or market movements.
            </p>
          </section>

          <section>
            <h2 className="font-syne font-bold text-lg text-white mb-3">10. Governing Law</h2>
            <p>
              These terms are governed by the laws of the State of Wyoming, United States,
              without regard to its conflict of law provisions.
            </p>
          </section>

          <section>
            <h2 className="font-syne font-bold text-lg text-white mb-3">11. Contact</h2>
            <p>
              For legal inquiries:{' '}
              <a href={`mailto:${LEGAL_EMAIL}`} className="text-green hover:underline">
                {LEGAL_EMAIL}
              </a>
            </p>
          </section>

        </div>

        <div className="mt-10 pt-8 border-t border-border flex gap-4">
          <a href="/" className="btn-outline text-xs px-5 py-2.5">Back to Homepage</a>
          <a href="/privacy" className="btn-outline text-xs px-5 py-2.5">Privacy Policy</a>
        </div>
      </div>
      <Footer />
    </main>
  )
}
