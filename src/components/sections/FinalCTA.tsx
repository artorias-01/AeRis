import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const ctaEls = Array.from(sectionRef.current?.querySelectorAll('.cta-content') ?? [])
      if (ctaEls.length === 0) return
      gsap.fromTo(
        ctaEls,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.9, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      aria-labelledby="cta-heading"
      style={{
        background: '#000000',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        padding: '8rem 1.5rem',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle radial glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(255,255,255,0.03) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ position: 'relative', maxWidth: 640, margin: '0 auto' }}>
        <p className="cta-content" style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8125rem', fontWeight: 500, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.40)', marginBottom: '1.5rem' }}>Get started</p>
        <h2
          className="cta-content"
          id="cta-heading"
          style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 'clamp(2.5rem, 7vw, 4.5rem)', color: '#ffffff', letterSpacing: '-0.04em', lineHeight: 1.0, marginBottom: '1.75rem' }}
        >
          See what&apos;s real.
        </h2>
        <p className="cta-content" style={{ fontFamily: "'Inter', sans-serif", fontSize: '1.0625rem', color: 'rgba(255,255,255,0.60)', lineHeight: 1.65, marginBottom: '2.5rem', maxWidth: 440, margin: '0 auto 2.5rem' }}>
          Upload an image, paste a video link, or enter text. AeRis returns a result in seconds.
        </p>
        <div className="cta-content">
          <a href="#detector" className="btn-primary" style={{ fontSize: '1rem', padding: '0.875rem 2.25rem' }}>
            Start detecting
          </a>
        </div>
      </div>
    </section>
  )
}
