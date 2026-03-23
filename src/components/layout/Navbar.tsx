'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useWallet } from '@solana/wallet-adapter-react'
import { useWalletModal } from '@solana/wallet-adapter-react-ui'
import { ENTITY, SOCIAL_LINKS } from '@/lib/constants'
import { shortenAddress } from '@/lib/solana'
import { connection } from '@/lib/solana'
import Image from 'next/image'

// Team link removed — team profiles published Q2 2026 alongside KYC completion
const NAV = [
  { label: 'Vision',       href: '/#vision' },
  { label: 'How It Works', href: '/#how-it-works' },
  { label: 'Tokenomics',   href: '/#tokenomics' },
  { label: 'FAQ',          href: '/#faq' },
  { label: 'Whitepaper',   href: '/whitepaper' },
  { label: 'Careers',      href: '/careers' },
]

const THEMES = [
  { key: 'green',  label: 'Green',  icon: '🟢' },
  { key: 'blue',   label: 'Blue',   icon: '🔵' },
  { key: 'purple', label: 'Purple', icon: '🟣' },
]

function applyTheme(key: string) {
  if (key === 'green') {
    document.documentElement.removeAttribute('data-theme')
  } else {
    document.documentElement.setAttribute('data-theme', key)
  }
  localStorage.setItem('fitsol-theme', key)
}

export function Navbar() {
  const { publicKey, disconnect, connected, wallet } = useWallet()
  const { setVisible } = useWalletModal()

  const [open,           setOpen]           = useState(false)
  const [walletMenuOpen, setWalletMenuOpen] = useState(false)
  const [themeMenuOpen,  setThemeMenuOpen]  = useState(false)
  const [activeTheme,    setActiveTheme]    = useState('green')
  const [balance,        setBalance]        = useState<number | null>(null)
  const [copyDone,       setCopyDone]       = useState(false)

  const walletMenuRef = useRef<HTMLDivElement | null>(null)
  const themeMenuRef  = useRef<HTMLDivElement | null>(null)

  // Load saved theme on mount
  useEffect(() => {
    const saved = localStorage.getItem('fitsol-theme')
    if (saved) {
      setActiveTheme(saved)
      applyTheme(saved)
    }
  }, [])

  // Wallet balance
  useEffect(() => {
    if (!connected || !publicKey) { setBalance(null); return }
    const walletKey = publicKey
    let cancelled = false
    async function loadBalance() {
      try {
        const lamports = await connection.getBalance(walletKey)
        const sol = Number(lamports) / 1_000_000_000
        if (!cancelled) setBalance(Number.isFinite(sol) ? sol : 0)
      } catch (err) {
        console.error('[wallet balance]', err)
        if (!cancelled) setBalance(null)
      }
    }
    loadBalance()
    const interval = setInterval(loadBalance, 15000)
    return () => { cancelled = true; clearInterval(interval) }
  }, [connected, publicKey])

  // Close menus on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (walletMenuRef.current && !walletMenuRef.current.contains(event.target as Node)) {
        setWalletMenuOpen(false)
      }
      if (themeMenuRef.current && !themeMenuRef.current.contains(event.target as Node)) {
        setThemeMenuOpen(false)
      }
    }
    if (walletMenuOpen || themeMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => { document.removeEventListener('mousedown', handleClickOutside) }
  }, [walletMenuOpen, themeMenuOpen])

  async function handleCopyAddress() {
    if (!publicKey) return
    try {
      await navigator.clipboard.writeText(publicKey.toString())
      setCopyDone(true)
      setTimeout(() => setCopyDone(false), 1500)
    } catch (err) {
      console.error('[copy wallet]', err)
    }
  }

  async function handleDisconnect() {
    try {
      setWalletMenuOpen(false)
      await disconnect()
      if (typeof window !== 'undefined') {
        localStorage.removeItem('walletName')
        sessionStorage.removeItem('walletName')
      }
    } catch (err) {
      console.error('[disconnect wallet]', err)
    }
  }

  function handleThemeChange(key: string) {
    setActiveTheme(key)
    applyTheme(key)
    setThemeMenuOpen(false)
  }

  const currentTheme = THEMES.find((t) => t.key === activeTheme) || THEMES[0]

  return (
    <nav className="flex items-center justify-between px-6 md:px-10 h-16 border-b border-border sticky top-0 bg-black/94 backdrop-blur-md z-50">

      {/* Logo 
      <Link href="/" className="font-syne font-black text-xl no-underline shrink-0">
        Fit<span className="text-green">SOL</span>
      </Link>*/}
      <Link href="/logo.png" className="shrink-0 flex items-center">
  <Image
    src="/logo.png"
    alt="FitSOL"
    width={140}
    height={40}
    className="h-16 w-auto"
    priority
  />
</Link>
      

      {/* Desktop nav links */}
      <ul className="hidden xl:flex gap-5 list-none">
        {NAV.map((l) => (
          <li key={l.label}>
            <Link
              href={l.href}
              className="text-muted text-xs font-medium uppercase tracking-widest hover:text-white transition-colors no-underline"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Right side */}
      <div className="flex items-center gap-2 shrink-0">

        <span className="hidden 2xl:block text-xs text-green border border-green-mid px-2.5 py-1 rounded font-mono">
          {ENTITY.NAME}
        </span>

        {/* Social icons */}
        <div className="hidden lg:flex gap-1.5">
          {[
            { t: 'Twitter',  h: SOCIAL_LINKS.twitter,  s: 'X'  },
            { t: 'Discord',  h: SOCIAL_LINKS.discord,  s: 'DC' },
            { t: 'Telegram', h: SOCIAL_LINKS.telegram, s: 'TG' },
            { t: 'GitHub',   h: SOCIAL_LINKS.github,   s: 'GH' },
          ].map((s) => (
            <a
              key={s.t}
              href={s.h}
              target="_blank"
              rel="noopener noreferrer"
              title={s.t}
              className="w-8 h-8 flex items-center justify-center border border-border rounded text-xs text-muted hover:border-green hover:text-green transition-colors no-underline font-mono"
            >
              {s.s}
            </a>
          ))}
        </div>

        {/* Color theme toggle */}
        <div className="relative" ref={themeMenuRef}>
          <button
            onClick={() => setThemeMenuOpen((v) => !v)}
            title="Change color theme"
            className="w-8 h-8 flex items-center justify-center border border-border rounded text-xs text-muted hover:border-green hover:text-green transition-colors"
          >
            {currentTheme.icon}
          </button>

          {themeMenuOpen && (
            <div className="absolute right-0 mt-2 w-44 rounded-xl border border-green-mid bg-card/95 backdrop-blur-md shadow-2xl p-2 z-[60]">
              <p className="text-xs text-muted font-mono px-2 py-1 mb-1 uppercase tracking-wider">
                Color theme
              </p>
              {THEMES.map((t) => (
                <button
                  key={t.key}
                  onClick={() => handleThemeChange(t.key)}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-mono transition-colors ${
                    activeTheme === t.key
                      ? 'bg-green-dim text-green border border-green-mid'
                      : 'text-muted hover:text-white hover:bg-card2'
                  }`}
                >
                  <span>{t.icon}</span>
                  <span>{t.label}</span>
                  {activeTheme === t.key && <span className="ml-auto">✓</span>}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Join Seed Round button */}
        <a
          href="/#contribute"
          className="hidden md:inline-flex items-center gap-1.5 bg-green text-black font-syne font-black text-xs px-4 py-2 rounded hover:opacity-90 transition-opacity no-underline"
        >
          Join Seed ↗
        </a>

        {/* Wallet */}
        {connected && publicKey ? (
          <div className="relative" ref={walletMenuRef}>
            <button
              onClick={() => setWalletMenuOpen((v) => !v)}
              className="bg-green-dim border border-green-mid text-green text-xs font-mono px-3 py-2 rounded cursor-pointer hover:bg-green-mid transition-colors flex items-center gap-2"
              aria-expanded={walletMenuOpen}
              aria-haspopup="menu"
              title="Wallet menu"
            >
              <span>{shortenAddress(publicKey.toString())}</span>
              <span className={`inline-block transition-transform duration-200 ${walletMenuOpen ? 'rotate-180' : 'translate-y-[1px]'}`}>
                ⌄
              </span>
            </button>

            {walletMenuOpen && (
              <div className="absolute right-0 mt-2 w-80 rounded-xl border border-green-mid bg-card/95 backdrop-blur-md shadow-2xl p-3 z-[60]">
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-muted">Connected Wallet</p>
                    <p className="text-sm text-white font-semibold">{wallet?.adapter?.name || 'Solana Wallet'}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-muted">Balance</p>
                    <p className="text-sm font-mono text-green">
                      {balance !== null ? `${balance.toFixed(4)} SOL` : '...'}
                    </p>
                  </div>
                </div>

                <div className="rounded-lg border border-border bg-black/30 p-3 mb-3">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-muted mb-1">Address</p>
                  <p className="text-xs font-mono text-white break-all">{publicKey.toString()}</p>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-2">
                  <button
                    onClick={handleCopyAddress}
                    className="rounded-lg border border-border px-3 py-2 text-xs text-muted hover:text-white hover:border-green transition-colors"
                  >
                    {copyDone ? 'Copied ✓' : 'Copy Address'}
                  </button>
                  <a
                    href={`https://solscan.io/account/${publicKey.toString()}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg border border-border px-3 py-2 text-xs text-muted hover:text-white hover:border-green transition-colors text-center no-underline"
                  >
                    View on Solscan ↗
                  </a>
                </div>

                <button
                  onClick={handleDisconnect}
                  className="w-full rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-300 hover:bg-red-500/20 transition-colors"
                >
                  Disconnect Wallet
                </button>
              </div>
            )}
          </div>
        ) : (
          <button onClick={() => setVisible(true)} className="btn-primary text-xs px-4 py-2">
            Connect Wallet
          </button>
        )}

        {/* Mobile menu toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="xl:hidden border border-border rounded p-2 text-muted hover:text-white transition-colors ml-1"
        >
          {open ? 'x' : '='}
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="xl:hidden absolute top-16 left-0 right-0 bg-card border-b border-border px-6 py-5 flex flex-col gap-3 z-50">
          {NAV.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-muted text-sm uppercase tracking-wider hover:text-green transition-colors no-underline"
            >
              {l.label}
            </Link>
          ))}
          <a
            href="/#contribute"
            onClick={() => setOpen(false)}
            className="mt-2 text-center bg-green text-black font-syne font-black text-xs px-4 py-2.5 rounded no-underline"
          >
            Join Seed Round
          </a>
        </div>
      )}
    </nav>
  )
}
