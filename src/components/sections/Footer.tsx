interface FooterProps {
  onScrollTo?: (id: string) => void
}

const navLinks = [
  { label: 'Detector', href: 'detector' },
  { label: 'How it works', href: 'how-it-works' },
  { label: 'FAQ', href: 'faq' },
]

export default function Footer({ onScrollTo }: FooterProps) {
  const handleLink = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    if (onScrollTo) onScrollTo(id)
    else document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer
      style={{
        background: '#000000',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        padding: '3rem 1.5rem',
      }}
      role="contentinfo"
    >
      <div
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.5rem',
        }}
      >
        {/* Wordmark — text only */}
        <span
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 600,
            fontSize: '1.125rem',
            letterSpacing: '-0.03em',
            color: '#ffffff',
          }}
        >
          AeRis
        </span>

        {/* Links */}
        <nav aria-label="Footer navigation">
          <ul style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem', listStyle: 'none', padding: 0, margin: 0 }}>
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={`#${link.href}`}
                  onClick={(e) => handleLink(e, link.href)}
                  style={{
                    display: 'block',
                    padding: '0.375rem 0.75rem',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    color: 'rgba(255,255,255,0.45)',
                    textDecoration: 'none',
                    borderRadius: '0.375rem',
                    transition: 'color 0.15s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Legal */}
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', color: 'rgba(255,255,255,0.25)' }}>
          &copy; {new Date().getFullYear()} AeRis. For demonstration purposes only.
        </p>
      </div>
    </footer>
  )
}
