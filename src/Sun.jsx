import { useState } from 'react'

const STEPS = [
  {
    title: 'Step 1 — Proton–Proton Fusion',
    eq: 'p + p → ²H + e⁺ + νₑ',
    desc: 'Two protons collide and quantum-tunnel through the Coulomb barrier. One proton undergoes beta-plus decay, converting to a neutron and releasing a positron (e⁺) and an electron neutrino (νₑ). The result is deuterium — a nucleus with one proton and one neutron.',
    color: '#ff7043',
    energy: '0.42 MeV',
  },
  {
    title: 'Step 2 — Deuterium + Proton',
    eq: '²H + p → ³He + γ',
    desc: 'A deuterium nucleus fuses with a third proton to form helium-3. The excess energy is radiated as a gamma-ray photon (γ) — high-energy electromagnetic radiation that slowly diffuses outward over thousands of years.',
    color: '#ffca28',
    energy: '5.49 MeV',
  },
  {
    title: 'Step 3 — Helium-3 Fusion',
    eq: '³He + ³He → ⁴He + 2p + 12.86 MeV',
    desc: 'Two helium-3 nuclei fuse to form stable helium-4 (an alpha particle), releasing two protons that re-enter the cycle. This step releases the most energy — 12.86 MeV — and is what makes the Sun shine.',
    color: '#29b6f6',
    energy: '12.86 MeV',
  },
]

function ParticleStep({ step }) {
  const s = STEPS[step]
  const diagrams = [
    // Step 0: p + p → ²H + e⁺ + νₑ
    <svg key="0" viewBox="0 0 340 90" style={{ width: '100%', maxWidth: 340 }}>
      <defs>
        <marker id="arr0" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill={s.color} />
        </marker>
      </defs>
      {/* p + p → ²H */}
      <circle cx="35"  cy="45" r="18" fill="#ef5350" />
      <text x="35"  y="50" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="700">p</text>
      <text x="62"  y="50" fill={s.color} fontSize="22" textAnchor="middle">+</text>
      <circle cx="88"  cy="45" r="18" fill="#ef5350" />
      <text x="88"  y="50" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="700">p</text>
      <line x1="110" y1="45" x2="140" y2="45" stroke={s.color} strokeWidth="2" markerEnd="url(#arr0)" />
      {/* ²H */}
      <circle cx="164" cy="54" r="15" fill="#ef5350" />
      <circle cx="178" cy="36" r="15" fill="#78909c" />
      <text x="171" y="50" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="700">²H</text>
      <text x="203" y="50" fill={s.color} fontSize="18" textAnchor="middle">+</text>
      {/* e⁺ */}
      <circle cx="224" cy="32" r="12" fill="#e91e63" />
      <text x="224" y="36" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="700">e⁺</text>
      <text x="245" y="50" fill={s.color} fontSize="18" textAnchor="middle">+</text>
      {/* νₑ */}
      <circle cx="266" cy="62" r="10" fill="#9c27b0" />
      <text x="266" y="66" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="700">νₑ</text>
    </svg>,

    // Step 1: ²H + p → ³He + γ
    <svg key="1" viewBox="0 0 320 90" style={{ width: '100%', maxWidth: 320 }}>
      <defs>
        <marker id="arr1" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill={s.color} />
        </marker>
      </defs>
      <circle cx="28" cy="52" r="14" fill="#ef5350" />
      <circle cx="42" cy="34" r="14" fill="#78909c" />
      <text x="35" y="50" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="700">²H</text>
      <text x="68" y="50" fill={s.color} fontSize="20" textAnchor="middle">+</text>
      <circle cx="90" cy="45" r="16" fill="#ef5350" />
      <text x="90" y="50" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="700">p</text>
      <line x1="110" y1="45" x2="140" y2="45" stroke={s.color} strokeWidth="2" markerEnd="url(#arr1)" />
      {/* ³He */}
      <circle cx="163" cy="55" r="14" fill="#ef5350" />
      <circle cx="177" cy="35" r="14" fill="#78909c" />
      <circle cx="170" cy="55" r="14" fill="#42a5f5" />
      <text x="170" y="53" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="700">³He</text>
      <text x="198" y="50" fill={s.color} fontSize="20" textAnchor="middle">+</text>
      {/* γ */}
      <circle cx="222" cy="45" r="14" fill="#fff176" />
      <text x="222" y="50" textAnchor="middle" fill="#333" fontSize="14" fontWeight="900">γ</text>
      <text x="248" y="35" fill="#fff176" fontSize="9" opacity="0.7">gamma</text>
      <text x="248" y="46" fill="#fff176" fontSize="9" opacity="0.7">ray</text>
    </svg>,

    // Step 2: ³He + ³He → ⁴He + 2p + energy
    <svg key="2" viewBox="0 0 360 95" style={{ width: '100%', maxWidth: 360 }}>
      <defs>
        <marker id="arr2" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill={s.color} />
        </marker>
      </defs>
      {/* ³He + ³He */}
      <circle cx="20" cy="52" r="12" fill="#ef5350" />
      <circle cx="32" cy="33" r="12" fill="#78909c" />
      <circle cx="26" cy="52" r="12" fill="#42a5f5" />
      <text x="26" y="50" textAnchor="middle" fill="#fff" fontSize="8">³He</text>
      <text x="52" y="52" fill={s.color} fontSize="18" textAnchor="middle">+</text>
      <circle cx="70" cy="52" r="12" fill="#ef5350" />
      <circle cx="82" cy="33" r="12" fill="#78909c" />
      <circle cx="76" cy="52" r="12" fill="#42a5f5" />
      <text x="76" y="50" textAnchor="middle" fill="#fff" fontSize="8">³He</text>
      <line x1="96" y1="47" x2="126" y2="47" stroke={s.color} strokeWidth="2" markerEnd="url(#arr2)" />
      {/* ⁴He */}
      <circle cx="148" cy="58" r="12" fill="#ef5350" />
      <circle cx="160" cy="36" r="12" fill="#78909c" />
      <circle cx="148" cy="36" r="12" fill="#ef5350" />
      <circle cx="160" cy="58" r="12" fill="#78909c" />
      <text x="154" y="52" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="700">⁴He</text>
      <text x="180" y="52" fill={s.color} fontSize="18" textAnchor="middle">+</text>
      {/* 2p */}
      <circle cx="202" cy="47" r="13" fill="#ef5350" />
      <text x="202" y="51" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="700">p</text>
      <text x="222" y="52" fill={s.color} fontSize="18" textAnchor="middle">+</text>
      <circle cx="243" cy="47" r="13" fill="#ef5350" />
      <text x="243" y="51" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="700">p</text>
      <text x="264" y="52" fill={s.color} fontSize="15" textAnchor="middle">+</text>
      {/* Energy label */}
      <rect x="278" y="33" width="72" height="28" rx="6" fill={`${s.color}22`} stroke={s.color} strokeWidth="1" />
      <text x="314" y="50" textAnchor="middle" fill={s.color} fontSize="11" fontWeight="700">12.86 MeV</text>
    </svg>,
  ]
  return (
    <div style={{ marginTop: 20 }}>
      {diagrams[step]}
    </div>
  )
}

export default function Sun({ onNavigate }) {
  const [step, setStep] = useState(0)

  return (
    <div style={{
      width: '100vw', minHeight: '100vh',
      background: 'radial-gradient(ellipse at 50% -5%, #2d1000 0%, #0e0400 35%, #000 80%)',
      padding: '32px 20px 60px',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
    }}>
      {/* Back */}
      <div style={{ alignSelf: 'flex-start', marginLeft: 'clamp(16px, 4vw, 48px)', marginBottom: 12 }}>
        <button
          onClick={() => onNavigate('hero')}
          style={{
            background: 'rgba(255,255,255,0.07)',
            border: '1px solid rgba(255,255,255,0.18)',
            color: '#ccc', padding: '8px 18px',
            borderRadius: 8, cursor: 'pointer',
            fontSize: 13, letterSpacing: 0.5,
            transition: 'background 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.13)' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)' }}
        >
          ← Back
        </button>
      </div>

      {/* Sun visual */}
      <div style={{
        width: 148, height: 148, borderRadius: '50%', marginTop: 4,
        background: 'radial-gradient(circle at 38% 33%, #fffde7 0%, #ffe566 22%, #ffa000 58%, #c84000 100%)',
        animation: 'sunGlow 3.5s ease-in-out infinite',
        position: 'relative', flexShrink: 0,
      }}>
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(deg => (
          <div key={deg} style={{
            position: 'absolute', top: '50%', left: '50%',
            width: 55, height: 2.5,
            background: 'linear-gradient(90deg, rgba(255,210,40,0.5), transparent)',
            transformOrigin: '0 50%',
            transform: `translate(0,-50%) rotate(${deg}deg)`,
            borderRadius: 2,
          }} />
        ))}
      </div>

      <h1 style={{
        fontFamily: 'Orbitron, sans-serif',
        fontSize: 'clamp(22px, 4vw, 36px)',
        fontWeight: 900, color: '#ffcc00',
        marginTop: 22, letterSpacing: -0.5,
        textAlign: 'center',
      }}>
        How the Sun Powers Itself
      </h1>
      <p style={{
        fontSize: 14, color: 'rgba(255,255,255,0.65)',
        maxWidth: 580, textAlign: 'center',
        marginTop: 12, lineHeight: 1.7,
      }}>
        Every second, the Sun converts{' '}
        <strong style={{ color: '#fff' }}>600 million tons of hydrogen into helium</strong>,
        releasing energy through nuclear fusion — the same process humanity is working to
        harness here on Earth.
      </p>

      {/* Stat row */}
      <div style={{
        display: 'flex', gap: 16, marginTop: 28,
        flexWrap: 'wrap', justifyContent: 'center',
      }}>
        {[
          { label: 'Core Temperature', value: '15,000,000°C' },
          { label: 'Power Output', value: '3.8 × 10²⁶ W' },
          { label: 'Fuel Remaining', value: '~5 billion yrs' },
        ].map(s => (
          <div key={s.label} style={{
            background: 'rgba(255,160,0,0.09)',
            border: '1px solid rgba(255,160,0,0.25)',
            borderRadius: 12, padding: '14px 22px', textAlign: 'center',
            minWidth: 130,
          }}>
            <div style={{
              fontFamily: 'Orbitron, sans-serif',
              fontSize: 20, fontWeight: 700, color: '#ffa726',
            }}>
              {s.value}
            </div>
            <div style={{
              fontSize: 10, color: 'rgba(255,200,100,0.6)',
              letterSpacing: 1.5, marginTop: 5, textTransform: 'uppercase',
            }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* ── Proton–Proton Chain ─────────────────────────────── */}
      <h2 style={{
        fontSize: 20, fontWeight: 700, color: '#fff',
        marginTop: 52, marginBottom: 4, letterSpacing: 0.5,
      }}>
        The Proton–Proton Chain
      </h2>
      <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', marginBottom: 22 }}>
        The dominant fusion process in Sun-like stars
      </p>

      {/* Step tabs */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
        {STEPS.map((s, i) => (
          <button
            key={i}
            onClick={() => setStep(i)}
            style={{
              padding: '7px 18px', borderRadius: 24,
              background: step === i ? s.color : 'rgba(255,255,255,0.07)',
              border: `1px solid ${step === i ? s.color : 'rgba(255,255,255,0.14)'}`,
              color: '#fff', cursor: 'pointer',
              fontSize: 12, fontWeight: 700,
              transition: 'all 0.18s',
            }}
          >
            Step {i + 1}
          </button>
        ))}
      </div>

      {/* Step card */}
      <div style={{
        width: '100%', maxWidth: 660,
        background: 'rgba(255,255,255,0.03)',
        border: `1px solid ${STEPS[step].color}40`,
        borderRadius: 18, padding: '28px 32px',
        marginTop: 18,
        animation: 'fadeIn 0.35s ease-out',
      }}>
        <div style={{
          fontSize: 11, letterSpacing: 3,
          color: STEPS[step].color, marginBottom: 10,
          textTransform: 'uppercase', fontWeight: 700,
        }}>
          {STEPS[step].title}
        </div>

        <div style={{
          fontFamily: 'monospace',
          fontSize: 22, fontWeight: 700, color: '#fff',
          background: `${STEPS[step].color}14`,
          padding: '10px 18px', borderRadius: 10,
          display: 'inline-block', marginBottom: 14,
        }}>
          {STEPS[step].eq}
        </div>

        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.72)', lineHeight: 1.75 }}>
          {STEPS[step].desc}
        </p>

        <div style={{
          marginTop: 14,
          display: 'inline-block',
          background: `${STEPS[step].color}18`,
          border: `1px solid ${STEPS[step].color}44`,
          borderRadius: 8, padding: '6px 14px',
          fontSize: 12, color: STEPS[step].color, fontWeight: 700,
        }}>
          Energy released: {STEPS[step].energy}
        </div>

        <ParticleStep step={step} />
      </div>

      {/* Net energy box */}
      <div style={{
        maxWidth: 660, width: '100%',
        marginTop: 20, marginBottom: 16,
        background: 'rgba(79,195,247,0.06)',
        border: '1px solid rgba(79,195,247,0.22)',
        borderRadius: 16, padding: '22px 28px',
      }}>
        <div style={{
          fontSize: 10, letterSpacing: 3, color: '#4fc3f7',
          marginBottom: 6, textTransform: 'uppercase',
        }}>
          Net Energy Per Cycle
        </div>
        <div style={{
          fontFamily: 'Orbitron, sans-serif',
          fontSize: 28, fontWeight: 900, color: '#fff', marginBottom: 8,
        }}>
          26.73 MeV
        </div>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.58)', lineHeight: 1.7 }}>
          One complete pp-chain cycle releases 26.73 MeV — the equivalent of ~26 million
          X-ray photons. The Sun performs this reaction{' '}
          <strong style={{ color: '#ccc' }}>9.2 × 10³⁷ times per second</strong>.
          On Earth, tokamaks use deuterium–tritium fusion for a far more energetic reaction
          per particle.
        </p>
      </div>

      <button
        onClick={() => onNavigate('tokamak')}
        style={{
          marginTop: 12,
          background: 'linear-gradient(135deg, #1565c0 0%, #7c4dff 100%)',
          border: 'none', borderRadius: 12,
          color: '#fff', padding: '13px 30px',
          fontSize: 14, fontWeight: 700,
          fontFamily: 'Orbitron, sans-serif',
          cursor: 'pointer', letterSpacing: 1,
          boxShadow: '0 4px 22px rgba(124,77,255,0.38)',
          transition: 'transform 0.18s, box-shadow 0.18s',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'translateY(-2px)'
          e.currentTarget.style.boxShadow = '0 6px 28px rgba(124,77,255,0.55)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'translateY(0)'
          e.currentTarget.style.boxShadow = '0 4px 22px rgba(124,77,255,0.38)'
        }}
      >
        Explore the Tokamak →
      </button>
    </div>
  )
}
