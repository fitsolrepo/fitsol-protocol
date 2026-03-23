// src/components/sections/DisclaimerSection.tsx
// Legal language reviewed for securities framing concerns
// No "good for investors" / "price support" / "discount" language

import { RAISE_CONFIG, ENTITY } from '@/lib/constants'

export function DisclaimerSection() {
  return (
    <section className="max-w-6xl mx-auto px-6 md:px-10 mb-16">
      <div className="border border-amber/40 bg-amber/5 rounded-lg p-6">
        <div className="font-mono text-xs text-amber uppercase tracking-widest mb-3">
          Important Disclosures — Read Before Contributing
        </div>
        <div className="space-y-2 text-xs text-muted leading-relaxed">
          <p>
            <strong className="text-white">Nature of contribution:</strong> Contributing SOL
            to this round provides FIT utility tokens for accessing the FitSOL protocol.
            FIT tokens are not shares, securities, or debt instruments. This is not an
            investment contract. Consult qualified legal and financial advisors before
            participating.
          </p>
          <p>
            <strong className="text-white">Smart contract risk:</strong> Contracts are
            unaudited beta software and may contain vulnerabilities. Do not contribute
            funds you cannot afford to lose entirely. The audit planned for Q2 2026 will
            be published publicly before mainnet launch.
          </p>
          <p>
            <strong className="text-white">Regulatory status:</strong> FIT token
            classification varies by jurisdiction and is subject to ongoing legal review.
            Participation may not be lawful in all regions. {ENTITY.NAME} is a
            {' '}{ENTITY.STATE}-registered legal entity.
          </p>
          <p>
            <strong className="text-white">Round parameters:</strong> This round is
            capped at {RAISE_CONFIG.CAP_SOL.toLocaleString()} SOL. Maximum{' '}
            {RAISE_CONFIG.MAX_PER_WALLET_SOL} SOL per wallet.
            Funds are held in a 2-of-3 multisig treasury — no single party can move them unilaterally.
          </p>
          <p>
            <strong className="text-white">Verification architecture:</strong> Activity
            verification uses a hybrid off-chain/on-chain system. Off-chain processes
            validate GPS and QR data; on-chain contracts execute settlement after the
            24–48h review window. The system is not fully trustless at this stage.
          </p>
          <p>
            <strong className="text-white">No guarantees:</strong> Token utility, protocol
            functionality, and market outcomes are not guaranteed. Past performance of
            similar protocols is not indicative of future results.
          </p>
        </div>
      </div>
    </section>
  )
}
