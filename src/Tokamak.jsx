import { useState } from 'react'
import Stats from './Stats.jsx'
import Chart from './Chart.jsx'
import Timeline from './Timeline.jsx'

/* ── Tokamak cross-section (top-down view) ────────────────────────────────
   Concentric rings from outside in:
   Cryostat → TF Coils → Vacuum Vessel → Blanket → First Wall → Plasma → Solenoid
──────────────────────────────────────────────────────────────────────────── */

const LAYERS = [
  {
    id: 'solenoid',
    r: 32,
    color: '#1a3a70',
    stroke: '#4fc3f7',
    label: 'Central Solenoid',
    desc: 'The central solenoid pulses an electric current through the plasma. This creates the magnetic field that completes the confinement geometry.',
    labelAngle: 195,
    labelR: 240,
  },
  {
    id: 'plasma',
    r: 32,
    outerR: 105,
    color: 'plasma',
    stroke: null,
    label: 'Plasma (150 M°C)',
    desc: 'Deuterium-tritium plasma at 150 million degrees. Ten times hotter than the Sun\'s core. This is where fusion happens.',
    labelAngle: 90,
    labelR: 220,
  },
  {
    id: 'firstwall',
    r: 105,
    outerR: 117,
    color: '#2e4a5c',
    stroke: '#5a8aa0',
    label: 'First Wall',
    desc: 'The innermost wall faces the plasma directly. It handles up to 2 megawatts of heat per square meter, alongside constant neutron bombardment.',
    labelAngle: 295,
    labelR: 222,
  },
  {
    id: 'blanket',
    r: 117,
    outerR: 142,
    color: '#0d2d18',
    stroke: '#1e5030',
    label: 'Breeding Blanket',
    desc: 'The blanket absorbs neutrons and breeds tritium fuel from lithium. It also converts that neutron energy into heat that drives the power cycle.',
    labelAngle: 330,
    labelR: 228,
  },
  {
    id: 'vessel',
    r: 142,
    outerR: 162,
    color: '#1c2c3c',
    stroke: '#3a5570',
    label: 'Vacuum Vessel',
    desc: 'A double-walled steel vessel that holds a vacuum better than low Earth orbit. The plasma cannot exist without it.',
    labelAngle: 30,
    labelR: 230,
  },
  {
    id: 'coils',
    r: 162,
    outerR: 198,
    color: '#102040',
    stroke: '#2a5090',
    label: 'Superconducting Coils',
    desc: 'Superconducting coils cooled to 269 degrees below zero carry 68,000 amperes. They generate the magnetic field that holds the plasma in place.',
    labelAngle: 145,
    labelR: 228,
  },
  {
    id: 'cryostat',
    r: 198,
    outerR: 222,
    color: '#111c28',
    stroke: '#28384a',
    label: 'Cryostat',
    desc: 'The outermost vessel insulates everything inside from room temperature. Without it, the superconducting coils cannot function.',
    labelAngle: 225,
    labelR: 230,
  },
]

const NUM_TF_COILS = 18

function TokamakDiagram({ active, setActive }) {
  const cx = 250, cy = 250

  function polarToXY(angle, r) {
    const rad = ((angle - 90) * Math.PI) / 180
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
  }

  function labelPos(layer) {
    const p = polarToXY(layer.labelAngle, layer.labelR)
    const anchor = p.x > cx + 10 ? 'start' : p.x < cx - 10 ? 'end' : 'middle'
    return { ...p, anchor }
  }

  function lineEnd(layer) {
    const innerR = layer.id === 'plasma' ? 105 : (layer.outerR ?? layer.r)
    return polarToXY(layer.labelAngle, innerR + 4)
  }

  const activeLayer = LAYERS.find(l => l.id === active)

  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: 520 }}>
      <svg
        viewBox="0 0 500 500"
        style={{ width: '100%', height: 'auto' }}
      >
        <defs>
          {/* Plasma gradient */}
          <radialGradient id="plasmaGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#fff8f8" stopOpacity="0.9" />
            <stop offset="25%"  stopColor="#ff80ff" stopOpacity="0.95" />
            <stop offset="60%"  stopColor="#4444cc" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#000060" stopOpacity="0.5" />
          </radialGradient>
          <filter id="plasmaBlur">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="glow4">
            <feGaussianBlur stdDeviation="4" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Background */}
        <rect width="500" height="500" fill="#050a14" />

        {/* Cryostat */}
        <circle cx={cx} cy={cy} r={222} fill="#0d1520" stroke="#1e2d3e" strokeWidth="1" />
        <circle cx={cx} cy={cy} r={198} fill="#111c28" stroke="#28384a" strokeWidth="1.5" />

        {/* TF coil segments (18 segments around the ring) */}
        {Array.from({ length: NUM_TF_COILS }).map((_, i) => {
          const angle1 = (i * 360) / NUM_TF_COILS
          const angle2 = ((i + 0.72) * 360) / NUM_TF_COILS
          const gap = 2

          function arcPath(innerR, outerR, a1, a2) {
            const toRad = d => ((d - 90) * Math.PI) / 180
            const r1 = toRad(a1), r2 = toRad(a2)
            const p1 = { x: cx + innerR * Math.cos(r1), y: cy + innerR * Math.sin(r1) }
            const p2 = { x: cx + outerR * Math.cos(r1), y: cy + outerR * Math.sin(r1) }
            const p3 = { x: cx + outerR * Math.cos(r2), y: cy + outerR * Math.sin(r2) }
            const p4 = { x: cx + innerR * Math.cos(r2), y: cy + innerR * Math.sin(r2) }
            return `M ${p1.x} ${p1.y} L ${p2.x} ${p2.y} A ${outerR} ${outerR} 0 0 1 ${p3.x} ${p3.y} L ${p4.x} ${p4.y} A ${innerR} ${innerR} 0 0 0 ${p1.x} ${p1.y} Z`
          }

          return (
            <path
              key={i}
              d={arcPath(164, 196, angle1 + gap / 2, angle2 - gap / 2)}
              fill={active === 'coils' ? '#1a3a7a' : '#142050'}
              stroke="#2a5090"
              strokeWidth="0.8"
            />
          )
        })}

        {/* Inner of coil ring */}
        <circle cx={cx} cy={cy} r={162} fill="#050a14" />

        {/* Vacuum vessel */}
        <circle cx={cx} cy={cy} r={162} fill="#1c2c3c" stroke="#3a5570" strokeWidth="1" />
        <circle cx={cx} cy={cy} r={142} fill="#050a14" />

        {/* Blanket */}
        <circle cx={cx} cy={cy} r={142} fill="#0d2d18" stroke="#1e5030" strokeWidth="1" />
        <circle cx={cx} cy={cy} r={117} fill="#050a14" />

        {/* First wall */}
        <circle cx={cx} cy={cy} r={117} fill="#2e4a5c" stroke="#5a8aa0" strokeWidth="1" />
        <circle cx={cx} cy={cy} r={105} fill="#050a14" />

        {/* Plasma (annular ring) */}
        <circle
          cx={cx} cy={cy} r={105}
          fill="url(#plasmaGrad)"
          filter="url(#plasmaBlur)"
          style={{ animation: 'plasmaFlicker 2.5s ease-in-out infinite' }}
        />
        {/* Knock out the center hole for the solenoid */}
        <circle cx={cx} cy={cy} r={32} fill="#050a14" />

        {/* Central solenoid */}
        <circle cx={cx} cy={cy} r={32} fill="#1a3a70" stroke="#4fc3f7" strokeWidth="1.5" />
        <circle cx={cx} cy={cy} r={20} fill="none" stroke="#4fc3f780" strokeWidth="1" strokeDasharray="3 2" />
        <text x={cx} y={cy + 4} textAnchor="middle" fill="#4fc3f7" fontSize="8" fontWeight="700" opacity="0.8">CS</text>

        {/* Active highlight ring */}
        {activeLayer && activeLayer.id !== 'plasma' && activeLayer.id !== 'solenoid' && (
          <circle
            cx={cx} cy={cy}
            r={(activeLayer.r + (activeLayer.outerR ?? activeLayer.r)) / 2}
            fill="none"
            stroke={activeLayer.stroke ?? '#fff'}
            strokeWidth={(activeLayer.outerR ?? activeLayer.r) - activeLayer.r}
            strokeOpacity="0.25"
          />
        )}

        {/* Label lines and text */}
        {LAYERS.map(layer => {
          const lp = labelPos(layer)
          const le = lineEnd(layer)
          const isActive = active === layer.id
          return (
            <g
              key={layer.id}
              onClick={() => setActive(active === layer.id ? null : layer.id)}
              style={{ cursor: 'pointer' }}
            >
              <line
                x1={le.x} y1={le.y}
                x2={lp.x} y2={lp.y}
                stroke={isActive ? layer.stroke ?? '#fff' : 'rgba(255,255,255,0.2)'}
                strokeWidth={isActive ? 1.5 : 1}
                strokeDasharray={isActive ? 'none' : '3 2'}
              />
              <circle
                cx={le.x} cy={le.y} r={3}
                fill={isActive ? layer.stroke ?? '#fff' : 'rgba(255,255,255,0.35)'}
              />
              <text
                x={lp.x + (lp.anchor === 'start' ? 6 : lp.anchor === 'end' ? -6 : 0)}
                y={lp.y}
                textAnchor={lp.anchor}
                fill={isActive ? '#fff' : 'rgba(255,255,255,0.58)'}
                fontSize={isActive ? 11 : 10}
                fontWeight={isActive ? 700 : 400}
                fontFamily="Inter, sans-serif"
              >
                {layer.label}
              </text>
            </g>
          )
        })}

        {/* Center label */}
        <text
          x={cx} y={cy + 68}
          textAnchor="middle"
          fill="rgba(255,255,255,0.18)"
          fontSize="9"
          fontFamily="Orbitron, sans-serif"
          letterSpacing="2"
        >
          TOP-DOWN VIEW
        </text>
      </svg>

      {/* Description tooltip under diagram */}
      {activeLayer && (
        <div style={{
          marginTop: 8,
          background: `${activeLayer.stroke ?? '#4fc3f7'}12`,
          border: `1px solid ${activeLayer.stroke ?? '#4fc3f7'}40`,
          borderRadius: 12, padding: '12px 16px',
          animation: 'fadeIn 0.2s ease-out',
        }}>
          <div style={{
            fontSize: 11, fontWeight: 700, color: activeLayer.stroke ?? '#4fc3f7',
            marginBottom: 4, letterSpacing: 0.5,
          }}>
            {activeLayer.label}
          </div>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)', lineHeight: 1.6 }}>
            {activeLayer.desc}
          </p>
        </div>
      )}
      {!activeLayer && (
        <p style={{
          marginTop: 8, fontSize: 11,
          color: 'rgba(255,255,255,0.25)',
          textAlign: 'center', letterSpacing: 0.5,
        }}>
          Click any label to learn about that component
        </p>
      )}
    </div>
  )
}

export default function Tokamak({ onNavigate }) {
  const [activeLayer, setActiveLayer] = useState(null)
  const [showStats, setShowStats] = useState(false)

  return (
    <>
      {showStats && <Stats onClose={() => setShowStats(false)} />}

      <div style={{
        width: '100vw', minHeight: '100vh',
        background: 'radial-gradient(ellipse at 50% 0%, #040e22 0%, #020810 60%, #000 100%)',
        padding: '28px 20px 60px',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
      }}>
        {/* ── Header ─────────────────────────────────────────── */}
        <div style={{
          width: '100%', maxWidth: 1000,
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', marginBottom: 20,
          flexWrap: 'wrap', gap: 12,
        }}>
          <button
            onClick={() => onNavigate('hero')}
            style={{
              background: 'rgba(255,255,255,0.07)',
              border: '1px solid rgba(255,255,255,0.18)',
              color: '#ccc', padding: '8px 18px',
              borderRadius: 8, cursor: 'pointer',
              fontSize: 13,
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.13)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)' }}
          >
            ← Back
          </button>

          <div style={{ textAlign: 'center', flex: 1 }}>
            <div style={{
              fontSize: 10, letterSpacing: 5,
              color: '#4fc3f7', textTransform: 'uppercase',
              fontFamily: 'Orbitron, sans-serif', marginBottom: 2,
            }}>
              Inside the Machine
            </div>
            <h1 style={{
              fontFamily: 'Orbitron, sans-serif',
              fontSize: 'clamp(22px, 4vw, 34px)',
              fontWeight: 900, color: '#fff',
            }}>
              The Tokamak
            </h1>
          </div>

          {/* STATS button */}
          <button
            onClick={() => setShowStats(true)}
            style={{
              background: 'rgba(76,175,80,0.14)',
              border: '2px solid #4caf50',
              color: '#4caf50',
              padding: '10px 22px',
              borderRadius: 10, cursor: 'pointer',
              fontSize: 13, fontWeight: 700,
              fontFamily: 'Orbitron, sans-serif',
              letterSpacing: 2,
              boxShadow: '0 0 16px rgba(76,175,80,0.25)',
              transition: 'background 0.2s, box-shadow 0.2s, transform 0.15s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(76,175,80,0.25)'
              e.currentTarget.style.boxShadow = '0 0 26px rgba(76,175,80,0.4)'
              e.currentTarget.style.transform = 'scale(1.05)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(76,175,80,0.14)'
              e.currentTarget.style.boxShadow = '0 0 16px rgba(76,175,80,0.25)'
              e.currentTarget.style.transform = 'scale(1)'
            }}
          >
            STATS
          </button>
        </div>

        <p style={{
          fontSize: 13, color: 'rgba(255,255,255,0.5)',
          maxWidth: 560, textAlign: 'center',
          marginBottom: 32, lineHeight: 1.65,
        }}>
          A tokamak uses powerful superconducting magnets to confine superheated plasma in a
          donut-shaped magnetic field. The hydrogen isotopes inside are forced together until
          they fuse. The reaction releases more energy than it costs to sustain.
        </p>

        {/* ── Diagram + Info panel ─────────────────────────── */}
        <div style={{
          width: '100%', maxWidth: 1000,
          display: 'flex',
          gap: 28, flexWrap: 'wrap',
          justifyContent: 'center',
          marginBottom: 40,
        }}>
          <TokamakDiagram active={activeLayer} setActive={setActiveLayer} />

          {/* Side info */}
          <div style={{
            flex: '1 1 240px', maxWidth: 300,
            display: 'flex', flexDirection: 'column', gap: 14,
            justifyContent: 'flex-start',
            paddingTop: 10,
          }}>
            <div style={{
              fontSize: 10, letterSpacing: 3, color: '#4fc3f7',
              textTransform: 'uppercase', marginBottom: 2,
            }}>
              Key Layers
            </div>
            {LAYERS.slice().reverse().map(layer => (
              <div
                key={layer.id}
                onClick={() => setActiveLayer(activeLayer === layer.id ? null : layer.id)}
                style={{
                  display: 'flex', alignItems: 'flex-start', gap: 10,
                  padding: '10px 14px', borderRadius: 10,
                  background: activeLayer === layer.id
                    ? `${layer.stroke ?? '#4fc3f7'}15`
                    : 'rgba(255,255,255,0.025)',
                  border: `1px solid ${activeLayer === layer.id
                    ? (layer.stroke ?? '#4fc3f7') + '55'
                    : 'rgba(255,255,255,0.07)'}`,
                  cursor: 'pointer',
                  transition: 'all 0.18s',
                }}
                onMouseEnter={e => {
                  if (activeLayer !== layer.id) {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'
                  }
                }}
                onMouseLeave={e => {
                  if (activeLayer !== layer.id) {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.025)'
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
                  }
                }}
              >
                <div style={{
                  width: 10, height: 10,
                  borderRadius: '50%', marginTop: 3, flexShrink: 0,
                  background: layer.stroke ?? '#4fc3f7',
                  boxShadow: activeLayer === layer.id
                    ? `0 0 8px ${layer.stroke ?? '#4fc3f7'}`
                    : 'none',
                }} />
                <div>
                  <div style={{
                    fontSize: 11, fontWeight: 700,
                    color: activeLayer === layer.id ? '#fff' : 'rgba(255,255,255,0.75)',
                    marginBottom: 2,
                  }}>
                    {layer.label}
                  </div>
                  <div style={{
                    fontSize: 10, color: 'rgba(255,255,255,0.35)',
                    lineHeight: 1.5, display: activeLayer === layer.id ? 'block' : 'none',
                  }}>
                    {layer.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── NIF Chart ───────────────────────────────────────── */}
        <div style={{ width: '100%', maxWidth: 900, marginBottom: 48 }}>
          <Chart />
        </div>

        {/* ── Timeline ────────────────────────────────────────── */}
        <div style={{
          width: '100%', maxWidth: 900,
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(79,195,247,0.12)',
          borderRadius: 20, padding: '32px 28px',
        }}>
          <Timeline />
        </div>
      </div>
    </>
  )
}
