#!/usr/bin/env node
// scripts/generate-whitepaper-pdf.js
// Run: node scripts/generate-whitepaper-pdf.js
// Outputs: public/whitepaper.pdf
// Requires: npm install puppeteer --save-dev

const puppeteer = require('puppeteer')
const path = require('path')
const fs = require('fs')

const HTML = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Mono:wght@400;500&family=DM+Sans:wght@300;400;500&display=swap');
  * { margin:0; padding:0; box-sizing:border-box; }
  body { font-family:'DM Sans',sans-serif; background:#080a08; color:#f0f5f0; padding:48px 56px; font-size:13px; line-height:1.7; }
  h1  { font-family:'Syne',sans-serif; font-size:42px; font-weight:800; color:#f0f5f0; letter-spacing:-2px; margin-bottom:8px; }
  h2  { font-family:'Syne',sans-serif; font-size:22px; font-weight:700; color:#f0f5f0; margin:36px 0 12px; border-bottom:1px solid #1e2b1e; padding-bottom:8px; }
  h3  { font-family:'Syne',sans-serif; font-size:15px; font-weight:700; color:#f0f5f0; margin:16px 0 6px; }
  p   { color:#6b7a6b; margin-bottom:10px; }
  .green  { color:#00e567; }
  .amber  { color:#f5a623; }
  .white  { color:#f0f5f0; }
  .mono   { font-family:'DM Mono',monospace; font-size:11px; color:#6b7a6b; }
  .tag    { font-family:'DM Mono',monospace; font-size:10px; color:#00e567; text-transform:uppercase; letter-spacing:0.1em; margin-bottom:6px; }
  .header { border-bottom:1px solid #1e2b1e; padding-bottom:28px; margin-bottom:28px; }
  .changelog { background:#0d110d; border:1px solid rgba(0,229,103,0.27); border-radius:8px; padding:16px 20px; margin-bottom:28px; }
  .changelog-row { font-family:'DM Mono',monospace; font-size:10px; color:#6b7a6b; margin-bottom:4px; }
  .warn-box { background:rgba(245,166,35,0.05); border:1px solid rgba(245,166,35,0.3); border-radius:8px; padding:14px 18px; margin-bottom:16px; }
  .green-box { background:rgba(0,229,103,0.08); border:1px solid rgba(0,229,103,0.2); border-radius:8px; padding:14px 18px; margin-bottom:16px; }
  table { width:100%; border-collapse:collapse; margin-bottom:16px; }
  th  { font-family:'DM Mono',monospace; font-size:10px; color:#6b7a6b; text-transform:uppercase; letter-spacing:0.08em; text-align:left; padding:8px 14px; border-bottom:1px solid #1e2b1e; }
  th:last-child,td:last-child { text-align:right; }
  td  { padding:8px 14px; color:#6b7a6b; border-bottom:1px solid #1e2b1e; font-size:12px; }
  td.val { font-family:'DM Mono',monospace; color:#f0f5f0; }
  td.green-val { font-family:'DM Mono',monospace; color:#00e567; }
  tr:last-child td { border-bottom:none; }
  .anti-row { display:flex; gap:16px; background:#0d110d; border:1px solid #1e2b1e; border-radius:6px; padding:10px 14px; margin-bottom:6px; }
  .anti-label { font-family:'DM Mono',monospace; font-size:10px; color:#00e567; min-width:160px; flex-shrink:0; }
  .risk-item  { display:flex; gap:8px; margin-bottom:6px; }
  .risk-dash  { color:#f5a623; flex-shrink:0; }
  .footer-bar { border-top:1px solid #1e2b1e; margin-top:48px; padding-top:16px; display:flex; justify-content:space-between; }
  .page-break { page-break-before:always; }
</style>
</head>
<body>

<div class="header">
  <div class="tag">FitSOL Whitepaper — Version 1.3 · March 2026</div>
  <h1>FitSOL Protocol</h1>
  <p style="font-size:16px;margin-bottom:16px;">Compete-to-earn fitness on Solana. Participant-funded prize pools. Deflationary token mechanics. Zero emissions dependency.</p>
  <div class="mono">FitSOL Protocol LLC · Wyoming, USA</div>
</div>

<div class="changelog">
  <div class="tag green">Changelog</div>
  <div class="changelog-row"><span class="white">v1.3</span> — March 2026: Fee split corrected to 100%. Public sale vesting corrected (20% TGE + 6-month linear). Wyoming LLC. Seed vesting 12 months.</div>
  <div class="changelog-row"><span class="white">v1.2</span> — March 2026: Daily fee calculation corrected (200 SOL→20 SOL error). Anti-cheat expanded.</div>
  <div class="changelog-row"><span class="white">v1.1</span> — February 2026: Prize distribution updated to top-3 tiered model.</div>
  <div class="changelog-row"><span class="white">v1.0</span> — January 2026: Initial release.</div>
</div>

<h2>1. Executive Summary</h2>
<p>FitSOL is a compete-to-earn fitness protocol on Solana. Users stake FIT tokens to unlock challenge access, pay SOL to enter verifiable fitness competitions, and win prizes from participant-funded pools. The protocol uses a two-token model: SOL for entry fees and prizes, FIT for access rights and governance.</p>

<h2>2. Problem Statement</h2>
<p>Existing move-to-earn protocols (STEPN, Genopets) rely on continuous token emissions to fund rewards. This creates inflationary death spirals — as token price falls, rewards shrink, users leave, price falls further. FitSOL solves this with 100% participant-funded prize pools. No token emissions required.</p>
<p>Blockchain is specifically useful here for three reasons: immutable prize distribution, anti-cheat staking with automatic on-chain slashing, and transparent treasury management investors can verify in real time.</p>

<h2>3. Fee Structure (v1.3 — Corrected)</h2>
<div class="warn-box">
  <span class="mono amber">Correction note:</span> <span class="mono"> Previous versions (v1.0–v1.2) had ops 20% + burn 50% + yield 50% = 120%. Corrected below to total exactly 100%.</span>
</div>
<table>
  <thead><tr><th>Category</th><th>Allocation</th></tr></thead>
  <tbody>
    <tr><td>Prize pool — top 3 winners</td><td class="green-val">80%</td></tr>
    <tr><td>Operations</td><td class="val">10%</td></tr>
    <tr><td>FIT buy + burn</td><td class="green-val">5%</td></tr>
    <tr><td>Staker yield</td><td class="green-val">5%</td></tr>
    <tr><td><strong style="color:#f0f5f0">Total</strong></td><td class="green-val">100% ✓</td></tr>
  </tbody>
</table>

<h2>4. Public Sale Vesting — Correction</h2>
<div class="warn-box">
  <p class="mono amber" style="margin-bottom:6px;">Corrected from v1.0–1.2</p>
  <p>Earlier versions stated "Public sale: 100% unlock at TGE." This allowed all buyers to sell on Day 1, risking a price crash. <span class="white">Corrected in v1.3:</span> 20% unlocked at TGE, 80% vesting linearly over 6 months. This protects price stability and aligns buyers with long-term protocol success.</p>
</div>

<div class="page-break"></div>

<h2>5. Anti-Cheat Architecture</h2>
<div class="anti-row"><span class="anti-label">Device fingerprinting</span><span>Hardware-level binding prevents multi-account farming from a single device.</span></div>
<div class="anti-row"><span class="anti-label">GPS anomaly detection</span><span>Velocity and path consistency checks flag impossible routes automatically.</span></div>
<div class="anti-row"><span class="anti-label">QR code rotation</span><span>Gym partners use time-bound codes rotating every 60 seconds.</span></div>
<div class="anti-row"><span class="anti-label">Economic stake deterrent</span><span>1,000 FIT stake with 7-day lockup creates a financial cost for cheaters.</span></div>
<div class="anti-row"><span class="anti-label">Graduated slashing</span><span>Warning → partial slash → 100% slash for verified repeat fraud. Enforced by smart contract.</span></div>

<h2>6. Token Allocation</h2>
<table>
  <thead><tr><th>Allocation</th><th>%</th><th>Vesting</th></tr></thead>
  <tbody>
    <tr><td>Seed Round</td><td class="val">5%</td><td class="val">25% TGE, 75% linear 12 months</td></tr>
    <tr><td>Public Sale</td><td class="val">10%</td><td class="val">20% TGE, 80% linear 6 months (corrected)</td></tr>
    <tr><td>Team & Advisors</td><td class="val">20%</td><td class="amber">4yr vest, 1yr cliff</td></tr>
    <tr><td>Development</td><td class="val">25%</td><td class="val">Milestone-based unlock</td></tr>
    <tr><td>Liquidity</td><td class="val">20%</td><td class="val">2yr lock</td></tr>
    <tr><td>Protocol Reserve</td><td class="val">20%</td><td class="val">Governance controlled</td></tr>
  </tbody>
</table>

<h2>7. TGE Supply Metrics — Q3 2026</h2>
<table>
  <thead><tr><th>Metric</th><th>Value</th></tr></thead>
  <tbody>
    <tr><td>Total supply</td><td class="val">2,000,000,000 FIT</td></tr>
    <tr><td>Circulating at TGE</td><td class="val">250,000,000 FIT</td></tr>
    <tr><td>Initial market cap</td><td class="val">$2.5M</td></tr>
    <tr><td>Fully diluted valuation</td><td class="val">$20M</td></tr>
    <tr><td>Seed price</td><td class="green-val">$0.005 / FIT</td></tr>
    <tr><td>Public sale price</td><td class="val">$0.010 / FIT</td></tr>
  </tbody>
</table>

<h2>8. Legal & Entity</h2>
<p>FitSOL Protocol LLC is registered in Wyoming, USA under Wyoming's DAO LLC statute (W.S. § 17-31-101 et seq.), which provides a specific legal framework for blockchain organisations. All contributions are held in a 2-of-3 Squads multisig wallet on Solana. No single party can unilaterally move treasury funds.</p>
<p>FIT is designed as a utility token for platform access. Legal classification varies by jurisdiction and remains subject to ongoing advisory review.</p>

<h2>9. Risk Disclosure</h2>
<div class="warn-box">
  <div class="risk-item"><span class="risk-dash">—</span><span>Experimental Technology: Smart contracts are unaudited. OtterSec audit expected June 2026. Do not deposit funds you cannot afford to lose entirely.</span></div>
  <div class="risk-item"><span class="risk-dash">—</span><span>Regulatory Uncertainty: FIT token classification varies by jurisdiction.</span></div>
  <div class="risk-item"><span class="risk-dash">—</span><span>Centralized Verification: Early-phase anti-cheat is not purely cryptographic during bootstrap phase.</span></div>
  <div class="risk-item"><span class="risk-dash">—</span><span>Market Risk: Token values can go to zero. Never invest more than you can afford to lose.</span></div>
  <div class="risk-item"><span class="risk-dash">—</span><span>Fitness Risks: Physical challenges carry inherent injury risks. Consult a medical professional.</span></div>
</div>

<div class="footer-bar">
  <span class="mono">© 2026 FitSOL Protocol LLC · Wyoming, USA</span>
  <span class="mono green">fitsolprotocol.com</span>
</div>

</body>
</html>`

async function generate() {
  const outDir = path.join(__dirname, '..', 'public')
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true })

  const browser = await puppeteer.launch({ headless: 'new' })
  const page = await browser.newPage()
  await page.setContent(HTML, { waitUntil: 'networkidle0' })
  await page.pdf({
    path: path.join(outDir, 'whitepaper.pdf'),
    format: 'A4',
    printBackground: true,
    margin: { top: '0', right: '0', bottom: '0', left: '0' },
  })
  await browser.close()
  console.log('✓ public/whitepaper.pdf generated')
}

generate().catch(console.error)
