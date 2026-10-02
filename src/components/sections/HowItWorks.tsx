import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    number: '01',
    title: 'Upload',
    description: 'Drop your image, paste a video URL, or type/paste text directly into AeRis.',
  },
  {
    number: '02',
    title: 'Analyze',
    description: 'Our models scan the content for statistical, structural, and perceptual AI signatures.',
  },
  {
    number: '03',
    title: 'Get results',
    description: 'See a confidence score, signal breakdown, and highlighted patterns — in under 5 seconds.',
  },
]

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const stepEls = sectionRef.current?.querySelectorAll('.how-step')
      if (stepEls) {
        gsap.fromTo(
          stepEls,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.18,
            ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
          }
        )
      }

      if (progressRef.current) {
        gsap.fromTo(
          progressRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1,
            ease: 'power2.inOut',
            transformOrigin: 'left center',
            scrollTrigger: { trigger: progressRef.current, start: 'top 85%' },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      aria-labelledby="how-heading"
      style={{
        background: '#0a0a0a',
        padding: '7rem 1.5rem',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8125rem', fontWeight: 500, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.40)', marginBottom: '1rem' }}>How it works</p>
          <h2
            id="how-heading"
            style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 'clamp(2rem, 5vw, 3rem)', color: '#ffffff', letterSpacing: '-0.035em', lineHeight: 1.1 }}
          >
            Three steps to clarity.
          </h2>
        </div>

        {/* Progress bar */}
        <div style={{ position: 'relative', marginBottom: '3.5rem' }}>
          <div style={{ height: 1, background: 'rgba(255,255,255,0.08)', borderRadius: 1 }} />
          <div
            ref={progressRef}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 1,
              background: 'linear-gradient(90deg, #ffffff, rgba(255,255,255,0.3))',
              borderRadius: 1,
              transformOrigin: 'left center',
            }}
          />
        </div>

        {/* Steps */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '2.5rem',
          }}
        >
          {steps.map((step, i) => (
            <div key={step.number} className="how-step">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <span
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 700,
                    fontSize: '0.75rem',
                    letterSpacing: '0.08em',
                    color: 'rgba(255,255,255,0.30)',
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.10)',
                    borderRadius: '9999px',
                    padding: '0.25rem 0.625rem',
                  }}
                >
                  {step.number}
                </span>
                <div
                  style={{
                    flex: 1,
                    height: 1,
                    background: i < steps.length - 1 ? 'rgba(255,255,255,0.08)' : 'transparent',
                  }}
                  aria-hidden="true"
                />
              </div>
              <h3
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 600,
                  fontSize: '1.375rem',
                  color: '#ffffff',
                  letterSpacing: '-0.025em',
                  marginBottom: '0.625rem',
                }}
              >
                {step.title}
              </h3>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.9375rem',
                  color: 'rgba(255,255,255,0.55)',
                  lineHeight: 1.65,
                }}
              >
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
