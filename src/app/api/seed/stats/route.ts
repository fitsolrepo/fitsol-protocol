import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET() {
  try {
    const admin = supabaseAdmin()

    const { data, error } = await admin
      .from('raise_stats')
      .select('*')
      .eq('id', 1)
      .single()

    if (error || !data) throw new Error('Failed to read stats')

    return NextResponse.json({
      totalSolRaised: Number(data.total_sol_raised),
      totalContributors: data.total_contributors,
      tier1WalletsUsed: data.tier1_wallets_used,
      tier2WalletsUsed: data.tier2_wallets_used,
      isActive: data.is_active,
    })
  } catch {
    return NextResponse.json({
      totalSolRaised: 0,
      totalContributors: 0,
      tier1WalletsUsed: 0,
      tier2WalletsUsed: 0,
      isActive: true,
    })
  }
}