// src/components/sections/VisionSection.tsx
// Neutral language only — no price appreciation guarantees
// Burn = supply reduction, buy pressure — not "higher value" guarantee

export function VisionSection() {
  return (
    <section id="vision" className="max-w-6xl mx-auto px-6 md:px-10 mb-20">
      <div className="bg-card2 border border-border rounded-2xl p-8 md:p-12 mb-6">
        <div className="section-eyebrow mb-3">Our Vision — In Plain English</div>
        <h2 className="section-title mb-6">What is FitSOL, really?</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {[
            {
              emoji: '🏃',
              title: 'You compete in fitness',
              body: 'Run 5K, hit the gym, walk 10,000 steps. Real physical activity — captured by the FitSOL app using GPS and gym QR codes, then verified before settlement.',
            },
            {
              emoji: '💰',
              title: 'Entry fees fund the prizes',
              body: 'Everyone pays a small entry fee in SOL. 80% of that pool becomes prize money. Winners receive real SOL — the prize pool is funded entirely by participants, not token printing.',
            },
            {
              emoji: '🔥',
              title: 'A portion of fees reduce FIT supply',
              body: '5% of every platform fee is used to buy FIT from the open market and burn it permanently. This reduces circulating supply over time. Supply reduction does not guarantee price — it is one factor among many.',
            },
          ].map((c) => (
            <div key={c.title} className="bg-card border border-border rounded-xl p-6">
              <div className="text-3xl mb-4">{c.emoji}</div>
              <h3 className="font-syne font-bold text-base mb-2">{c.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{c.body}</p>
            </div>
          ))}
        </div>

        {/* Plain English analogy */}
        <div className="bg-green-dim border border-green-mid rounded-xl p-6 mb-8">
          <div className="mono-label text-green mb-2">Think of it this way</div>
          <p className="text-white text-base leading-relaxed">
            Imagine a local running race where everyone pays a $5 entry fee. The prize pool
            is funded by all participants. The fastest runners win. Nobody is printing fake
            money to pay you — the money comes from the participants themselves.
            <span className="text-green font-medium"> FitSOL applies that same model
            on-chain, so the prize distribution rules cannot be changed by any single party
            after the challenge begins.</span>
          </p>
        </div>

        {/* Referral program callout */}
        <div className="bg-card border border-green-mid rounded-xl p-6 mb-8">
          <div className="mono-label text-green mb-2">Seed Phase Referral Program</div>
          <p className="text-white text-base leading-relaxed mb-3">
            During the seed phase, every contributor automatically receives a unique referral
            code after their deposit is confirmed. Share your code — anyone who contributes
            using your link earns +10% extra $FIT at TGE, and you earn 5% of their SOL
            deposit in $FIT at TGE.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
            {[
              { label: 'You refer someone', val: '+5% of their deposit in $FIT' },
              { label: 'They use your code', val: '+10% extra $FIT at TGE' },
              { label: '10+ referrals', val: 'Tier 2 unlocked — earn 8%' },
            ].map((r) => (
              <div key={r.label} className="bg-card2 border border-border rounded-lg px-4 py-3 text-center">
                <div className="text-xs text-muted font-mono mb-1">{r.label}</div>
                <div className="text-green font-syne font-bold text-sm">{r.val}</div>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted font-mono mt-3">
            All referral bonuses are recorded on-chain and paid in $FIT at Token Generation Event (TGE). No token exists yet — this is a pre-TGE commitment tracked in our database.
          </p>
        </div>

        {/* Why blockchain */}
        <div className="mb-8">
          <h3 className="font-syne font-bold text-lg mb-4">Why does this need to be on blockchain?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              {
                q: 'Why not just use a normal app?',
                a: 'A centralised app can change payout rules, delay payments, or take a larger cut at any time. A smart contract executes the rules as written — once deployed, no single party can alter prize distribution logic.',
              },
              {
                q: 'Why Solana specifically?',
                a: 'Solana processes transactions in approximately 400ms with fees under $0.01. For a fitness app with frequent small transactions, Solana is currently the most practical chain for this use case.',
              },
              {
                q: 'What is FIT token for?',
                a: 'FIT is a protocol access token. You stake 1,000 FIT to participate in challenges. If fraud is detected, your stake is slashed. This creates an economic cost for cheating that scales with the value of the token.',
              },
              {
                q: 'What makes FitSOL different from earlier fitness-crypto platforms?',
                a: 'Earlier platforms funded rewards by continuously minting new tokens. When token prices dropped, rewards became worthless — a self-reinforcing collapse. FitSOL funds prizes from real entry fees. If participation drops, prizes drop proportionally. There is no artificial floor and no ongoing emissions.',
              },
            ].map((item) => (
              <div key={item.q} className="bg-card border border-border rounded-lg p-5">
                <div className="font-syne font-bold text-sm mb-2 text-white">{item.q}</div>
                <p className="text-xs text-muted leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Market context */}
        <div className="border-t border-border pt-6">
          <h3 className="font-syne font-bold text-lg mb-4">Market context</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: 'Global fitness app market', value: '$20B+', note: 'Growing approximately 17% annually. On-chain fitness is a small fraction of this.' },
              { label: 'Category precedent', value: 'Established', note: 'Earlier platforms demonstrated that users will pay to compete in fitness challenges on-chain.' },
              { label: 'Token emissions required', value: '0%', note: 'Prize pools funded entirely from participant fees — no ongoing token issuance to sustain rewards.' },
            ].map((s) => (
              <div key={s.label} className="text-center p-4 bg-card border border-border rounded-lg">
                <div className="font-syne font-black text-3xl text-green mb-1">{s.value}</div>
                <div className="font-syne font-bold text-sm mb-1">{s.label}</div>
                <div className="text-xs text-muted leading-relaxed">{s.note}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="bg-card border border-danger/30 rounded-xl p-6">
          <div className="font-mono text-xs text-danger uppercase tracking-wider mb-3">
            How earlier fitness-crypto platforms collapsed
          </div>
          <div className="space-y-2">
            {[
              'They funded user rewards by continuously minting new tokens',
              'Token price decline reduced reward value for users',
              'Falling rewards led to user exits, further price pressure',
              'The model required constant new buyers to sustain existing rewards',
              'Prize pool sustainability depended on token price',
            ].map((i) => (
              <div key={i} className="flex gap-2 text-sm text-muted">
                <span className="text-danger flex-shrink-0">x</span>{i}
              </div>
            ))}
          </div>
        </div>
        <div className="bg-card border border-green-mid rounded-xl p-6">
          <div className="mono-label text-green mb-3">How FitSOL is structured differently</div>
          <div className="space-y-2">
            {[
              'Prize pools funded entirely from participant entry fees',
              'If participation drops, prizes drop — no artificial floor',
              'Activity data verified by app, attested on-chain, settled by smart contract',
              'Winners receive SOL after the verification window closes',
              'Revenue model functions regardless of FIT token price',
            ].map((i) => (
              <div key={i} className="flex gap-2 text-sm text-muted">
                <span className="text-green flex-shrink-0">+</span>{i}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
