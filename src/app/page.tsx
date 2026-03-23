'use client'
import { useState, useCallback } from 'react'
import { LoadingScreen }        from '@/components/ui/LoadingScreen'
import { Navbar }               from '@/components/layout/Navbar'
import { TrustBar }             from '@/components/layout/TrustBar'
import { Footer }               from '@/components/layout/Footer'
import { HeroSection }          from '@/components/sections/HeroSection'
import { VisionSection }        from '@/components/sections/VisionSection'
import { TrustSection }         from '@/components/sections/TrustSection'
import { HowItWorksSection }    from '@/components/sections/HowItWorksSection'
import { TokenomicsSection }    from '@/components/sections/TokenomicsSection'
import { RoadmapSection }       from '@/components/sections/RoadmapSection'
import { ContributeSection }    from '@/components/sections/ContributeSection'
import { FAQSection }           from '@/components/sections/FAQSection'
import { DisclaimerSection }    from '@/components/sections/DisclaimerSection'

// publicly alongside KYC completion in Q2 2026.

export default function Home() {
  const [loaded, setLoaded] = useState(false)
  const onComplete = useCallback(() => setLoaded(true), [])
  return (
    <>
      <LoadingScreen onComplete={onComplete} />
      <main
        style={{
          opacity:    loaded ? 1 : 0,
          transition: 'opacity 0.5s ease 0.1s',
        }}
      >
        <Navbar />
        <TrustBar />
        <HeroSection />
        <VisionSection />
        <TrustSection />
        <HowItWorksSection />
        <TokenomicsSection />
        <RoadmapSection />
        <ContributeSection />
        <FAQSection />
        <DisclaimerSection />
        <Footer />
      </main>
    </>
  )
}
