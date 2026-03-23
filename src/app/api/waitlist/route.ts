// src/app/api/waitlist/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  try {
    const { email, wallet } = await req.json()
    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 })
    }
    const { error } = await supabaseAdmin().from('waitlist').insert({
      email,
      wallet: wallet || null,
      source: 'homepage',
    })
    if (error && error.code === '23505') {
      return NextResponse.json({ message: 'Already on waitlist' })
    }
    if (error) throw error
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[waitlist]', err)
    return NextResponse.json({ error: 'Failed to join waitlist' }, { status: 500 })
  }
}
