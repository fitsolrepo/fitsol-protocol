// src/lib/constants.ts
// ─────────────────────────────────────────────────────────────────────────────
// CANONICAL FEE MODEL — used everywhere, no exceptions
//
// Per 0.1 SOL entry:
//   80% → prize pool (60% 1st, 15% 2nd, 5% 3rd)
//   20% → platform (10% ops, 5% buy+burn, 5% staker yield)
//   Total = 100%
//
// At 1,000 challenges/day:
//   100 SOL entry volume → 20 SOL platform fees
//   → 10 SOL ops / 5 SOL burned / 5 SOL staker yield
// ─────────────────────────────────────────────────────────────────────────────

export const TREASURY_WALLET = process.env.NEXT_PUBLIC_TREASURY_WALLET || "Wallet_Address_Not_Found"

export const RAISE_CONFIG = {
  CAP_SOL:            Number(process.env.NEXT_PUBLIC_RAISE_CAP_SOL)           || 4000,
  MAX_PER_WALLET_SOL: Number(process.env.NEXT_PUBLIC_MAX_PER_WALLET_SOL)      || 50,   // Hard cap — enforced in UI and API
  FIT_PER_SOL:        Number(process.env.NEXT_PUBLIC_FIT_PER_SOL)             || 26000,
  SEED_PRICE_USD:     Number(process.env.NEXT_PUBLIC_SEED_PRICE_USD)          || 0.005,
  SOL_PRICE_USD:      Number(process.env.NEXT_PUBLIC_SOL_PRICE_USD)           || 170,
  MIN_SOL:            Number(process.env.NEXT_PUBLIC_MIN_PER_WALLET_SOL)      || 1,    // Minimum contribution per wallet
}

// ── Early Contributor Tier System ─────────────────────────────────────────
// Bonus FIT comes from within the 100M seed allocation — no new tokens created
// All tiers share the same vesting: 25% at TGE, 75% linear over 12 months
export const TIERS = [
  {
    tier:          1,
    name:          'Genesis',
    label:         'Genesis Wallets',
    walletMax:     50,
    minSol:        2,
    bonusPct:      30,
    multiplier:    1.30,
    effectiveRate: 33800,
    color:         '#EF9F27',
    colorDim:      'rgba(239,159,39,0.12)',
    colorBorder:   'rgba(239,159,39,0.35)',
    badge:         'Genesis',
    description:   'First 50 wallets receive a 30% founding participant bonus on their FIT allocation.',
  },
  {
    tier:          2,
    name:          'Early',
    label:         'Early Wallets',
    walletMax:     100,
    minSol:        1,
    bonusPct:      15,
    multiplier:    1.15,
    effectiveRate: 29900,
    color:         '#C0C8D8',
    colorDim:      'rgba(192,200,216,0.10)',
    colorBorder:   'rgba(192,200,216,0.30)',
    badge:         'Early',
    description:   'Wallets 51-150 receive a 15% early participant bonus on their FIT allocation.',
  },
  {
    tier:          3,
    name:          'Standard',
    label:         'Community Wallets',
    walletMax:     Infinity,
    minSol:        1,
    bonusPct:      0,
    multiplier:    1.00,
    effectiveRate: 26000,
    color:         '#6b7a6b',
    colorDim:      'rgba(107,122,107,0.10)',
    colorBorder:   'rgba(107,122,107,0.25)',
    badge:         'Community',
    description:   'Standard rate — 26,000 FIT per SOL contributed.',
  },
]

export function getTierByWalletCount(walletCount: number) {
  if (walletCount < 50)  return TIERS[0]
  if (walletCount < 150) return TIERS[1]
  return TIERS[2]
}

export const SOLANA_CONFIG = {
  NETWORK:         process.env.NEXT_PUBLIC_SOLANA_NETWORK || 'Solana_Network_Not_Found',
  RPC:             process.env.NEXT_PUBLIC_SOLANA_RPC     || 'Solana_RPC_Not_Found',
  TREASURY_WALLET,
}

export const ENTITY = {
  NAME:  process.env.NEXT_PUBLIC_ENTITY_NAME  || 'FitSOL Protocol LLC',
  STATE: process.env.NEXT_PUBLIC_ENTITY_STATE || 'Wyoming, USA',
  EIN:   process.env.NEXT_PUBLIC_ENTITY_EIN   || 'Pending',
}

export const SOCIAL_LINKS = {
  twitter:  process.env.NEXT_PUBLIC_TWITTER  || 'Link_Not_Available',
  discord:  process.env.NEXT_PUBLIC_DISCORD  || 'Link_Not_Available',
  telegram: process.env.NEXT_PUBLIC_TELEGRAM || 'Link_Not_Available',
  github:   process.env.NEXT_PUBLIC_GITHUB_URL   || 'Link_Not_Available',
}

export const EMAILS = {
  privacy:  process.env.NEXT_PUBLIC_PRIVACY_EMAIL  || 'Email_Not_Available',
  careers:  process.env.NEXT_PUBLIC_CAREERS_EMAIL  || 'Email_Not_Available',
  legal: process.env.NEXT_PUBLIC_LEGAL_EMAIL || 'Email_Not_Available',
  support: process.env.NEXT_PUBLIC_SUPPORT_EMAIL || 'Email_Not_Available',
}

export const MULTISIG_SIGNERS = [
  { role: 'Signer 1 — Owner', address: process.env.NEXT_PUBLIC_OWNER_WALLET || "OWNER_Wallet_Address_Not_Found" },
  { role: 'Signer 2 — Creator',      address: process.env.NEXT_PUBLIC_CREATOR_WALLET || "CREATOR_WALLET_Address_Not_Found" },
  { role: 'Signer 3 — Developer',    address: process.env.NEXT_PUBLIC_DEVELOPER_WALLET  || "DEVELOPER_WALLET_Address_Not_Found" },
]

export const TRUST_SIGNALS = [
  { id:'multisig', label:'2-of-3 Multisig Treasury',      status:'verified' as const, description:'All funds in a 2-of-3 Squads multisig. No single key can move funds.', link:`https://solscan.io/account/${TREASURY_WALLET}`, linkLabel:'View on Solscan' },
  { id:'github',   label:'Open Source Code',              status:'verified' as const, description:'Smart contract architecture and protocol docs public on GitHub with daily commits.', link:SOCIAL_LINKS.github, linkLabel:SOCIAL_LINKS.github !== 'Link_Not_Available' ? SOCIAL_LINKS.github.replace('https://', '') : 'Link_Not_Available',},
  { id:'llc',      label:'Wyoming LLC Registration',      status:'pending'  as const, description:'FitSOL Protocol LLC registration in progress — Wyoming DAO LLC statute. EIN pending.', link:'https://wyobiz.wyo.gov', linkLabel:'View state registry', eta:'Q2 2026' },
  { id:'kyc',      label:'Founder KYC — Synaps.io',       status:'pending'  as const, description:'Managing Member identity verification via Synaps.io in progress — institutional KYC standard.', link:'#', linkLabel:'Pending', eta:'Q2 2026' },
  { id:'audit',    label:'OtterSec Smart Contract Audit', status:'planned'  as const, description:'Full security audit planned once smart contracts are written. Report published publicly before mainnet.', link:'https://osec.io', linkLabel:'About OtterSec', eta:'Q2 2026' },
  { id:'devnet',   label:'Devnet Deployment',             status:'planned'  as const, description:'Staking and challenge contracts deploying to Solana devnet with live explorer links.', link:SOCIAL_LINKS.twitter, linkLabel:'Follow on Twitter', eta:'May 2026' },
]

// ── Tokenomics ────────────────────────────────────────────────────────────
export const TOKENOMICS_FEE_SPLIT = [
  { label: 'Prize pool (1st 60%, 2nd 15%, 3rd 5%)', value: '80%',    highlight: 'green' as const },
  { label: 'Platform total',                         value: '20%',    highlight: 'none'  as const },
  { label: '  Operations',                           value: '10%',    highlight: 'none'  as const },
  { label: '  FIT buy + burn',                       value: '5%',     highlight: 'green' as const },
  { label: '  Staker yield',                         value: '5%',     highlight: 'green' as const },
  { label: 'Total',                                  value: '100%',   highlight: 'green' as const },
]

export const TOKENOMICS_SUPPLY = [
  { label: 'Total supply',                      value: '2,000,000,000 FIT',  highlight: 'none'  as const },
  { label: 'Circulating at TGE',                value: '250,000,000 FIT',    highlight: 'none'  as const },
  { label: 'Initial market cap',                value: '$2.5M',               highlight: 'none'  as const },
  { label: 'Fully diluted val.',                value: '$20M',                highlight: 'none'  as const },
  { label: 'Team tokens (4yr vest — aligned)',  value: '4yr vest, 1yr cliff', highlight: 'amber' as const },
]

export const TOKENOMICS_VESTING = [
  { label: 'Seed TGE unlock',         value: '25% at TGE',         highlight: 'amber' as const },
  { label: 'Seed linear vest',        value: '75% over 12 months', highlight: 'none'  as const },
  { label: 'Public sale TGE unlock',  value: '20% at TGE',         highlight: 'amber' as const },
  { label: 'Public sale linear vest', value: '80% over 6 months',  highlight: 'none'  as const },
  { label: 'Seed price',              value: '$0.005 / FIT',        highlight: 'none'  as const },
]

export const TOKENOMICS_VOLUME = [
  { label: 'At 1,000 challenges/day',        value: '100 SOL volume', highlight: 'none'  as const },
  { label: 'Platform fees (20% of volume)',  value: '20 SOL',         highlight: 'none'  as const },
  { label: '  Operations (10% of entry)',    value: '10 SOL',         highlight: 'none'  as const },
  { label: '  Buy + burn (5% of entry)',     value: '5 SOL burned',   highlight: 'green' as const },
  { label: '  Staker yield (5% of entry)',   value: '5 SOL stakers',  highlight: 'green' as const },
]

export const STEPS = [
  { num:'01', title:'Stake FIT',           desc:'Stake minimum 1,000 FIT to unlock challenge access. 7-day unstaking lockup creates an economic deterrent against multi-account farming.' },
  { num:'02', title:'Enter Challenges',    desc:'Pay 0.1 SOL per challenge. Running, walking, or gym — activity data captured by the FitSOL app using GPS and time-bound QR codes.' },
  { num:'03', title:'Compete and Win',     desc:'Top 3 split 80% of the pool: 1st place 60%, 2nd place 15%, 3rd place 5%. Platform retains 20% for operations, burn, and staker yield.' },
  { num:'04', title:'Verified Settlement', desc:'Activity data is verified during a 24-48h window. After verification closes, prize distribution executes on-chain via smart contract. 5% of fees buy and burn FIT; 5% distribute to stakers.' },
]

export const JOB_POSTS = [
  { id:'marketing',    title:'Head of Marketing',           type:'Full-time' as const, rate:'$70-100/hr + Token Equity', description:'Lead go-to-market strategy for token launch and user acquisition.', requirements:['Crypto/DeFi marketing','Influencer network','Community building','Launch campaign experience'], responsibilities:['Token launch campaign','Influencer partnerships','Build community 0-50K','Content calendar'] },
  { id:'partnerships', title:'Fitness Partnerships Manager', type:'Part-time' as const, rate:'$40-60/hr + Token Equity',  description:'Establish partnerships with gyms, influencers, and wearable device companies.', requirements:['Gym industry contacts','B2B sales','Health & wellness passion','Partnership negotiation'], responsibilities:['Onboard gym partners','Wearable integrations','Manage relationships'] },
  { id:'community',    title:'Community Manager',            type:'Full-time' as const, rate:'$30-50/hr + Token Equity',  description:'Manage Telegram, and Twitter communities globally.', requirements:['Telegram moderation','Crypto community management','English fluency','Conflict resolution'], responsibilities:['Moderate channels','Answer support','Organize AMAs'] },
  { id:'designer',     title:'UI/UX Designer',               type:'Contract'  as const, rate:'$50-80/hr + Token Equity',  description:'Design mobile-first fitness challenge interfaces and brand assets.', requirements:['Mobile app design portfolio','Crypto aesthetic','Figma','Motion design'], responsibilities:['Challenge interfaces','3D visualizations','Mobile designs','Design system'] },
]
