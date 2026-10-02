import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function AccuracySection() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 80%' },
        }
      )
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={ref}
      aria-labelledby="accuracy-heading"
      style={{
        background: '#0a0a0a',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        padding: '6rem 1.5rem',
      }}
    >
      <div style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center' }}>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8125rem', fontWeight: 500, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.40)', marginBottom: '1.25rem' }}>Accuracy & transparency</p>
        <h2
          id="accuracy-heading"
          style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', color: '#ffffff', letterSpacing: '-0.035em', lineHeight: 1.15, marginBottom: '1.75rem' }}
        >
          Detection is probabilistic, not definitive.
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', textAlign: 'left' }}>
          {[
            'AeRis returns a confidence score, not a verdict. No detection system is infallible.',
            'False positives and false negatives will occur. Human-created content can sometimes score high; AI-generated content can sometimes score low.',
            'Results should be treated as one signal among many — not as final proof for any legal, professional, or editorial decision.',
            'We are committed to publishing our methodology, accuracy benchmarks, and known failure modes openly.',
          ].map((text, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.875rem',
                padding: '1rem 1.25rem',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '0.75rem',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ marginTop: 2, flexShrink: 0, color: 'rgba(255,255,255,0.35)' }}>
                <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.25" fill="none" />
                <path d="M8 5v4M8 10.5v1" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
              </svg>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.9375rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.6 }}>{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
