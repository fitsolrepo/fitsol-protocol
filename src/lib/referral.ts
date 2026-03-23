// src/lib/referral.ts

import { supabase } from './supabase';

// Generate a unique 8-character referral code from wallet address
export function generateReferralCode(walletAddress: string): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = 'FIT-';
  // Use wallet address characters as seed for consistency
  for (let i = 0; i < 6; i++) {
    const charCode = walletAddress.charCodeAt(i % walletAddress.length);
    code += chars[charCode % chars.length];
  }
  return code;
}

// Save referral code to Supabase after seed deposit confirmed
export async function createReferralRecord(
  walletAddress: string,
  depositAmountSOL: number,
  referredByCode?: string
) {
  const referralCode = generateReferralCode(walletAddress);

  // Insert participant record
  const { error } = await supabase.from('seed_participants').upsert({
    wallet_address: walletAddress,
    referral_code: referralCode,
    deposit_sol: depositAmountSOL,
    referred_by_code: referredByCode || null,
    fit_bonus_earned: 0,
    created_at: new Date().toISOString(),
  });

  if (error) throw error;

  // If they came with a referral code, reward the referrer
  if (referredByCode) {
    await creditReferrer(referredByCode, depositAmountSOL);
  }

  return referralCode;
}

// Add FIT bonus to referrer based on 5% of referee's SOL deposit
// Converted to $FIT at TGE — stored as SOL value for now
async function creditReferrer(referralCode: string, depositAmountSOL: number) {
  const bonusSOL = depositAmountSOL * 0.05; // 5% referral reward

  const { data: referrer } = await supabase
    .from('seed_participants')
    .select('wallet_address, fit_bonus_earned, referral_count')
    .eq('referral_code', referralCode)
    .single();

  if (!referrer) return;

  const newCount = (referrer.referral_count || 0) + 1;
  // Tier upgrade: 10+ referrals = 8% instead of 5%
  const tierBonus = newCount >= 10 ? depositAmountSOL * 0.03 : 0;

  await supabase
    .from('seed_participants')
    .update({
      fit_bonus_earned: (referrer.fit_bonus_earned || 0) + bonusSOL + tierBonus,
      referral_count: newCount,
    })
    .eq('referral_code', referralCode);
}

// Fetch a participant's full referral stats
export async function getReferralStats(walletAddress: string) {
  const { data } = await supabase
    .from('seed_participants')
    .select('*')
    .eq('wallet_address', walletAddress)
    .single();
  return data;
}
