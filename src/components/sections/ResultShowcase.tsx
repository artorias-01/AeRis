import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const signalBars = [
  { label: 'Texture consistency', score: 94 },
  { label: 'Statistical distribution', score: 88 },
  { label: 'Perceptual fingerprint', score: 91 },
  { label: 'Metadata signals', score: 76 },
]

const textSample = [
  { text: 'The model was trained on a large corpus of publicly available data.', aiLikely: true },
  { text: ' It demonstrates consistent grammatical structure and uniform sentence length throughout.', aiLikely: true },
  { text: ' However, the core argument has some interesting nuance that surprised me personally.', aiLikely: false },
  { text: ' The conclusion, once again, follows predictable transitional phrasing without deviation.', aiLikely: true },
]

export default function ResultShowcase() {
  const sectionRef = useRef<HTMLElement>(null)
  const gaugeRef = useRef<SVGCircleElement>(null)
  // Use a span ref for the percentage text (avoids SVGTSpanElement cast issues)
  const percentRef = useRef<HTMLSpanElement>(null)
  const barsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Gauge animation
      const circle = gaugeRef.current
      if (circle) {
        const circumference = 2 * Math.PI * 54
        circle.style.strokeDasharray = String(circumference)
        circle.style.strokeDashoffset = String(circumference)
        const obj = { val: 0 }
        ScrollTrigger.create({
          trigger: circle,
          start: 'top 80%',
          onEnter() {
            gsap.to(obj, {
              val: 92,
              duration: 1.6,
              ease: 'power2.out',
              onUpdate() {
                const offset = circumference - (obj.val / 100) * circumference
                circle.style.strokeDashoffset = String(offset)
                if (percentRef.current) percentRef.current.textContent = Math.round(obj.val) + '%'
              },
            })
          },
        })
      }

      // Bar animations
      const bars = barsRef.current?.querySelectorAll('.result-bar-fill')
      if (bars) {
        gsap.fromTo(
          bars,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power2.out',
            transformOrigin: 'left center',
            scrollTrigger: { trigger: barsRef.current, start: 'top 80%' },
          }
        )
      }

      // Section reveal
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      aria-labelledby="result-heading"
      style={{ background: '#000000', padding: '7rem 1.5rem' }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8125rem', fontWeight: 500, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.40)', marginBottom: '1rem' }}>Sample result</p>
          <h2 id="result-heading" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 'clamp(2rem, 5vw, 3rem)', color: '#ffffff', letterSpacing: '-0.035em', lineHeight: 1.1 }}>
            What a result looks like.
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {/* Confidence gauge */}
          <div
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.09)',
              borderRadius: '1rem',
              padding: '2.5rem 2rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1.25rem',
            }}
          >
            <div style={{ position: 'relative', width: 140, height: 140 }}>
              <svg
                width="140"
                height="140"
                viewBox="0 0 140 140"
                aria-label="Confidence gauge: 92% likely AI-generated"
                style={{ position: 'absolute', top: 0, left: 0 }}
              >
                {/* Track */}
                <circle cx="70" cy="70" r="54" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" />
                {/* Fill */}
                <circle
                  ref={gaugeRef}
                  cx="70" cy="70" r="54"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="8"
                  strokeLinecap="round"
                  transform="rotate(-90 70 70)"
                />
              </svg>
              {/* Percentage text overlay — plain HTML, no SVG cast issues */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '2px',
                  pointerEvents: 'none',
                }}
              >
                <span
                  ref={percentRef}
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 700,
                    fontSize: '1.625rem',
                    color: '#ffffff',
                    lineHeight: 1,
                  }}
                >
                  0%
                </span>
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.625rem',
                    color: 'rgba(255,255,255,0.45)',
                    letterSpacing: '0.02em',
                  }}
                >
                  AI confidence
                </span>
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: '1rem', color: '#ffffff' }}>Likely AI-generated</p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8125rem', color: 'rgba(255,255,255,0.45)', marginTop: '0.25rem' }}>Image · 2.4 MB · JPG</p>
            </div>
          </div>

          {/* Signal bars */}
          <div
            ref={barsRef}
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.09)',
              borderRadius: '1rem',
              padding: '2rem',
            }}
          >
            <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: '1rem', color: '#ffffff', marginBottom: '1.5rem' }}>Signal breakdown</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {signalBars.map((bar) => (
                <div key={bar.label}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.375rem' }}>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8125rem', color: 'rgba(255,255,255,0.65)' }}>{bar.label}</span>
                    <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.8125rem', fontWeight: 600, color: '#ffffff' }}>{bar.score}%</span>
                  </div>
                  <div style={{ height: 4, background: 'rgba(255,255,255,0.08)', borderRadius: 2, overflow: 'hidden' }}>
                    <div
                      className="result-bar-fill"
                      style={{ height: '100%', width: `${bar.score}%`, background: `rgba(255,255,255,${0.3 + (bar.score / 100) * 0.5})`, borderRadius: 2 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Text detection sample */}
          <div
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.09)',
              borderRadius: '1rem',
              padding: '2rem',
            }}
          >
            <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: '1rem', color: '#ffffff', marginBottom: '0.5rem' }}>Text analysis</h3>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)', marginBottom: '1.25rem' }}>Highlighted spans are flagged as likely AI-generated.</p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.9rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.75)' }}>
              {textSample.map((chunk, i) => (
                chunk.aiLikely ? (
                  <mark
                    key={i}
                    style={{
                      background: 'rgba(255,255,255,0.10)',
                      borderBottom: '1px solid rgba(255,255,255,0.30)',
                      color: '#ffffff',
                      borderRadius: '2px',
                      padding: '0 2px',
                    }}
                  >
                    {chunk.text}
                  </mark>
                ) : (
                  <span key={i}>{chunk.text}</span>
                )
              ))}
            </p>
            <div style={{ marginTop: '1.25rem', padding: '0.75rem', background: 'rgba(255,255,255,0.05)', borderRadius: '0.5rem' }}>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8125rem', color: 'rgba(255,255,255,0.60)' }}>
                <strong style={{ color: '#ffffff' }}>Perplexity score: 18.4</strong> — Typical of AI-generated text (low perplexity indicates high predictability).
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
