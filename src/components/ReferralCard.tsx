// src/components/ReferralCard.tsx
'use client'
import { useState, useEffect } from 'react'

interface Props {
  walletAddress: string
  depositSOL?: number
}

interface Stats {
  referral_code: string
  referral_count: number
  fit_bonus_earned: number
  deposit_sol: number
}

export function ReferralCard({ walletAddress, depositSOL }: Props) {
  const [stats, setStats] = useState<Stats | null>(null)
  const [copied, setCopied] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!walletAddress) return
    setLoading(true)
    window.fetch('/api/referral?wallet=' + walletAddress)
      .then(function(r) { return r.json() })
      .then(function(d) { setStats(d && d.referral_code ? d : null) })
      .finally(function() { setLoading(false) })
  }, [walletAddress])

  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://fitsol.app'
  const referralLink = origin + '/?ref=' + (stats ? stats.referral_code : '')

  function copy() {
    navigator.clipboard.writeText(referralLink)
    setCopied(true)
    setTimeout(function() { setCopied(false) }, 2000)
  }

  const tweetText = encodeURIComponent(
    'Just joined @FitSOL seed phase\nGet fit. Earn $FIT on-chain.\nUse my link for bonus $FIT at TGE\n' + referralLink
  )

  if (loading) {
    return (
      <div className="bg-card border border-border rounded-xl p-5 mt-6 text-center">
        <p className="text-muted text-xs font-mono animate-pulse">Loading referral dashboard...</p>
      </div>
    )
  }

  if (!stats) {
    return null
  }

  const fitBonusDisplay = Math.round(stats.fit_bonus_earned * 26000)
  const tierLabel = stats.referral_count >= 10 ? 'Tier 2 - 8%' : 'Tier 1 - 5%'

  return (
    <div className="bg-card border border-green-mid rounded-xl p-5 mt-6">
      <div className="mono-label text-green mb-4">Your Referral Dashboard</div>

      <div className="grid grid-cols-3 gap-3 mb-5">
        <div className="bg-card2 border border-border rounded-lg p-3 text-center">
          <div className="text-2xl font-syne font-black text-white">
            {stats.referral_count}
          </div>
          <div className="text-xs text-muted font-mono mt-1">Referrals</div>
        </div>
        <div className="bg-card2 border border-border rounded-lg p-3 text-center">
          <div className="text-2xl font-syne font-black text-green">
            {fitBonusDisplay.toLocaleString()}
          </div>
          <div className="text-xs text-muted font-mono mt-1">$FIT at TGE</div>
        </div>
        <div className="bg-card2 border border-border rounded-lg p-3 text-center">
          <div className="text-sm font-syne font-black text-amber">
            {tierLabel}
          </div>
          <div className="text-xs text-muted font-mono mt-1">Reward rate</div>
        </div>
      </div>

      <div className="bg-card2 border border-border rounded-lg px-3 py-2 mb-4">
        <div className="text-xs text-muted font-mono mb-1">Your referral link</div>
        <div className="text-xs text-green font-mono break-all">{referralLink}</div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={copy}
          className="flex-1 bg-green text-black font-syne font-black text-xs py-2.5 rounded-lg hover:opacity-90 transition-opacity"
        >
          {copied ? 'Copied!' : 'Copy Link'}
        </button>
        <a
          href={'https://twitter.com/intent/tweet?text=' + tweetText}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-syne font-black text-xs py-2.5 rounded-lg text-center transition-colors"
        >
          Tweet It
        </a>
      </div>

      <p className="text-xs text-muted font-mono mt-3 text-center">
        You earn 5% of every deposit via your link in $FIT at TGE
        {stats.referral_count >= 10 && ' - Tier 2 unlocked, earning 8%!'}
      </p>
    </div>
  )
}
