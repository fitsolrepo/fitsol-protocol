// src/types/index.ts

export interface Contribution {
  id: string
  wallet_address: string
  sol_amount: number
  fit_amount: number
  tx_signature: string
  status: 'pending' | 'confirmed' | 'failed'
  created_at: string
  confirmed_at: string | null
}

export interface RaiseStats {
  total_sol_raised: number
  total_contributors: number
  cap_sol: number
  is_active: boolean
}

export interface TrustSignal {
  id: string
  label: string
  status: 'verified' | 'pending' | 'planned'
  description: string
  link?: string
  linkLabel?: string
  eta?: string
}

export interface TeamMember {
  id: string
  name: string
  role: string
  initials: string
  kyc_verified: boolean
  linkedin?: string
  github?: string
  twitter?: string
  bio: string
}

export interface TokenomicsRow {
  label: string
  value: string
  highlight?: 'green' | 'amber' | 'red' | 'none'
}

export interface JobPost {
  id: string
  title: string
  type: 'Full-time' | 'Part-time' | 'Contract'
  rate: string
  description: string
  requirements: string[]
  responsibilities: string[]
}
