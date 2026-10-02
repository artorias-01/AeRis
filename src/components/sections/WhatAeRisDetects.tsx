import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const cards = [
  {
    title: 'Images',
    description: 'Detect AI-generated photos, illustrations, and artwork with pixel-level signal analysis.',
    signals: ['Texture artifacts & unnatural smoothness', 'Lighting inconsistencies', 'Metadata & compression fingerprints'],
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <rect x="2" y="3" width="24" height="18" rx="3" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <circle cx="8.5" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path d="M2 17l6-5.5 4 4 4-4 10 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M14 25v-4M11 25h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Video',
    description: 'Spot deepfakes and AI-synthesized footage through temporal and perceptual analysis.',
    signals: ['Frame consistency & temporal artifacts', 'Lip-sync and facial motion anomalies', 'Audio-visual correlation mismatch'],
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <rect x="2" y="5" width="18" height="14" rx="3" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path d="M20 10l8-4v16l-8-4V10z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="none" />
        <circle cx="11" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path d="M9.5 12l3 1.5-3 1.5V12z" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: 'Text',
    description: 'Identify AI-written content through statistical and stylistic pattern recognition.',
    signals: ['Perplexity & burstiness scores', 'Stylistic uniformity patterns', 'Phrase repetition & structural entropy'],
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <rect x="2" y="2" width="24" height="24" rx="3" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path d="M7 8h14M7 12h10M7 16h12M7 20h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
]

export default function WhatAeRisDetects() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cardEls = cardsRef.current?.querySelectorAll('.detect-card')
      if (!cardEls) return

      gsap.fromTo(
        cardEls,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 80%',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="detector"
      aria-labelledby="detect-heading"
      style={{
        background: '#000000',
        padding: '7rem 1.5rem',
      }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8125rem', fontWeight: 500, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.40)', marginBottom: '1rem' }}>What AeRis detects</p>
          <h2
            id="detect-heading"
            style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 'clamp(2rem, 5vw, 3rem)', color: '#ffffff', letterSpacing: '-0.035em', lineHeight: 1.1 }}
          >
            Three types. One tool.
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '1.0625rem', color: 'rgba(255,255,255,0.60)', marginTop: '1rem', maxWidth: 480, margin: '1rem auto 0' }}>
            AeRis analyzes images, video, and text using the same unified interface.
          </p>
        </div>

        <div
          ref={cardsRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.25rem',
          }}
        >
          {cards.map((card) => (
            <div
              key={card.title}
              className="detect-card"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.09)',
                borderRadius: '1rem',
                padding: '2rem',
                transition: 'border-color 0.2s, box-shadow 0.2s',
                cursor: 'default',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.20)'
                e.currentTarget.style.boxShadow = '0 0 30px rgba(255,255,255,0.04)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.09)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              {/* Icon */}
              <div style={{ color: 'rgba(255,255,255,0.70)', marginBottom: '1.25rem' }}>
                {card.icon}
              </div>
              <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: '1.25rem', color: '#ffffff', letterSpacing: '-0.02em', marginBottom: '0.625rem' }}>
                {card.title}
              </h3>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.9375rem', color: 'rgba(255,255,255,0.60)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                {card.description}
              </p>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                {card.signals.map((signal) => (
                  <li key={signal} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.625rem' }}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" style={{ marginTop: 3, flexShrink: 0, color: 'rgba(255,255,255,0.40)' }}>
                      <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.25" fill="none" />
                      <path d="M4.5 7l2 2 3.5-3" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.875rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.5 }}>{signal}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
