import { useState, useEffect, useRef } from 'react'
import type Lenis from 'lenis'

interface NavbarProps {
  onScrollTo?: (id: string) => void
  lenisRef?: React.MutableRefObject<Lenis | null>
}

// Three links only — Pricing removed
const links = [
  { label: 'Detector', href: 'detector' },
  { label: 'How it works', href: 'how-it-works' },
  { label: 'FAQ', href: 'faq' },
]

export default function Navbar({ onScrollTo, lenisRef }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const handleNavLink = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    setMobileOpen(false)
    if (onScrollTo) {
      onScrollTo(id)
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    setMobileOpen(false)
    if (lenisRef?.current) {
      lenisRef.current.scrollTo(0, { duration: 1.2 })
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <header
      ref={navRef}
      className="will-animate"
      style={{
        position: 'fixed', top: 0, left: 0, right: 0,
        zIndex: 50,
        display: 'flex',
        justifyContent: 'center',
        padding: scrolled ? '0.75rem 1.5rem' : '1.5rem 2rem',
        transition: 'padding 0.4s ease',
      }}
    >
      <nav
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          maxWidth: '1200px',
          padding: scrolled ? '0.5rem 1.5rem' : '0',
          background: scrolled ? 'rgba(0,0,0,0.80)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px) saturate(1.4)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(1.4)' : 'none',
          border: scrolled ? '1px solid rgba(255,255,255,0.08)' : '1px solid transparent',
          borderRadius: scrolled ? '9999px' : '0',
          transition: 'all 0.4s ease',
        }}
        aria-label="Main navigation"
      >
        {/* Wordmark only — no logo icon, larger size */}
        <a
          href="/"
          onClick={handleLogoClick}
          style={{ textDecoration: 'none', lineHeight: 1 }}
          aria-label="AeRis — scroll to top"
        >
          <span
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 600,
              fontSize: 'clamp(1.25rem, 3vw, 1.5rem)',
              letterSpacing: '-0.035em',
              color: '#ffffff',
            }}
          >
            AeRis
          </span>
        </a>

        {/* Desktop links — centered/right */}
        <ul
          role="list"
          style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', listStyle: 'none', margin: 0, padding: 0 }}
          className="hidden sm:flex"
        >
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={`#${link.href}`}
                onClick={(e) => handleNavLink(e, link.href)}
                style={{
                  display: 'block',
                  padding: '0.375rem 0.875rem',
                  borderRadius: '9999px',
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 500,
                  fontSize: '0.875rem',
                  color: 'rgba(255,255,255,0.65)',
                  textDecoration: 'none',
                  transition: 'color 0.2s, background 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#ffffff'
                  e.currentTarget.style.background = 'rgba(255,255,255,0.08)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'rgba(255,255,255,0.65)'
                  e.currentTarget.style.background = 'transparent'
                }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          className="flex sm:hidden"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{
            background: 'transparent',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: '0.5rem',
            padding: '0.375rem 0.5rem',
            cursor: 'pointer',
            color: '#ffffff',
          }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            {mobileOpen ? (
              <path d="M2 2l14 14M16 2L2 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            ) : (
              <>
                <path d="M2 4.5h14M2 9h14M2 13.5h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </>
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu dropdown */}
      {mobileOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: '1rem',
            right: '1rem',
            background: 'rgba(0,0,0,0.92)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.10)',
            borderRadius: '0.75rem',
            padding: '0.75rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.25rem',
          }}
          role="menu"
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={`#${link.href}`}
              onClick={(e) => handleNavLink(e, link.href)}
              role="menuitem"
              style={{
                display: 'block',
                padding: '0.625rem 1rem',
                borderRadius: '0.5rem',
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.9375rem',
                fontWeight: 500,
                color: 'rgba(255,255,255,0.80)',
                textDecoration: 'none',
                transition: 'background 0.15s, color 0.15s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.08)'
                e.currentTarget.style.color = '#ffffff'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.color = 'rgba(255,255,255,0.80)'
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  )
}
