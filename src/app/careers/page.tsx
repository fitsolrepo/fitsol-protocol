// src/app/careers/page.tsx
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { SOCIAL_LINKS } from '@/lib/constants'
import { EMAILS } from '@/lib/constants'

const DEADLINE = process.env.NEXT_PUBLIC_DEADLINE || 'April 18, 2026';
const APPLY_EMAIL = EMAILS.careers;

const ROLES = [
  {
    id: 'marketing',
    title: 'Head of Marketing',
    type: 'Full-time',
    location: 'Remote — Worldwide',
    rate: '$70,000 – $100,000 / year + Token Equity',
    experience: '5+ years',
    priority: true,
    department: 'Growth',
    posted: 'March 22, 2026',
    deadline: DEADLINE,
    about: `FitSOL is building the first on-chain fitness competition protocol on Solana. Participants stake FIT tokens, enter GPS-verified fitness challenges, and win from participant-funded prize pools. We are raising our founding round now and targeting mainnet launch in Q3 2026.

We are looking for a Head of Marketing to join as a founding team member. You will shape how FitSOL is introduced to the world — from seed round awareness through token launch and beyond. This is not a corporate marketing role. You will build from zero, move fast, and have direct input on product positioning.`,
    responsibilities: [
      'Own the end-to-end go-to-market strategy for the FitSOL token launch (Q3 2026)',
      'Build and manage relationships with crypto and fitness influencers and KOLs',
      'Grow FitSOL communities across Twitter, and Telegram from zero to 50,000+ members',
      'Create and execute a weekly content calendar across all social channels',
      'Plan and execute paid and organic campaigns around the seed round and TGE',
      'Coordinate PR outreach to crypto and fitness media outlets',
      'Track and report on community growth, engagement, and conversion metrics weekly',
      'Collaborate with the UI/UX designer on marketing assets and brand consistency',
    ],
    requirements: [
      '5+ years of marketing experience, with at least 2 years in crypto, DeFi, or Web3',
      'Proven track record of growing a crypto community from early stage',
      'Existing network of crypto or fitness influencers and KOLs',
      'Experience managing token launch campaigns or IDO/ICO marketing',
      'Strong written English — you will be writing content daily',
      'Comfortable working in a fast-moving early-stage environment',
      'Deep understanding of Twitter, and Telegram community dynamics',
    ],
    nice: [
      'Personal interest in fitness or health technology',
      'Experience with Solana ecosystem projects',
      'Network in the fitness app or wearable tech space',
    ],
    compensation: [
      'Competitive salary: $70,000 – $100,000 per year based on experience',
      'Token equity: negotiated allocation with standard vesting schedule',
      'Fully remote — work from anywhere in the world',
      'Founding team status — direct access to protocol decisions',
    ],
    submit: [
      'Your CV / Resume (PDF preferred)',
      'A cover letter explaining why you are the right person for this role',
      'Links to 2–3 communities or campaigns you have built or led',
      'LinkedIn profile URL',
      'References: at least 2 professional references with contact details',
    ],
  },
  {
    id: 'partnerships',
    title: 'Fitness Partnerships Manager',
    type: 'Part-time',
    location: 'Remote — Worldwide',
    rate: '$40,000 – $60,000 / year (pro-rated part-time) + Token Equity',
    experience: '3+ years',
    priority: false,
    department: 'Business Development',
    posted: 'March 22, 2026',
    deadline: DEADLINE,
    about: `FitSOL rewards real physical activity. Gym challenges are verified via time-limited QR codes placed at partner locations. Running and walking challenges are GPS-verified via the FitSOL mobile app.

We are looking for a Fitness Partnerships Manager to build the gym partner network and manage wearable device integrations that make FitSOL challenges possible in the real world. This role bridges the crypto protocol and the traditional fitness industry.`,
    responsibilities: [
      'Identify, approach, and onboard gym and fitness studio partners for QR code challenge integration',
      'Negotiate partnership agreements with gym chains, independent gyms, and fitness studios',
      'Manage ongoing partner relationships — ensure QR codes are maintained and challenges run smoothly',
      'Explore and develop wearable device data integration partnerships (Garmin, Apple Health, Fitbit, etc.)',
      'Represent FitSOL at fitness industry events and conferences',
      'Build a pipeline of 50+ gym partners ahead of mainnet launch',
      'Report weekly on partner pipeline, onboarding status, and relationship health',
    ],
    requirements: [
      '3+ years of B2B sales, partnerships, or business development experience',
      'Existing relationships in the gym, fitness, or wellness industry preferred',
      'Strong negotiation and relationship management skills',
      'Self-starter — able to build a partner pipeline independently',
      'Comfortable explaining blockchain concepts to non-crypto audiences',
    ],
    nice: [
      'Experience in fitness technology or health app partnerships',
      'Existing network of gym owners or fitness studio operators',
      'Understanding of crypto or willingness to learn quickly',
    ],
    compensation: [
      'Competitive part-time rate: $40,000 – $60,000 per year pro-rated',
      'Token equity: negotiated allocation with standard vesting schedule',
      'Flexible hours — results focused, not hours focused',
      'Path to full-time as the partner network grows',
    ],
    submit: [
      'Your CV / Resume (PDF preferred)',
      'A cover letter describing your relevant fitness industry experience',
      'Examples of partnerships you have negotiated and closed',
      'LinkedIn profile URL',
      'References: at least 2 professional references with contact details',
    ],
  },
  {
    id: 'community',
    title: 'Community Manager',
    type: 'Full-time',
    location: 'Remote — Worldwide',
    rate: '$30,000 – $50,000 / year + Token Equity',
    experience: '2+ years',
    priority: false,
    department: 'Community',
    posted: 'March 22, 2026',
    deadline: DEADLINE,
    about: `Community is the heartbeat of every successful crypto protocol. FitSOL will live or die by the quality of its community — the athletes, contributors, and supporters who believe in on-chain fitness.

We are looking for a Community Manager who will be the daily face of FitSOL across Telegram, and Twitter. You will be the first person contributors and athletes interact with. You will set the tone, answer questions, resolve conflicts, and keep the community growing and engaged.`,
    responsibilities: [
      'Daily moderation and management of FitSOL Telegram group',
      'Respond to community questions, support requests, and contributor inquiries within 24 hours',
      'Organize and host AMAs, community events, fitness challenges, and contests',
      'Monitor and report on community sentiment, common concerns, and feature requests weekly',
      'Coordinate with marketing on announcements, campaigns, and content distribution',
      'Escalate technical bugs, fraud reports, and serious complaints to the core team',
      'Maintain a positive, inclusive, and scam-free community environment at all times',
    ],
    requirements: [
      '2+ years of community management experience in crypto, gaming, or technology',
      'Hands-on experience moderating active Telegram communities',
      'Excellent written English — clear, friendly, and professional',
      'Calm and effective under pressure — crypto communities move fast and emotions run high',
      'Available to monitor communities across multiple time zones',
      'Understanding of basic crypto concepts — wallets, tokens, transactions',
    ],
    nice: [
      'Personal interest in fitness or competitive sport',
      'Experience with community analytics tools',
      'Multilingual skills for non-English community segments',
    ],
    compensation: [
      'Competitive salary: $30,000 – $50,000 per year based on experience',
      'Token equity: negotiated allocation with standard vesting schedule',
      'Fully remote — flexible working hours',
      'Direct line to founding team — your community insights shape the product',
    ],
    submit: [
      'Your CV / Resume (PDF preferred)',
      'A cover letter explaining your community management philosophy',
      'Links to 1–2 Telegram groups you have managed',
      'LinkedIn profile URL',
      'References: at least 2 professional references with contact details',
    ],
  },
  {
    id: 'designer',
    title: 'UI/UX Designer',
    type: 'Contract',
    location: 'Remote — Worldwide',
    rate: '$50 – $80 / hour + Token Equity',
    experience: '3+ years',
    priority: false,
    department: 'Design',
    posted: 'March 22, 2026',
    deadline: DEADLINE,
    about: `FitSOL's product experience spans a mobile fitness app, a Web3 contribution interface, and a brand identity that must feel premium in both the fitness and crypto worlds.

We are looking for a UI/UX Designer on a contract basis to design the FitSOL mobile app interface, marketing assets, and evolve the existing brand. You will define how millions of fitness competitors experience the protocol — from onboarding their first wallet to completing their first GPS-verified 5K challenge.`,
    responsibilities: [
      'Design mobile-first iOS and Android fitness challenge interfaces',
      'Create UI flows for wallet connection, challenge entry, GPS tracking, and prize settlement',
      'Design marketing and social media assets for launch campaigns',
      'Build and maintain a FitSOL design system (components, typography, colour, spacing)',
      'Create motion design and micro-interaction specifications for developers',
      'Iterate on designs based on user testing and community feedback',
      'Collaborate closely with the development team on implementation feasibility',
    ],
    requirements: [
      '3+ years of UI/UX design experience with a strong mobile app portfolio',
      'Proficiency in Figma — component libraries, auto-layout, prototyping',
      'Experience designing for Web3 or crypto applications preferred',
      'Strong understanding of iOS and Android design guidelines',
      'Ability to work independently and deliver high-quality work on schedule',
    ],
    nice: [
      'Motion design and micro-animation experience',
      'Familiarity with Solana wallet UX patterns',
      'Personal interest in fitness, sport, or health technology',
      '3D or illustration skills for marketing assets',
    ],
    compensation: [
      'Competitive contract rate: $50 – $80 per hour based on experience',
      'Token equity: negotiated allocation with standard vesting schedule',
      'Flexible contract structure — project-based or retainer',
      'Path to full-time design lead as the team grows',
    ],
    submit: [
      'Your CV / Resume or design profile (PDF or URL)',
      'A cover letter and link to your portfolio (Behance, Dribbble, or personal site)',
      'Case study or walkthrough of your most relevant project',
      'LinkedIn profile URL',
      'References: at least 1 professional reference with contact details',
    ],
  },
]

function RoleBadge({ type }: { type: string }) {
  const colors: Record<string, string> = {
    'Full-time': 'text-green border-green-mid bg-green-dim',
    'Part-time':  'text-amber border-amber/30 bg-amber/10',
    'Contract':   'text-white border-border bg-card2',
  }
  return (
    <span className={`font-mono text-xs px-2.5 py-1 rounded border ${colors[type] || colors['Contract']}`}>
      {type}
    </span>
  )
}

export default function CareersPage() {
  return (
    <main>
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 md:px-10 py-16">

        {/* Header */}
        <div className="mono-label mb-3">Careers — FitSOL Protocol LLC</div>
        <h1 className="font-syne font-black text-4xl mb-4" style={{ letterSpacing: '-1.5px' }}>
          Join the founding team.
        </h1>
        <p className="text-muted text-base leading-relaxed mb-4 max-w-2xl">
          FitSOL is building the first on-chain fitness competition protocol on Solana.
          We are a small, focused founding team hiring growth, community, and design roles
          ahead of our Q3 2026 mainnet launch. All positions are fully remote and include
          token equity alongside competitive compensation.
        </p>

        {/* Meta info bar */}
        <div className="flex flex-wrap gap-4 mb-10 text-xs font-mono text-muted">
          <span>📍 Remote — Worldwide</span>
          <span>📅 Applications close: <span className="text-amber">{DEADLINE}</span></span>
          <span>✉️ {APPLY_EMAIL}</span>
          <span>🌐 fitsol.app</span>
        </div>

        {/* Honest context — no numbers, no limits */}
        <div className="bg-card border border-green-mid rounded-xl p-6 mb-10">
          <div className="mono-label text-green mb-2">About the opportunity</div>
          <p className="text-sm text-muted leading-relaxed mb-4">
            These are founding team roles — not corporate positions. You will work directly
            with the protocol founders, have meaningful input on product and strategy, and
            receive token equity that vests alongside the core team. FitSOL is pre-mainnet
            and actively raising its founding round. The seed round funds the full path to
            launch — smart contract development, security audit, app development, marketing,
            partnerships, infrastructure, and beyond. If you want to build something
            significant from zero in a growing category, we want to hear from you.
          </p>
          <div className="flex flex-wrap gap-3 text-xs font-mono">
            {[
              'Wyoming LLC — in progress',
              'Seed round active',
              '2-of-3 multisig treasury',
              'OtterSec audit planned Q2 2026',
              'Mainnet target Q3 2026',
            ].map((t) => (
              <span key={t} className="border border-border px-3 py-1 rounded text-muted">{t}</span>
            ))}
          </div>
        </div>

        {/* Role listings */}
        <div className="space-y-8">
          {ROLES.map((role) => (
            <div
              key={role.id}
              id={role.id}
              className={`bg-card rounded-2xl border overflow-hidden ${role.priority ? 'border-green-mid' : 'border-border'}`}
            >
              {/* Role header */}
              <div className={`px-7 py-5 border-b ${role.priority ? 'border-green-mid bg-green-dim' : 'border-border'}`}>
                <div className="flex flex-wrap justify-between items-start gap-4">
                  <div>
                    {role.priority && (
                      <div className="mono-label text-green mb-1">Priority hire</div>
                    )}
                    <h2 className="font-syne font-black text-2xl text-white mb-2">{role.title}</h2>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-muted font-mono">
                      <RoleBadge type={role.type} />
                      <span className="border border-border px-2.5 py-1 rounded">{role.department}</span>
                      <span>{role.location}</span>
                      <span className="text-green font-medium">{role.rate}</span>
                    </div>
                  </div>
                  <a
                    href={`mailto:${APPLY_EMAIL}?subject=Application: ${role.title}&body=Hi FitSOL team,%0A%0AI am applying for the ${role.title} position.%0A%0APlease find attached:%0A- My CV / Resume%0A- Cover letter%0A- Portfolio / work samples%0A- References%0A%0A[Your message here]`}
                    className="btn-ghost-green text-xs px-5 py-2.5 shrink-0"
                  >
                    Apply Now →
                  </a>
                </div>

                <div className="flex flex-wrap gap-6 mt-4 text-xs font-mono text-muted">
                  <span>📅 Posted: {role.posted}</span>
                  <span className="text-amber">⏰ Deadline: {role.deadline}</span>
                  <span>👤 Experience: {role.experience}</span>
                </div>
              </div>

              {/* Role body */}
              <div className="px-7 py-6 space-y-6">

                <div>
                  <div className="mono-label mb-3">About the role</div>
                  {role.about.split('\n\n').map((para, i) => (
                    <p key={i} className="text-sm text-muted leading-relaxed mb-3">{para}</p>
                  ))}
                </div>

                <div>
                  <div className="mono-label mb-3">Responsibilities</div>
                  <ul className="space-y-2">
                    {role.responsibilities.map((r) => (
                      <li key={r} className="flex gap-2.5 text-sm text-muted">
                        <span className="text-green flex-shrink-0 mt-0.5 font-bold">+</span>
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="mono-label mb-3">Requirements</div>
                  <ul className="space-y-2">
                    {role.requirements.map((r) => (
                      <li key={r} className="flex gap-2.5 text-sm text-muted">
                        <span className="text-green flex-shrink-0 mt-0.5 font-bold">+</span>
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="mono-label mb-3">Nice to have</div>
                  <ul className="space-y-2">
                    {role.nice.map((r) => (
                      <li key={r} className="flex gap-2.5 text-sm text-muted">
                        <span className="text-muted flex-shrink-0 mt-0.5">—</span>
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-card2 border border-border rounded-xl p-5">
                  <div className="mono-label text-green mb-3">Compensation and benefits</div>
                  <ul className="space-y-2">
                    {role.compensation.map((r) => (
                      <li key={r} className="flex gap-2.5 text-sm text-muted">
                        <span className="text-green flex-shrink-0 mt-0.5">+</span>
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-green-dim border border-green-mid rounded-xl p-5">
                  <div className="mono-label text-green mb-3">How to apply</div>
                  <p className="text-sm text-muted mb-3">
                    Send your application to{' '}
                    <a href={`mailto:${APPLY_EMAIL}`} className="text-green hover:underline">
                      {APPLY_EMAIL}
                    </a>{' '}
                    with the subject line{' '}
                    <span className="font-mono text-white">Application: {role.title}</span>
                  </p>
                  <p className="text-xs text-muted font-mono mb-3">Please include all of the following:</p>
                  <ul className="space-y-1.5 mb-4">
                    {role.submit.map((r) => (
                      <li key={r} className="flex gap-2.5 text-xs text-muted">
                        <span className="text-green flex-shrink-0">+</span>
                        {r}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-3 items-center">
                    <a
                      href={`mailto:${APPLY_EMAIL}?subject=Application: ${role.title}&body=Hi FitSOL team,%0A%0AI am applying for the ${role.title} position.%0A%0APlease find attached:%0A- My CV / Resume%0A- Cover letter%0A- Portfolio / work samples%0A- References%0A%0A[Your message here]`}
                      className="btn-primary text-xs px-6 py-2.5"
                    >
                      Apply via Email →
                    </a>
                    <span className="text-xs text-muted font-mono">
                      Deadline: <span className="text-amber">{DEADLINE}</span>
                    </span>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Advisor callout */}
        <div className="mt-8 bg-card2 border border-border rounded-xl p-6">
          <div className="mono-label mb-2">Advisors</div>
          <p className="text-sm text-muted leading-relaxed mb-4">
            We are seeking 1–2 advisors from the Solana ecosystem or fitness technology industry.
            Token allocation: 0.25% over a 2-year vesting schedule. One credible named advisor
            significantly improves contributor confidence heading into the full round.
          </p>
          <a
            href={`mailto:${APPLY_EMAIL}?subject=Advisor Inquiry — FitSOL Protocol`}
            className="btn-ghost-green text-xs px-5 py-2.5 inline-block"
          >
            Enquire as Advisor →
          </a>
        </div>

        {/* Open application */}
        <div className="mt-6 border border-border rounded-xl p-6 text-center">
          <p className="text-sm text-muted mb-4">
            Not seeing your role? If you believe you can add meaningful value to FitSOL
            in a way not listed above, reach out directly. We are a small team and open
            to the right people.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <a href={`mailto:${APPLY_EMAIL}`} className="btn-ghost-green text-xs px-5 py-2.5">
              Email Us
            </a>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-border">
          <a href="/" className="btn-outline text-xs px-5 py-2.5">
            Back to Homepage
          </a>
        </div>
      </div>
      <Footer />
    </main>
  )
}
