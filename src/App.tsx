import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ClickSpark from './components/ClickSpark'
import TrustStrip from './components/sections/TrustStrip'
import WhatAeRisDetects from './components/sections/WhatAeRisDetects'
import HowItWorks from './components/sections/HowItWorks'
import ResultShowcase from './components/sections/ResultShowcase'
import AccuracySection from './components/sections/AccuracySection'
import FAQ from './components/sections/FAQ'
import FinalCTA from './components/sections/FinalCTA'
import Footer from './components/sections/Footer'
import { useLenis } from './hooks/useLenis'
import { useReducedMotion } from './hooks/useReducedMotion'

export default function App() {
  const prefersReducedMotion = useReducedMotion()
  const lenisRef = useLenis(!prefersReducedMotion)

  const handleScrollTo = (id: string) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(`#${id}`, {
        duration: 1.4,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      })
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const content = (
    <>
      <Navbar onScrollTo={handleScrollTo} lenisRef={lenisRef} />
      <main id="main-content">
        <Hero lenisRef={lenisRef} />
        <TrustStrip />
        <WhatAeRisDetects />
        <HowItWorks />
        <ResultShowcase />
        <AccuracySection />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer onScrollTo={handleScrollTo} />
    </>
  )

  if (prefersReducedMotion) {
    return content
  }

  return (
    <ClickSpark
      sparkColor="#ffffff"
      sparkSize={8}
      sparkRadius={20}
      sparkCount={10}
      duration={450}
      easing="ease-out"
      extraScale={1.1}
    >
      {content}
    </ClickSpark>
  )
}
