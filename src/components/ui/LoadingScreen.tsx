// src/components/ui/LoadingScreen.tsx
'use client'
import { useEffect, useState } from 'react'

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [count, setCount]       = useState(0)
  const [phase, setPhase]       = useState<'counting' | 'done'>('counting')
  const [visible, setVisible]   = useState(true)

  useEffect(() => {
    let frame = 0
    const total = 120 // ~2 seconds at 60fps
    const timer = setInterval(() => {
      frame++
      // Ease-in-out curve: slow → fast → slow
      const t = frame / total
      const eased = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
      const pct = Math.min(100, Math.round(eased * 100))
      setCount(pct)
      if (frame >= total) {
        clearInterval(timer)
        setPhase('done')
        setTimeout(() => {
          setVisible(false)
          onComplete()
        }, 600)
      }
    }, 1000 / 60)
    return () => clearInterval(timer)
  }, [onComplete])

  if (!visible) return null

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black"
      style={{
        opacity: phase === 'done' ? 0 : 1,
        transition: 'opacity 0.6s ease',
        pointerEvents: phase === 'done' ? 'none' : 'all',
      }}
    >
      {/* Background grid */}
      <div className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'linear-gradient(#00e567 1px, transparent 1px), linear-gradient(90deg, #00e567 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Scanline */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute left-0 right-0 h-px bg-green opacity-20"
          style={{ animation: 'scanline 3s linear infinite' }}
        />
      </div>

      <style>{`
        @keyframes scanline {
          0%   { top: -1px; }
          100% { top: 100%; }
        }
        @keyframes ecgDraw {
          0%   { stroke-dashoffset: 800; opacity: 0; }
          10%  { opacity: 1; }
          100% { stroke-dashoffset: 0; opacity: 1; }
        }
        @keyframes ecgPulse {
          0%, 90%, 100% { opacity: 1; }
          95%           { opacity: 0.3; }
        }
        .ecg-line {
          stroke-dasharray: 800;
          stroke-dashoffset: 800;
          animation: ecgDraw 2s ease-out forwards;
        }
      `}</style>

      {/* ECG SVG */}
      <div className="relative mb-8 w-80">
        <svg viewBox="0 0 320 80" className="w-full" fill="none">
          {/* Flat line left */}
          <polyline
            className="ecg-line"
            points="0,40 60,40 75,40 80,20 88,60 96,20 104,60 112,40 120,40 140,40"
            stroke="#00e567"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ animationDelay: '0s' }}
          />
          {/* Big spike */}
          <polyline
            className="ecg-line"
            points="140,40 152,40 158,38 162,8 166,72 170,36 174,44 178,40 200,40"
            stroke="#00e567"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ animationDelay: '0.3s' }}
          />
          {/* Flat line right */}
          <polyline
            className="ecg-line"
            points="200,40 220,40 230,36 238,44 244,40 320,40"
            stroke="#00e567"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ animationDelay: '0.6s' }}
          />
          {/* Glow overlay */}
          <polyline
            className="ecg-line"
            points="140,40 152,40 158,38 162,8 166,72 170,36 174,44 178,40 200,40"
            stroke="#00e567"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.15"
            style={{ animationDelay: '0.3s' }}
          />
        </svg>
      </div>

      {/* Logo */}
      <div className="font-syne font-black text-3xl mb-6 tracking-tight"
        style={{ letterSpacing: '-1px' }}>
        Fit<span style={{ color: '#00e567' }}>SOL</span>
      </div>

      {/* Counter */}
      <div className="relative flex items-end gap-1 mb-4">
        <span
          className="font-syne font-black text-7xl leading-none"
          style={{
            color: '#00e567',
            letterSpacing: '-4px',
            textShadow: '0 0 40px rgba(0,229,103,0.5)',
            transition: 'all 0.05s',
          }}
        >
          {count}
        </span>
        <span className="font-syne font-bold text-3xl text-green pb-2" style={{ color: '#00e567' }}>%</span>
      </div>

      {/* Status text */}
      <div className="font-mono text-xs text-muted tracking-widest uppercase">
        {count < 30  ? 'Initializing protocol…'
       : count < 60  ? 'Loading smart contracts…'
       : count < 85  ? 'Connecting to Solana…'
       : count < 100 ? 'Almost ready…'
       :               'Launch ready ✓'}
      </div>

      {/* Progress bar */}
      <div className="mt-6 w-64 h-px bg-border rounded overflow-hidden">
        <div
          className="h-full rounded transition-all duration-75"
          style={{
            width: `${count}%`,
            background: '#00e567',
            boxShadow: '0 0 8px rgba(0,229,103,0.6)',
          }}
        />
      </div>
    </div>
  )
}
