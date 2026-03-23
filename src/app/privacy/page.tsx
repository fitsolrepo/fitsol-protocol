// src/app/privacy/page.tsx
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ENTITY } from '@/lib/constants'
import { EMAILS } from '@/lib/constants'

const PRIVACY_EMAIL = EMAILS.privacy;

export default function PrivacyPage() {
  return (
    <main>
      <Navbar />
      <div className="max-w-3xl mx-auto px-6 md:px-10 py-16">
        <div className="mono-label mb-3">Legal</div>
        <h1 className="font-syne font-black text-4xl mb-2" style={{ letterSpacing: '-1.5px' }}>
          Privacy Policy
        </h1>
        <p className="text-muted text-sm font-mono mb-10">Last Updated: March 2026</p>

        <div className="space-y-8 text-sm text-muted leading-relaxed">

          <section>
            <h2 className="font-syne font-bold text-lg text-white mb-3">1. Information We Collect</h2>
            <p className="mb-3">We collect minimal data necessary to operate the platform:</p>
            <ul className="space-y-2">
              {[
                'Wallet addresses — public blockchain data required to process contributions and verify challenge participation.',
                'Transaction data — on-chain transaction signatures and amounts, publicly visible on Solana blockchain.',
                'Referral data — wallet addresses, referral codes, deposit amounts, and referral relationships are stored in our database to track seed phase referral program rewards. This data is used solely to calculate and distribute $FIT bonuses at TGE.',
                'Email address — optional, collected only if you sign up for updates or contact us.',
                'KYC data — collected by our third-party provider Synaps.io for team identity verification only. We do not collect KYC data from contributors.',
              ].map((i) => (
                <li key={i} className="flex gap-2"><span className="text-green flex-shrink-0">—</span>{i}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="font-syne font-bold text-lg text-white mb-3">2. Blockchain Data</h2>
            <p>
              All blockchain transactions are permanently public. Your Solana wallet address and
              full transaction history are visible to anyone via Solscan or any Solana blockchain
              explorer. We have no ability to delete or obscure on-chain data.
            </p>
          </section>

          <section>
            <h2 className="font-syne font-bold text-lg text-white mb-3">3. How We Use Data</h2>
            <ul className="space-y-2">
              {[
                'To record FIT token allocations for contributing wallets.',
                'To verify challenge participation and distribute prizes.',
                'To track referral relationships and calculate referral bonuses for distribution at TGE.',
                'To send product updates if you have opted in via email.',
                'To comply with applicable legal requirements.',
              ].map((i) => (
                <li key={i} className="flex gap-2"><span className="text-green flex-shrink-0">—</span>{i}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="font-syne font-bold text-lg text-white mb-3">4. Data Sharing</h2>
            <p>
              We do not sell your personal data to third parties. We may share data with service
              providers (Supabase for database including referral tracking, Synaps.io for team KYC)
              who are contractually bound to protect it. We may disclose data if required by law.
            </p>
          </section>

          <section>
            <h2 className="font-syne font-bold text-lg text-white mb-3">5. Data Security</h2>
            <p>
              We use industry-standard security measures including encrypted databases and
              environment variable protection for API keys. No method of transmission over the
              internet is 100% secure. We cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="font-syne font-bold text-lg text-white mb-3">6. Your Rights</h2>
            <p>
              You may request deletion of any off-chain personal data (email, referral records, etc.)
              by contacting us. Note that deleting referral records before TGE will forfeit any
              pending referral bonus. Blockchain data cannot be deleted. To exercise your rights,
              email:{' '}
              <a href={`mailto:${PRIVACY_EMAIL}`} className="text-green hover:underline">
                {PRIVACY_EMAIL}
              </a>
            </p>
          </section>

          <section>
            <h2 className="font-syne font-bold text-lg text-white mb-3">7. Contact</h2>
            <p>
              {ENTITY.NAME} · {ENTITY.STATE}<br />
              <a href={`mailto:${PRIVACY_EMAIL}`} className="text-green hover:underline">
                {PRIVACY_EMAIL}
              </a>
            </p>
          </section>
        </div>

        <div className="mt-10 pt-8 border-t border-border flex gap-4">
          <a href="/" className="btn-outline text-xs px-5 py-2.5">Back to Homepage</a>
          <a href="/terms" className="btn-outline text-xs px-5 py-2.5">Terms of Service</a>
        </div>
      </div>
      <Footer />
    </main>
  )
}
