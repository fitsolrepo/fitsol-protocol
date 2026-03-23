// src/app/api/seed/confirm/route.ts
import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { connection } from '@/lib/solana'
import { RAISE_CONFIG } from '@/lib/constants'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const {
      wallet,
      solAmount,
      txSignature,
      tier,
      walletNumber,
      fitBase,
      fitBonus,
      fitTotal,
    } = body

    if (!wallet || !txSignature || !solAmount) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    if (
      solAmount < RAISE_CONFIG.MIN_SOL ||
      solAmount > RAISE_CONFIG.MAX_PER_WALLET_SOL
    ) {
      return NextResponse.json({ error: 'Invalid SOL amount' }, { status: 400 })
    }

    const txInfo = await connection.getTransaction(txSignature, {
      maxSupportedTransactionVersion: 0,
    })

    if (!txInfo || txInfo.meta?.err) {
      return NextResponse.json(
        { error: 'Transaction not found or failed on-chain' },
        { status: 400 }
      )
    }

    const admin = supabaseAdmin()

    const { error: insertError } = await admin
      .from('contributions')
      .insert({
        wallet_address: wallet,
        sol_amount: solAmount,
        fit_base_amount: fitBase,
        fit_bonus_amount: fitBonus,
        fit_total_amount: fitTotal,
        tier,
        wallet_number: walletNumber,
        tx_signature: txSignature,
        status: 'confirmed',
        confirmed_at: new Date().toISOString(),
      })

    if (insertError) {
      if (insertError.code === '23505') {
        return NextResponse.json({ success: true, duplicate: true })
      }
      throw new Error(insertError.message)
    }

    await admin.rpc('increment_raise_stats', {
      sol_amount: solAmount,
      contributor_tier: tier,
      wallet_num: walletNumber,
    })

    return NextResponse.json({
      success: true,
      tier,
      walletNumber,
      fitBase,
      fitBonus,
      fitTotal,
    })
  } catch (err) {
    console.error('[confirm]', err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Unknown error' },
      { status: 500 }
    )
  }
}