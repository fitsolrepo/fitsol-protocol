// src/lib/utils.ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))

export const formatSol     = (n: number, d = 2) => n.toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d })
export const formatFit     = (n: number)         => n.toLocaleString('en-US', { maximumFractionDigits: 0 })
export const formatUSD     = (n: number)         => '$' + n.toLocaleString('en-US', { maximumFractionDigits: 0 })
export const formatPercent = (v: number, t: number) => t === 0 ? '0%' : ((v / t) * 100).toFixed(1) + '%'
