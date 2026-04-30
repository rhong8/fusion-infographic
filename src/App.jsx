import { useState } from 'react'
import Hero from './Hero.jsx'
import Sun from './Sun.jsx'
import Tokamak from './Tokamak.jsx'
import WorksCited from './WorksCited.jsx'

export default function App() {
  const [page, setPage] = useState('hero')

  return (
    <>
      {/* Works Cited button — always visible */}
      {page !== 'works-cited' && (
        <button
          onClick={() => setPage('works-cited')}
          style={{
            position: 'fixed',
            bottom: 20,
            right: 20,
            zIndex: 999,
            background: 'rgba(0,0,0,0.7)',
            border: '1px solid rgba(255,255,255,0.25)',
            color: 'rgba(255,255,255,0.6)',
            padding: '7px 14px',
            borderRadius: 8,
            cursor: 'pointer',
            fontSize: 12,
            backdropFilter: 'blur(4px)',
            transition: 'color 0.2s, border-color 0.2s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.color = '#fff'
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.55)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.color = 'rgba(255,255,255,0.6)'
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'
          }}
        >
          Works Cited
        </button>
      )}

      {page === 'hero'        && <Hero        onNavigate={setPage} />}
      {page === 'sun'         && <Sun         onNavigate={setPage} />}
      {page === 'tokamak'     && <Tokamak     onNavigate={setPage} />}
      {page === 'works-cited' && <WorksCited  onNavigate={setPage} />}
    </>
  )
}
