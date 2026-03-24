// src/components/sections/HeroSection.tsx
'use client'
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRaiseStore, useTierProgress } from '@/hooks/useRaiseStore'
import { TIERS } from '@/lib/constants'
import { RAISE_CONFIG, SOCIAL_LINKS } from '@/lib/constants'
import { formatSol, formatUSD } from '@/lib/utils'

function ParticleCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let raf: number
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight }
    resize()
    window.addEventListener('resize', resize)
    const pts = Array.from({ length: 55 }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.4 + 0.3, a: Math.random() * 0.45 + 0.1,
    }))
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x = canvas.width; if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height; if (p.y > canvas.height) p.y = 0
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0,229,103,${p.a})`; ctx.fill()
      })
      for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y
        const d = Math.sqrt(dx * dx + dy * dy)
        if (d < 90) {
          ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y)
          ctx.strokeStyle = `rgba(0,229,103,${0.05 * (1 - d / 90)})`; ctx.lineWidth = 0.5; ctx.stroke()
        }
      }
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={ref} className="absolute inset-0 w-full h-full pointer-events-none" />
}

function AthleteHero() {
  return (
    <div className="relative w-full max-w-md mx-auto" style={{ animation: 'floatY 4s ease-in-out infinite' }}>
      <style>{`
        @keyframes floatY{0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}}
        @keyframes glowPulse{0%,100%{opacity:.4}50%{opacity:.8}}
        .aglow{animation:glowPulse 3s ease-in-out infinite}
      `}</style>
      <svg viewBox="0 0 460 500" className="w-full">
        <defs>
          <radialGradient id="bg1" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#1a1a1a"/>
            <stop offset="100%" stopColor="#0a0a0a"/>
          </radialGradient>
          <radialGradient id="halo" cx="50%" cy="60%" r="50%">
            <stop offset="0%" stopColor="#00e567" stopOpacity=".25"/>
            <stop offset="100%" stopColor="#00e567" stopOpacity="0"/>
          </radialGradient>
          <filter id="fg"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        </defs>
        {/* Glow halo */}
        <ellipse className="aglow" cx="230" cy="300" rx="150" ry="150" fill="url(#halo)"/>
        {/* Orbit rings */}
        <circle cx="230" cy="260" r="170" fill="none" stroke="#00e567" strokeWidth=".5" strokeDasharray="5 4" opacity=".18"/>
        <circle cx="230" cy="260" r="130" fill="none" stroke="#00e567" strokeWidth=".4" opacity=".1"/>
        {/* Shadow */}
        <ellipse cx="230" cy="475" rx="90" ry="12" fill="#00e567" opacity=".07"/>
        {/* Torso */}
        <path d="M215 165 Q220 148 235 143 Q252 138 262 152 L270 188 Q255 202 235 204 Q215 203 210 190Z" fill="url(#bg1)" stroke="#00e567" strokeWidth=".8" opacity=".9"/>
        {/* Head */}
        <circle cx="244" cy="135" r="21" fill="url(#bg1)" stroke="#00e567" strokeWidth=".8" opacity=".9"/>
        {/* Ponytail */}
        <path d="M256 125 Q274 116 278 104" fill="none" stroke="#00e567" strokeWidth="2" opacity=".5"/>
        {/* Left arm forward */}
        <path d="M218 172 Q198 162 188 146 Q184 138 192 136 Q200 143 208 156 L216 170Z" fill="url(#bg1)" stroke="#00e567" strokeWidth=".8" opacity=".8"/>
        {/* Right arm back */}
        <path d="M264 168 Q286 173 304 163 Q312 158 308 151 Q298 156 283 160 L268 165Z" fill="url(#bg1)" stroke="#00e567" strokeWidth=".8" opacity=".8"/>
        {/* Left leg – green */}
        <path d="M228 202 Q218 228 212 258 Q208 284 214 308 Q222 332 232 346 Q239 355 246 345 Q242 325 238 300 Q236 276 242 252 Q248 228 256 205Z" fill="#00e567" opacity=".85"/>
        {/* Right leg – green dimmer */}
        <path d="M243 205 Q260 222 270 248 Q280 272 275 296 Q270 316 260 325 Q253 333 245 325 Q253 305 255 282 Q257 258 250 236 Q245 220 234 207Z" fill="#00e567" opacity=".6"/>
        {/* Left shoe */}
        <path d="M212 344 Q199 356 189 358 Q179 358 178 352 Q185 345 199 341 Q209 340 216 342Z" fill="#111" stroke="#00e567" strokeWidth="1"/>
        <path d="M178 352 Q180 358 192 360 Q204 360 212 354" fill="none" stroke="#00e567" strokeWidth="1.5"/>
        <path d="M184 354 L202 352" stroke="#00e567" strokeWidth="1" opacity=".5" strokeDasharray="2 2"/>
        {/* Right shoe */}
        <path d="M257 322 Q270 331 280 336 Q290 338 293 332 Q286 324 272 320 Q262 318 257 322Z" fill="#111" stroke="#00e567" strokeWidth="1"/>
        <path d="M293 332 Q291 338 279 340 Q267 340 257 334" fill="none" stroke="#00e567" strokeWidth="1.5"/>
        <path d="M287 334 L269 332" stroke="#00e567" strokeWidth="1" opacity=".5" strokeDasharray="2 2"/>
        {/* Motion lines */}
        <path d="M152 188 L180 186" stroke="#00e567" strokeWidth="1.5" strokeLinecap="round" opacity=".45"/>
        <path d="M146 202 L175 200" stroke="#00e567" strokeWidth="1" strokeLinecap="round" opacity=".3"/>
        <path d="M149 215 L177 213" stroke="#00e567" strokeWidth=".8" strokeLinecap="round" opacity=".2"/>
        {/* Sparkle + */}
        {[[120,108],[330,138],[118,308],[348,278],[285,88]].map(([x,y],i)=>(
          <g key={i} transform={`translate(${x},${y})`} opacity={.35+i*.07}>
            <line x1="-6" y1="0" x2="6" y2="0" stroke="#00e567" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="0" y1="-6" x2="0" y2="6" stroke="#00e567" strokeWidth="1.5" strokeLinecap="round"/>
          </g>
        ))}
        {/* Lightning */}
        <path d="M352 168 L344 188 L352 188 L340 210" fill="none" stroke="#00e567" strokeWidth="2" strokeLinecap="round" opacity=".7" filter="url(#fg)"/>
        {/* × marks */}
        {[[96,258],[362,328]].map(([x,y],i)=>(
          <g key={i} transform={`translate(${x},${y})`} opacity=".2">
            <line x1="-5" y1="-5" x2="5" y2="5" stroke="#00e567" strokeWidth="1.5"/>
            <line x1="5" y1="-5" x2="-5" y2="5" stroke="#00e567" strokeWidth="1.5"/>
          </g>
        ))}
      </svg>
      {/* Floating cards */}
      <div className="absolute top-2 right-0 bg-card border border-green-mid rounded-lg px-3 py-2.5 text-center" style={{animation:'floatY 3.5s ease-in-out infinite .5s'}}>
        <div className="font-syne font-black text-lg text-green">0.1</div>
        <div className="font-mono text-xs text-muted">SOL entry</div>
      </div>
      <div className="absolute bottom-16 left-0 bg-card border border-green-mid rounded-lg px-3 py-2.5 text-center" style={{animation:'floatY 4.5s ease-in-out infinite 1s'}}>
        <div className="font-syne font-black text-lg text-green">60%</div>
        <div className="font-mono text-xs text-muted">1st prize</div>
      </div>
      <div className="absolute top-1/2 -left-4 bg-card border border-border rounded-lg px-3 py-2 -translate-y-1/2" style={{animation:'floatY 5s ease-in-out infinite 2s'}}>
        <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-green animate-pulse2"/><span className="font-mono text-xs text-green">Solana</span></div>
      </div>
    </div>
  )
}

export function HeroSection() {
  const { stats, loading, fetch } = useRaiseStore()
  const tierProgress = useTierProgress(stats)
  const currentTier  = tierProgress.currentTier
  useEffect(() => { fetch() }, [fetch])
  const fillPct = tierProgress.raisePct
  const capUSD  = formatUSD(RAISE_CONFIG.CAP_SOL * RAISE_CONFIG.SOL_PRICE_USD)
  const { totalSolRaised: totalSol, totalContributors, isActive } = stats

  return (
    <section className="relative max-w-6xl mx-auto px-6 md:px-10 pt-14 pb-16 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"><ParticleCanvas/></div>
      <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{background:'radial-gradient(circle,rgba(0,229,103,0.07) 0%,transparent 70%)'}}/>

      <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        {/* Left */}
        <div>
          <div className="inline-flex items-center gap-2 border border-border px-3.5 py-1.5 rounded text-xs text-muted font-mono mb-7">
            <span className="pulse-dot"/>
            {isActive ? `Founding Round Active — ~${capUSD} Cap` : 'Round Closed'}
          </div>
          <h1 className="font-syne font-black leading-none mb-5"
            style={{fontSize:'clamp(42px,6vw,78px)',letterSpacing:'-3px'}}>
            Compete.<br/>Verify.<br/>
            <span className="text-green" style={{textShadow:'0 0 40px rgba(0,229,103,0.4)'}}>Earn SOL.</span>
          </h1>
          <p className="text-lg text-muted max-w-md leading-relaxed mb-8 font-light">
            The first on-chain fitness competition protocol on Solana. Stake FIT,
            enter GPS-verified challenges, win from participant-funded prize pools.
          </p>
          <div className="flex flex-wrap gap-3 mb-8">
            <a href="#contribute" className="btn-ghost-green">Join Founding Round ↗</a>
            <Link href="/whitepaper" className="btn-outline">Whitepaper</Link>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[['Entry','0.1 SOL'],['Stake','1K FIT'],['Settle','24–48h'],['Burn','50%']].map(([l,v])=>(
              <div key={l as string} className="bg-card border border-border rounded-lg p-3 text-center">
                <div className="font-syne font-bold text-sm text-white">{v as string}</div>
                <div className="font-mono text-xs text-muted mt-0.5">{l as string}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Right */}
        <div className="relative"><AthleteHero/></div>
      </div>

      {/* Raise banner — with live tier indicator */}
      <div id="seed" className="relative mt-10 bg-card2 border border-green-mid rounded-xl p-7">
        <div className="absolute -top-px left-8 right-8 h-px bg-green opacity-30"/>

        {/* Top row */}
        <div className="flex flex-wrap gap-8 justify-between mb-5">
          <div className="flex-1 min-w-60">
            <div className="mono-label text-green mb-2">Community Founding Round</div>
            <h2 className="font-syne font-bold text-2xl mb-2">
              {RAISE_CONFIG.CAP_SOL.toLocaleString()} SOL Cap · ~{capUSD}
            </h2>
            <p className="text-sm text-muted leading-relaxed max-w-md mb-4">
              Early contributors receive bonus FIT allocation — see tiers below.
            </p>
            <div className="h-1.5 bg-border rounded-full mb-2 max-w-xs">
              <div className="h-full bg-green rounded-full transition-all duration-700"
                style={{width:`${fillPct}%`,boxShadow:'0 0 8px rgba(0,229,103,0.6)'}}/>
            </div>
            <div className="text-xs font-mono text-muted">
              {loading ? '…' : `${formatSol(totalSol)} SOL raised · ${totalContributors} contributors · ${fillPct.toFixed(1)}% filled`}
            </div>
          </div>
          <div className="min-w-52 flex flex-col gap-2">
            {[
              ['Base rate',    `${RAISE_CONFIG.FIT_PER_SOL.toLocaleString()} FIT/SOL`],
              ['Genesis rate', '33,800 FIT/SOL (+30%)'],
              ['Hard cap',     `${RAISE_CONFIG.CAP_SOL.toLocaleString()} SOL (~${capUSD})`],
              ['Max/wallet',   `${RAISE_CONFIG.MAX_PER_WALLET_SOL} SOL`],
            ].map(([l,v])=>(
              <div key={l as string} className="flex justify-between text-sm">
                <span className="text-muted">{l as string}</span>
                <span className={`font-mono font-medium ${(l as string).includes('Genesis') ? 'text-amber' : 'text-white'}`}>
                  {v as string}
                </span>
              </div>
            ))}
            <a href="#contribute" className="btn-ghost-green text-center mt-3 text-sm">
              View Tiers & Contribute ↗
            </a>
          </div>
        </div>

        {/* Live tier status row */}
        <div className="border-t border-border pt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
          {TIERS.map((t, i) => {
            const used      = i === 0 ? stats.tier1WalletsUsed : i === 1 ? stats.tier2WalletsUsed : null
            const max       = i === 0 ? 50 : i === 1 ? 100 : null
            const remaining = used !== null && max !== null ? Math.max(0, max - used) : null
            const isClosed  = remaining === 0
            const isNow     = currentTier.tier === t.tier
            return (
              <div key={t.tier}
                className="flex items-center gap-3 p-3 rounded-lg border"
                style={{
                  borderColor: isNow ? t.color : t.colorBorder,
                  background:  isNow ? t.colorDim : 'transparent',
                }}>
                <div>
                  <div className="font-mono text-xs font-bold" style={{ color: t.color }}>
                    {t.badge}
                    {isNow && <span className="ml-2 text-xs opacity-80">← ACTIVE</span>}
                  </div>
                  <div className="text-xs text-muted mt-0.5">
                    {remaining !== null
                      ? isClosed
                        ? `Closed — ${max} filled`
                        : `${remaining} of ${max} spots remaining`
                      : 'Open to all — no limit'}
                  </div>
                </div>
                <div className="ml-auto text-right">
                  <div className="font-mono text-xs font-bold" style={{ color: isClosed ? '#444' : t.color }}>
                    {t.bonusPct > 0 ? `+${t.bonusPct}%` : 'Base'}
                  </div>
                  <div className="text-xs text-muted">{t.effectiveRate.toLocaleString()} FIT/SOL</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
