import { useRef, useState, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const faqs = [
  {
    q: 'How accurate is AeRis?',
    a: 'Accuracy varies by content type and generation method. In our testing, AeRis achieves high precision on common AI generators, but no detector is 100% reliable. Always treat results as probabilistic signals.',
  },
  {
    q: 'Does AeRis store my uploaded content?',
    a: 'No. Content is processed in-memory only and is never stored on our servers. Analysis results may be cached briefly for performance, but original files and text are not retained.',
  },
  {
    q: 'What file formats are supported?',
    a: 'Images: JPG, PNG, WEBP, GIF (up to 20 MB). Video: MP4, MOV, WEBM (up to 500 MB). Text: plain text via paste or upload (up to 50,000 characters).',
  },
  {
    q: 'Can AeRis detect all AI generators?',
    a: 'AeRis is regularly updated to cover the most widely used AI systems. However, newer or obscure generators may not yet be in our training data. Coverage is an ongoing effort.',
  },
  {
    q: 'Is AeRis free to use?',
    a: 'AeRis offers a free tier with basic detection. Advanced features, higher upload limits, and batch processing are available on paid plans.',
  },
]

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)

  const toggle = () => {
    const content = contentRef.current
    const inner = innerRef.current
    if (!content || !inner) return

    if (!open) {
      const h = inner.scrollHeight
      gsap.fromTo(content, { height: 0 }, { height: h, duration: 0.35, ease: 'power2.out' })
    } else {
      gsap.to(content, { height: 0, duration: 0.28, ease: 'power2.in' })
    }
    setOpen(!open)
  }

  return (
    <div
      style={{
        borderBottom: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <button
        aria-expanded={open}
        onClick={toggle}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1.25rem 0',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: '#ffffff',
          textAlign: 'left',
          gap: '1rem',
        }}
      >
        <span
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 600,
            fontSize: '1rem',
            color: '#ffffff',
            lineHeight: 1.4,
          }}
        >
          {q}
        </span>
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          aria-hidden="true"
          style={{
            flexShrink: 0,
            transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
            transition: 'transform 0.28s ease',
            color: 'rgba(255,255,255,0.50)',
          }}
        >
          <path d="M9 3v12M3 9h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
      <div
        ref={contentRef}
        style={{ height: 0, overflow: 'hidden' }}
        role="region"
        aria-label={q}
      >
        <div ref={innerRef} style={{ paddingBottom: '1.25rem' }}>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.9375rem',
              color: 'rgba(255,255,255,0.60)',
              lineHeight: 1.65,
            }}
          >
            {a}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function FAQ() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
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
      id="faq"
      aria-labelledby="faq-heading"
      style={{ background: '#000000', padding: '7rem 1.5rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}
    >
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8125rem', fontWeight: 500, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.40)', marginBottom: '1rem' }}>FAQ</p>
          <h2
            id="faq-heading"
            style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 'clamp(2rem, 5vw, 3rem)', color: '#ffffff', letterSpacing: '-0.035em', lineHeight: 1.1 }}
          >
            Common questions.
          </h2>
        </div>
        <div>
          {faqs.map((faq) => (
            <FaqItem key={faq.q} q={faq.q} a={faq.a} />
          ))}
        </div>
      </div>
    </section>
  )
}
