import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { getTierByWalletCount } from '@/lib/constants'

export async function GET() {
  try {
    const admin = supabaseAdmin()

    const { data, error } = await admin
      .from('raise_stats')
      .select('total_contributors, tier1_wallets_used, tier2_wallets_used')
      .eq('id', 1)
      .single()

    if (error || !data) throw new Error('Failed to read raise stats')

    const nextWalletNumber = data.total_contributors + 1
    const tier = getTierByWalletCount(data.total_contributors)

    return NextResponse.json({
      tier,
      walletNumber: nextWalletNumber,
      tier1WalletsUsed: data.tier1_wallets_used,
      tier2WalletsUsed: data.tier2_wallets_used,
      spotsLeft: {
        tier1: Math.max(0, 50 - data.tier1_wallets_used),
        tier2: Math.max(0, 100 - data.tier2_wallets_used),
      },
    })
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Unknown error' },
      { status: 500 }
    )
  }
}