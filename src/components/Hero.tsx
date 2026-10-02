import { useEffect, useRef, type MutableRefObject } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Aurora from './Aurora'
import DetectorPreview from './DetectorPreview'
import { useReducedMotion } from '../hooks/useReducedMotion'
import type Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

interface HeroProps {
  lenisRef: MutableRefObject<Lenis | null>
}

export default function Hero({ lenisRef }: HeroProps) {
  const prefersReducedMotion = useReducedMotion()
  const heroRef = useRef<HTMLElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)
  const headline1Ref = useRef<HTMLSpanElement>(null)
  const headline2Ref = useRef<HTMLSpanElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const ctasRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)
  const auroraWrapRef = useRef<HTMLDivElement>(null)
  const navbarRef = useRef<HTMLElement | null>(null)
  const cursorGlowRef = useRef<HTMLDivElement>(null)
  const mouseXFn = useRef<((x: number) => void) | null>(null)
  const mouseYFn = useRef<((y: number) => void) | null>(null)

  // Cursor glow — quickTo
  useEffect(() => {
    if (prefersReducedMotion || !cursorGlowRef.current) return
    const el = cursorGlowRef.current
    mouseXFn.current = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3' })
    mouseYFn.current = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3' })
    const handler = (e: MouseEvent) => {
      mouseXFn.current?.(e.clientX)
      mouseYFn.current?.(e.clientY)
    }
    window.addEventListener('mousemove', handler, { passive: true })
    return () => window.removeEventListener('mousemove', handler)
  }, [prefersReducedMotion])

  // Card 3D tilt
  useEffect(() => {
    if (prefersReducedMotion || !cardRef.current) return
    const card = cardRef.current
    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect()
      if (rect.width === 0) return
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      gsap.to(card, { rotateY: x * 10, rotateX: -y * 10, transformPerspective: 900, duration: 0.4, ease: 'power2.out' })
    }
    const handleMouseLeave = () => {
      gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.6, ease: 'power3.out' })
    }
    card.addEventListener('mousemove', handleMouseMove)
    card.addEventListener('mouseleave', handleMouseLeave)
    return () => {
      card.removeEventListener('mousemove', handleMouseMove)
      card.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [prefersReducedMotion])

  // Page-load + scroll-scrub
  useEffect(() => {
    navbarRef.current = document.querySelector('header')
    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(
          [navbarRef.current, badgeRef.current, headline1Ref.current, headline2Ref.current,
           subRef.current, ctasRef.current, cardRef.current, scrollIndicatorRef.current],
          { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }
        )
        return
      }

      gsap.set(navbarRef.current, { y: -80, opacity: 0 })
      gsap.set(badgeRef.current, { y: 20, opacity: 0 })
      gsap.set(headline1Ref.current, { y: 40, opacity: 0 })
      gsap.set(headline2Ref.current, { y: 40, opacity: 0 })
      gsap.set(subRef.current, { y: 25, opacity: 0 })
      gsap.set(ctasRef.current, { y: 25, opacity: 0 })
      gsap.set(cardRef.current, { y: 50, opacity: 0, scale: 0.96, filter: 'blur(8px)' })
      gsap.set(scrollIndicatorRef.current, { opacity: 0 })

      const tl = gsap.timeline({ delay: 0.15 })
      tl.to(navbarRef.current, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' })
        .to(badgeRef.current, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }, '-=0.3')
        .to(headline1Ref.current, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }, '-=0.3')
        .to(headline2Ref.current, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }, '-=0.5')
        .to(subRef.current, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }, '-=0.4')
        .to(ctasRef.current, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }, '-=0.4')
        .to(cardRef.current, { y: 0, opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.8, ease: 'power3.out' }, '-=0.3')
        .to(scrollIndicatorRef.current, { opacity: 1, duration: 0.4 }, '-=0.2')

      const heroEl = heroRef.current
      if (!heroEl) return

      ScrollTrigger.create({
        trigger: heroEl,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.2,
        onUpdate: (self) => {
          const p = self.progress
          gsap.set([headline1Ref.current, headline2Ref.current], { y: p * -60 })
          gsap.set([subRef.current, ctasRef.current, badgeRef.current], { y: p * -30 })
          if (cardRef.current) {
            gsap.set(cardRef.current, { y: p * -80, rotateX: p * 8, scale: 1 - p * 0.08, opacity: 1 - p * 0.5 })
          }
          if (auroraWrapRef.current) {
            gsap.set(auroraWrapRef.current, { opacity: 1 - p * 0.9 })
          }
        },
      })
    }, heroRef)

    return () => ctx.revert()
  }, [prefersReducedMotion])

  const handleSeekScroll = (e: React.MouseEvent) => {
    e.preventDefault()
    if (lenisRef.current) {
      lenisRef.current.scrollTo('#how-it-works', { duration: 1.4, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })
    } else {
      document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleScrollDown = () => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(window.innerHeight, { duration: 1.2 })
    } else {
      window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })
    }
  }

  return (
    <section
      ref={heroRef}
      aria-label="Hero — AeRis AI content detection"
      style={{
        position: 'relative',
        minHeight: '100svh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: '#000000',
      }}
    >
      {/* ── Aurora layer: z-index 0, confined to top 65%, masked out at bottom ── */}
      <div
        ref={auroraWrapRef}
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '65%',
          zIndex: 0,
          opacity: 0.28,
          maskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)',
        }}
      >
        <Aurora
          colorStops={['#2b2b2b', '#bdbdbd', '#1a1a1a']}
          amplitude={0.55}
          blend={0.70}
          speed={0.35}
        />
      </div>

      {/* ── Text scrim: dark radial overlay between Aurora and content ── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          background: 'radial-gradient(ellipse 80% 60% at 50% 30%, rgba(0,0,0,0.60) 0%, rgba(0,0,0,0.85) 70%, #000000 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* ── Cursor glow: z-index 2 ── */}
      <div
        ref={cursorGlowRef}
        className="cursor-glow"
        aria-hidden="true"
        style={{ display: prefersReducedMotion ? 'none' : 'block' }}
      />

      {/* ── Hero content: z-index 10 ── */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          maxWidth: '1200px',
          padding: '8rem 1.5rem 6rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: '2rem',
        }}
      >
        {/* Eyebrow badge */}
        <div ref={badgeRef} className="will-animate">
          <span className="eyebrow-badge" role="note">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1" fill="none" />
              <circle cx="6" cy="6" r="2" fill="currentColor" />
            </svg>
            AI detection for image, video &amp; text
          </span>
        </div>

        {/* Headline */}
        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, lineHeight: 1.05, letterSpacing: '-0.04em' }}>
          <span
            ref={headline1Ref}
            className="will-animate"
            style={{ display: 'block', fontSize: 'clamp(3rem, 8vw, 6rem)', color: '#ffffff' }}
          >
            Know what&apos;s
          </span>
          <span
            ref={headline2Ref}
            className="gradient-text will-animate"
            style={{ display: 'block', fontSize: 'clamp(3rem, 8vw, 6rem)' }}
          >
            real.
          </span>
        </div>

        {/* Subheadline — min 4.5:1 contrast */}
        <p
          ref={subRef}
          className="will-animate"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 400,
            fontSize: 'clamp(1.0625rem, 2.5vw, 1.25rem)',
            color: 'rgba(255,255,255,0.80)',
            maxWidth: 520,
            lineHeight: 1.65,
          }}
        >
          AeRis uses advanced machine-learning signals to detect AI-generated
          images, videos, and text — with a single drag-and-drop or paste.
        </p>

        {/* CTAs */}
        <div
          ref={ctasRef}
          className="will-animate"
          style={{ display: 'flex', flexWrap: 'wrap', gap: '0.875rem', justifyContent: 'center' }}
        >
          <a href="#detector" className="btn-primary">
            Start detecting
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a href="#how-it-works" className="btn-secondary" onClick={handleSeekScroll}>
            See how it works
          </a>
        </div>

        {/* Floating detector preview card */}
        <div
          ref={cardRef}
          className="will-animate"
          style={{ width: '100%', maxWidth: 480, transformStyle: 'preserve-3d', marginTop: '0.5rem' }}
        >
          <DetectorPreview />
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="will-animate"
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
          cursor: 'pointer',
          zIndex: 10,
        }}
        onClick={handleScrollDown}
        role="button"
        aria-label="Scroll down to learn more"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && handleScrollDown()}
      >
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.40)' }}>
          Scroll
        </span>
        <div className="scroll-indicator" style={{ color: 'rgba(255,255,255,0.50)' }}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M10 4v12M6 12l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </section>
  )
}
