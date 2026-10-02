import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// PLACEHOLDER stats — not real data
const stats = [
  { value: 10, suffix: 'M+', label: 'Files scanned' },
  { value: 3, suffix: '', label: 'Content types' },
  { value: 5, suffix: 's avg', label: 'Scan time' },
]

function TrustStat({ target, suffix }: { target: number; suffix: string }) {
  const numRef = useRef<HTMLSpanElement>(null)
  const triggered = useRef(false)

  useEffect(() => {
    const el = numRef.current
    if (!el) return

    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 90%',
      onEnter() {
        if (triggered.current) return
        triggered.current = true
        const obj = { val: 0 }
        gsap.to(obj, {
          val: target,
          duration: 1.8,
          ease: 'power2.out',
          onUpdate() {
            if (el) el.textContent = Math.round(obj.val) + suffix
          },
        })
      },
    })

    return () => st.kill()
  }, [target, suffix])

  return <span ref={numRef}>0{suffix}</span>
}

export default function TrustStrip() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
          },
        }
      )
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={ref}
      aria-label="Placeholder statistics"
      style={{
        background: '#0a0a0a',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        padding: '4rem 1.5rem',
      }}
    >
      <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '3rem', justifyContent: 'center' }}>
        {stats.map((s) => (
          <div key={s.label} style={{ textAlign: 'center' }}>
            <p
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 'clamp(2.25rem, 5vw, 3rem)',
                fontWeight: 700,
                color: '#ffffff',
                letterSpacing: '-0.04em',
                lineHeight: 1,
              }}
            >
              <TrustStat target={s.value} suffix={s.suffix} />
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.875rem', color: 'rgba(255,255,255,0.50)', marginTop: '0.5rem', fontWeight: 500 }}>
              {s.label}
            </p>
          </div>
        ))}
      </div>
      {/* Disclaimer */}
      <p style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.75rem', color: 'rgba(255,255,255,0.25)', fontFamily: "'Inter', sans-serif" }}>
        * Placeholder figures for demonstration purposes only.
      </p>
    </section>
  )
}
