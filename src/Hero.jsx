import { useEffect, useRef } from 'react'

function StarField() {
  const ref = useRef(null)
  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    for (let i = 0; i < 420; i++) {
      const x = Math.random() * canvas.width
      const y = Math.random() * canvas.height
      const r = Math.random() * 1.4 + 0.2
      const a = Math.random() * 0.75 + 0.25
      ctx.beginPath()
      ctx.arc(x, y, r, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(255,255,255,${a})`
      ctx.fill()
    }
  }, [])
  return (
    <canvas
      ref={ref}
      style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}
    />
  )
}

function TokamakIcon() {
  return (
    <svg viewBox="0 0 40 40" style={{ width: 34, height: 34 }}>
      <circle cx="20" cy="20" r="15" fill="none" stroke="#4fc3f7" strokeWidth="2.5" />
      <circle cx="20" cy="20" r="8"  fill="none" stroke="#4fc3f7" strokeWidth="1.8" />
      {[0, 40, 80, 120, 160, 200, 240, 280, 320].map(deg => {
        const rad = (deg * Math.PI) / 180
        const x1 = 20 + 8.5  * Math.cos(rad)
        const y1 = 20 + 8.5  * Math.sin(rad)
        const x2 = 20 + 14.5 * Math.cos(rad)
        const y2 = 20 + 14.5 * Math.sin(rad)
        return <line key={deg} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#4fc3f7" strokeWidth="1.2" />
      })}
      <circle cx="20" cy="20" r="3" fill="#4fc3f7" opacity="0.8" />
    </svg>
  )
}

export default function Hero({ onNavigate }) {
  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      background: 'radial-gradient(ellipse at 75% 15%, #1c0800 0%, #06001a 45%, #000 100%)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <StarField />

      {/* Subtle nebula glow */}
      <div style={{
        position: 'absolute', top: '20%', left: '30%',
        width: 600, height: 400, borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(60,0,120,0.12) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 0,
      }} />

      {/* ── Sun ─────────────────────────────────────────────── */}
      <div
        onClick={() => onNavigate('sun')}
        title="Click to explore solar fusion"
        style={{
          position: 'absolute',
          top: -90, right: -90,
          width: 370, height: 370,
          borderRadius: '50%',
          background: 'radial-gradient(circle at 38% 35%, #fffde7 0%, #ffe566 20%, #ffa000 55%, #c84000 100%)',
          animation: 'sunGlow 3.5s ease-in-out infinite',
          cursor: 'pointer',
          zIndex: 2,
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          paddingBottom: 26,
          transition: 'transform 0.25s',
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.04)' }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)' }}
      >
        {/* Corona spikes */}
        {[20, 55, 95, 135, 165].map(deg => (
          <div key={deg} style={{
            position: 'absolute', top: '50%', left: '50%',
            width: 70, height: 3,
            background: 'linear-gradient(90deg, rgba(255,220,50,0.55), transparent)',
            transformOrigin: '0 50%',
            transform: `translate(0,-50%) rotate(${deg}deg)`,
            borderRadius: 2,
          }} />
        ))}
        <span style={{
          position: 'relative', zIndex: 1,
          fontSize: 10, fontFamily: 'Orbitron, sans-serif',
          color: 'rgba(255,240,180,0.92)', letterSpacing: 3,
          fontWeight: 700, textTransform: 'uppercase',
          textShadow: '0 0 12px rgba(255,200,0,1)',
        }}>
          TAP TO EXPLORE
        </span>
      </div>
      <div style={{
        position: 'absolute', top: 290, right: 115,
        fontSize: 10, color: 'rgba(255,210,100,0.6)',
        letterSpacing: 3, textTransform: 'uppercase', zIndex: 3,
      }}>
        The Sun ↗
      </div>

      {/* ── Earth ───────────────────────────────────────────── */}
      <div style={{
        position: 'absolute',
        bottom: 55, left: 70,
        width: 210, height: 210,
        borderRadius: '50%',
        background: `
          radial-gradient(circle at 36% 32%,
            #b3e5fc 0%, #0288d1 20%,
            #2e7d32 38%, #1a5c28 52%,
            #01579b 65%, #0a237a 82%,
            #050f2c 100%)
        `,
        boxShadow: '0 0 50px 12px rgba(20,80,200,0.28), inset -28px -28px 55px rgba(0,0,0,0.72)',
        zIndex: 2,
      }} />
      <div style={{
        position: 'absolute', bottom: 272, left: 122,
        fontSize: 10, color: 'rgba(100,180,255,0.65)',
        letterSpacing: 3, textTransform: 'uppercase', zIndex: 3,
      }}>
        Earth ↗
      </div>

      {/* ── Main Title ──────────────────────────────────────── */}
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-38%, -52%)',
        zIndex: 3,
        textAlign: 'center',
        animation: 'fadeUp 0.9s ease-out both',
      }}>
        <div style={{
          fontSize: 11, letterSpacing: 6,
          color: '#88ccff', marginBottom: 14,
          fontFamily: 'Orbitron, sans-serif',
          textTransform: 'uppercase',
        }}>
          Welcome to the future
        </div>

        <h1 style={{
          fontFamily: 'Orbitron, sans-serif',
          fontSize: 'clamp(42px, 6vw, 72px)',
          fontWeight: 900, lineHeight: 1.02,
          letterSpacing: -1, marginBottom: 10,
        }}>
          <span style={{ color: '#ffffff' }}>FUSION</span>
          <br />
          <span style={{
            background: 'linear-gradient(100deg, #4fc3f7 10%, #7c4dff 90%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>
            ENERGY
          </span>
        </h1>

        <p style={{
          fontSize: 14, letterSpacing: 1.5,
          color: 'rgba(255,255,255,0.55)',
          marginBottom: 30,
          fontWeight: 300,
        }}>
          Zero waste · Zero emissions · Near limitless fuel
        </p>

        {/* Hook stat card */}
        <div style={{
          display: 'inline-block',
          background: 'rgba(255,140,0,0.07)',
          border: '1px solid rgba(255,140,0,0.32)',
          borderRadius: 14, padding: '16px 28px',
          backdropFilter: 'blur(6px)',
        }}>
          <div style={{
            fontFamily: 'Orbitron, sans-serif',
            fontSize: 46, fontWeight: 900,
            color: '#ffa726', lineHeight: 1,
          }}>
            3.15 MJ
          </div>
          <div style={{
            fontSize: 10, color: '#ffcc88',
            letterSpacing: 2.5, marginTop: 6,
            textTransform: 'uppercase',
          }}>
            NIF Ignition · Dec 5, 2022
          </div>
          <div style={{
            fontSize: 11, color: 'rgba(255,200,100,0.55)',
            marginTop: 4,
          }}>
            First confirmed fusion ignition in history
          </div>
        </div>
      </div>

      {/* ── Tokamak Button ──────────────────────────────────── */}
      <div
        onClick={() => onNavigate('tokamak')}
        title="Explore a Tokamak reactor"
        style={{
          position: 'absolute',
          bottom: 38, right: 42,
          width: 92, height: 92,
          borderRadius: '50%',
          background: 'rgba(4,12,30,0.85)',
          border: '2px solid #4fc3f7',
          cursor: 'pointer',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: 2,
          boxShadow: '0 0 18px rgba(79,195,247,0.28)',
          zIndex: 3,
          transition: 'box-shadow 0.2s, transform 0.2s',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.boxShadow = '0 0 32px rgba(79,195,247,0.55)'
          e.currentTarget.style.transform = 'scale(1.07)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.boxShadow = '0 0 18px rgba(79,195,247,0.28)'
          e.currentTarget.style.transform = 'scale(1)'
        }}
      >
        <TokamakIcon />
        <div style={{
          fontSize: 7, fontFamily: 'Orbitron, sans-serif',
          color: '#4fc3f7', letterSpacing: 1.5, fontWeight: 700,
        }}>
          TOKAMAK
        </div>
      </div>
    </div>
  )
}
