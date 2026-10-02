import { useState } from 'react'

type Tab = 'image' | 'video' | 'text'

const tabLabels: { key: Tab; label: string; icon: React.ReactNode }[] = [
  {
    key: 'image',
    label: 'Image',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <rect x="1" y="2" width="14" height="11" rx="2" stroke="currentColor" strokeWidth="1.25" fill="none" />
        <circle cx="5.5" cy="6" r="1.25" fill="currentColor" />
        <path d="M1 10l3.5-3.5 2.5 2.5 2.5-2.5 4.5 4.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    ),
  },
  {
    key: 'video',
    label: 'Video',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <rect x="1" y="3" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.25" fill="none" />
        <path d="M11 6l4-2v8l-4-2V6z" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" fill="none" />
      </svg>
    ),
  },
  {
    key: 'text',
    label: 'Text',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M2 3h12M2 6h8M2 9h10M2 12h6" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      </svg>
    ),
  },
]

function DropzoneImage() {
  return (
    <div className="dropzone flex flex-col items-center justify-center gap-3 p-8 min-h-[140px] cursor-pointer group">
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true" style={{ color: 'rgba(255,255,255,0.50)' }}>
        <rect x="3" y="5" width="30" height="22" rx="3" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <circle cx="11" cy="13" r="3" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path d="M3 22l8-7 5 5 5-5 10 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M18 31v-4M15 31h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      <div style={{ textAlign: 'center' }}>
        <p style={{ color: 'rgba(255,255,255,0.80)', fontSize: '0.875rem', fontWeight: 500 }}>Drop an image here</p>
        <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.75rem', marginTop: '0.25rem' }}>JPG, PNG, WEBP, GIF · up to 20 MB</p>
      </div>
    </div>
  )
}

function DropzoneVideo() {
  return (
    <div className="dropzone flex flex-col items-center justify-center gap-3 p-8 min-h-[140px] cursor-pointer">
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true" style={{ color: 'rgba(255,255,255,0.50)' }}>
        <rect x="2" y="6" width="22" height="18" rx="3" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path d="M24 13l10-5v20l-10-5V13z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="none" />
      </svg>
      <div style={{ textAlign: 'center' }}>
        <p style={{ color: 'rgba(255,255,255,0.80)', fontSize: '0.875rem', fontWeight: 500 }}>Drop a video here</p>
        <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.75rem', marginTop: '0.25rem' }}>MP4, MOV, WEBM · up to 500 MB</p>
      </div>
    </div>
  )
}

function TextInput() {
  return (
    <div style={{ padding: '1.25rem', minHeight: '140px' }}>
      <textarea
        placeholder="Paste or type your text here to analyze it for AI generation patterns..."
        rows={5}
        style={{
          width: '100%',
          background: 'transparent',
          border: '1.5px dashed rgba(255,255,255,0.18)',
          borderRadius: '0.75rem',
          color: 'rgba(255,255,255,0.85)',
          fontFamily: "'Inter', sans-serif",
          fontSize: '0.875rem',
          lineHeight: 1.6,
          padding: '0.875rem',
          resize: 'none',
          outline: 'none',
          transition: 'border-color 0.2s',
        }}
        onFocus={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.40)')}
        onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.18)')}
        aria-label="Text input for AI detection"
      />
    </div>
  )
}

export default function DetectorPreview() {
  const [activeTab, setActiveTab] = useState<Tab>('image')

  return (
    <div
      id="detector"
      className="glass-card"
      style={{ width: '100%', overflow: 'hidden', position: 'relative' }}
      role="region"
      aria-label="AeRis detector preview"
    >
      {/* Subtle top-edge highlight */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
          width: '60%', height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)',
        }}
      />

      {/* Header */}
      <div style={{ padding: '1rem 1.25rem 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: '0.9375rem', color: '#ffffff', letterSpacing: '-0.02em' }}>
          AeRis Detector
        </span>
        {/* Live badge — monochrome */}
        <span
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.375rem',
            padding: '0.25rem 0.625rem', borderRadius: '9999px',
            background: 'rgba(255,255,255,0.10)',
            border: '1px solid rgba(255,255,255,0.20)',
            fontSize: '0.6875rem', fontWeight: 500, color: '#ffffff',
          }}
        >
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#ffffff', opacity: 0.9 }} />
          Live
        </span>
      </div>

      {/* Tabs */}
      <div role="tablist" aria-label="Detection type" style={{ display: 'flex', gap: '0.375rem', padding: '0.875rem 1.25rem 0.75rem' }}>
        {tabLabels.map(({ key, label, icon }) => (
          <button
            key={key}
            role="tab"
            aria-selected={activeTab === key}
            aria-controls={`tabpanel-${key}`}
            onClick={() => setActiveTab(key)}
            style={{
              flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
              gap: '0.375rem', padding: '0.5rem 0.75rem', borderRadius: '0.625rem',
              fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: '0.8125rem',
              cursor: 'pointer', transition: 'background 0.2s, border-color 0.2s, color 0.2s',
              ...(activeTab === key
                ? { background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.25)', color: '#ffffff' }
                : { background: 'transparent', border: '1px solid transparent', color: 'rgba(255,255,255,0.50)' }),
            }}
          >
            {icon}
            {label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div id={`tabpanel-${activeTab}`} role="tabpanel" aria-label={`${activeTab} detection panel`} style={{ padding: '0 0.5rem' }}>
        {activeTab === 'image' && <DropzoneImage />}
        {activeTab === 'video' && <DropzoneVideo />}
        {activeTab === 'text' && <TextInput />}
      </div>

      {/* Footer CTA */}
      <div style={{ padding: '0.875rem 1.25rem 1.25rem' }}>
        <button
          className="btn-primary"
          style={{ width: '100%', fontSize: '0.875rem', padding: '0.625rem 1.25rem' }}
          aria-label="Analyze this content for AI generation"
        >
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
            <circle cx="7.5" cy="7.5" r="6" stroke="currentColor" strokeWidth="1.25" fill="none" />
            <path d="M5 7.5l2 2 3.5-3.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Analyze content
        </button>
      </div>
    </div>
  )
}
