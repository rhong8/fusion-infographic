const MILESTONES = [
  {
    year: '2021',
    date: 'Aug 8',
    title: 'NIF Burning Plasma',
    desc: 'NIF achieves burning plasma conditions — 1.35 MJ yield, the first time fusion self-heating exceeded external heating.',
    color: '#ffa726',
    tag: 'NIF',
  },
  {
    year: '2022',
    date: 'Dec 5',
    title: 'Fusion Ignition ★',
    desc: 'NIF crosses scientific breakeven: 3.15 MJ out from 2.05 MJ in (Q ≈ 1.54). The most significant milestone in fusion history.',
    color: '#4caf50',
    tag: 'NIF · Historic',
    highlight: true,
  },
  {
    year: '2023',
    date: 'Jul 30',
    title: 'Ignition Repeated',
    desc: 'NIF confirms ignition in a second shot (3.88 MJ), demonstrating reproducibility of the result.',
    color: '#66bb6a',
    tag: 'NIF',
  },
  {
    year: '2024',
    date: 'Ongoing',
    title: 'ITER Assembly',
    desc: 'ITER tokamak in Cadarache, France continues assembly. Central solenoid and vacuum vessel sectors installed.',
    color: '#29b6f6',
    tag: 'ITER',
  },
  {
    year: '2025',
    date: 'Target',
    title: 'SPARC Magnets',
    desc: 'Commonwealth Fusion Systems completes world-record 20 T high-temperature superconducting coils for SPARC tokamak.',
    color: '#ab47bc',
    tag: 'SPARC · CFS',
  },
  {
    year: '2027',
    date: 'Planned',
    title: 'ITER First Plasma',
    desc: 'ITER achieves first plasma operations. The 35-nation, €20 B machine begins its experimental program.',
    color: '#26c6da',
    tag: 'ITER',
  },
  {
    year: '2030',
    date: 'Planned',
    title: 'SPARC First Plasma',
    desc: 'SPARC aims to demonstrate Q > 2 in a compact high-field tokamak, paving the way for the commercial ARC plant.',
    color: '#7e57c2',
    tag: 'SPARC',
  },
  {
    year: '2035',
    date: 'Target',
    title: 'ITER Full D-T Operations',
    desc: 'ITER runs full deuterium–tritium fusion, targeting Q = 10 and 500 MW of fusion power for 400-second pulses.',
    color: '#29b6f6',
    tag: 'ITER',
  },
  {
    year: '2040s',
    date: 'Projected',
    title: 'First Commercial Plant',
    desc: 'Multiple private companies (CFS, TAE, Helion, General Fusion) and DEMO target grid-connected fusion electricity.',
    color: '#ef5350',
    tag: 'Commercial',
  },
]

export default function Timeline() {
  return (
    <div style={{ width: '100%' }}>
      <div style={{ marginBottom: 24 }}>
        <div style={{
          fontSize: 10, letterSpacing: 3, color: '#4fc3f7',
          textTransform: 'uppercase', marginBottom: 6,
        }}>
          Milestones
        </div>
        <h3 style={{
          fontFamily: 'Orbitron, sans-serif',
          fontSize: 18, fontWeight: 700, color: '#fff',
        }}>
          The Road to Fusion Power
        </h3>
        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>
          2021 → 2040s
        </p>
      </div>

      {/* Horizontal scrollable timeline */}
      <div style={{
        overflowX: 'auto',
        paddingBottom: 12,
      }}>
        <div style={{
          display: 'flex',
          gap: 0,
          position: 'relative',
          minWidth: 'max-content',
          paddingTop: 10,
          paddingBottom: 4,
        }}>
          {/* Continuous connector line */}
          <div style={{
            position: 'absolute',
            top: 30,
            left: 60,
            right: 60,
            height: 2,
            background: 'linear-gradient(90deg, rgba(79,195,247,0.15), rgba(79,195,247,0.45) 50%, rgba(79,195,247,0.15))',
            zIndex: 0,
          }} />

          {MILESTONES.map((m, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: 190,
                flexShrink: 0,
                position: 'relative',
                zIndex: 1,
              }}
            >
              {/* Dot */}
              <div style={{
                width: m.highlight ? 22 : 14,
                height: m.highlight ? 22 : 14,
                borderRadius: '50%',
                background: m.color,
                border: m.highlight ? '3px solid #fff' : `2px solid ${m.color}`,
                boxShadow: `0 0 ${m.highlight ? 20 : 10}px ${m.color}${m.highlight ? 'cc' : '66'}`,
                marginBottom: 14,
                flexShrink: 0,
                transition: 'transform 0.2s',
                cursor: 'default',
              }} />

              {/* Card */}
              <div
                style={{
                  background: m.highlight
                    ? `linear-gradient(160deg, rgba(76,175,80,0.12) 0%, rgba(76,175,80,0.04) 100%)`
                    : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${m.color}${m.highlight ? '55' : '28'}`,
                  borderRadius: 12,
                  padding: '14px 14px',
                  width: 170,
                  transition: 'border-color 0.2s, transform 0.2s',
                  cursor: 'default',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = `${m.color}80`
                  e.currentTarget.style.transform = 'translateY(-3px)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = `${m.color}${m.highlight ? '55' : '28'}`
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                {/* Year badge */}
                <div style={{
                  display: 'flex', alignItems: 'center',
                  justifyContent: 'space-between', marginBottom: 6,
                }}>
                  <span style={{
                    fontFamily: 'Orbitron, sans-serif',
                    fontSize: 13, fontWeight: 900, color: m.color,
                  }}>
                    {m.year}
                  </span>
                  <span style={{
                    fontSize: 9, color: 'rgba(255,255,255,0.35)',
                    letterSpacing: 0.5,
                  }}>
                    {m.date}
                  </span>
                </div>

                <div style={{
                  fontSize: 11, fontWeight: 700,
                  color: m.highlight ? '#fff' : 'rgba(255,255,255,0.85)',
                  marginBottom: 6, lineHeight: 1.35,
                }}>
                  {m.title}
                </div>

                <p style={{
                  fontSize: 10, color: 'rgba(255,255,255,0.42)',
                  lineHeight: 1.55,
                }}>
                  {m.desc}
                </p>

                <div style={{
                  marginTop: 8,
                  display: 'inline-block',
                  background: `${m.color}15`,
                  border: `1px solid ${m.color}35`,
                  borderRadius: 6,
                  padding: '2px 8px',
                  fontSize: 9, color: m.color, letterSpacing: 0.5,
                  fontWeight: 700,
                }}>
                  {m.tag}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <p style={{
        fontSize: 10, color: 'rgba(255,255,255,0.25)',
        marginTop: 8, textAlign: 'right', letterSpacing: 0.3,
      }}>
        ← Scroll to explore timeline →
      </p>
    </div>
  )
}
