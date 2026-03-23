// src/app/api/referral/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// Round to 9 decimal places — SOL maximum precision, eliminates floating point errors
function round9(val: number): number {
  return parseFloat(val.toFixed(9))
}

function generateReferralCode(wallet: string): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let code = 'FIT-'
  for (let i = 0; i < 6; i++) {
    const c = wallet.charCodeAt(i % wallet.length)
    code += chars[c % chars.length]
  }
  return code
}

export async function POST(req: NextRequest) {
  try {
    const { walletAddress, depositSOL, referredByCode } = await req.json()

    if (!walletAddress || !depositSOL) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    const referralCode = generateReferralCode(walletAddress)
    const deposit = round9(Number(depositSOL))

    // Check if wallet already exists — maybeSingle returns null not error
    const { data: existing, error: fetchError } = await supabase
      .from('seed_participants')
      .select('deposit_sol, fit_bonus_earned, referral_count')
      .eq('wallet_address', walletAddress)
      .maybeSingle()

    if (fetchError) throw fetchError

    if (existing) {
      // Wallet exists — add to deposit total with precision fix
      const { error: updateError } = await supabase
        .from('seed_participants')
        .update({
          deposit_sol: round9(Number(existing.deposit_sol || 0) + deposit),
        })
        .eq('wallet_address', walletAddress)

      if (updateError) throw updateError

    } else {
      // New wallet — fresh insert
      const { error: insertError } = await supabase
        .from('seed_participants')
        .insert({
          wallet_address:   walletAddress,
          referral_code:    referralCode,
          deposit_sol:      deposit,
          referred_by_code: referredByCode || null,
          fit_bonus_earned: 0,
          referral_count:   0,
        })

      if (insertError) throw insertError

      // Credit referrer only on first deposit from this wallet
      if (referredByCode) {
        const { data: referrer, error: refError } = await supabase
          .from('seed_participants')
          .select('fit_bonus_earned, referral_count')
          .eq('referral_code', referredByCode)
          .maybeSingle()

        if (refError) throw refError

        if (referrer) {
          const newCount = Number(referrer.referral_count || 0) + 1
          const pct      = newCount >= 10 ? 0.08 : 0.05
          const bonus    = round9(deposit * pct)

          const { error: creditError } = await supabase
            .from('seed_participants')
            .update({
              fit_bonus_earned: round9(Number(referrer.fit_bonus_earned || 0) + bonus),
              referral_count:   newCount,
            })
            .eq('referral_code', referredByCode)

          if (creditError) throw creditError
        }
      }
    }

    return NextResponse.json({ success: true, referralCode })

  } catch (err: any) {
    console.error('[POST /api/referral]', err?.message || err)
    return NextResponse.json({ error: err?.message || 'Unknown error' }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  try {
    const wallet = req.nextUrl.searchParams.get('wallet')
    if (!wallet) {
      return NextResponse.json({ error: 'wallet required' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('seed_participants')
      .select('*')
      .eq('wallet_address', wallet)
      .maybeSingle()

    if (error) throw error

    return NextResponse.json(data || {})

  } catch (err: any) {
    console.error('[GET /api/referral]', err?.message || err)
    return NextResponse.json({ error: err?.message || 'Unknown error' }, { status: 500 })
  }
}