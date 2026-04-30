const STATS = [
  {
    label: 'Q-value (NIF, Dec 2022)',
    value: '> 1',
    sub: 'Q of 1.54. Energy out exceeded laser energy in.',
    color: '#4caf50',
    icon: '⚡',
  },
  {
    label: 'Plasma Temperature',
    value: '150,000,000°C',
    sub: '10× hotter than the Sun\'s core',
    color: '#ff7043',
    icon: '🌡',
  },
  {
    label: 'ITER Target Q-value',
    value: 'Q = 10',
    sub: '500 MW output from 50 MW of heating input. Planned for 2035.',
    color: '#29b6f6',
    icon: '🎯',
  },
  {
    label: 'Fuel Source',
    value: 'Seawater + Li',
    sub: 'Deuterium from ocean water · Tritium bred from lithium',
    color: '#ab47bc',
    icon: '💧',
  },
  {
    label: 'ITER Budget',
    value: '€20 Billion',
    sub: '35 nations · Construction in Cadarache, France',
    color: '#ffa726',
    icon: '🌍',
  },
  {
    label: 'Global Private Investment',
    value: '$6.2 B',
    sub: 'Invested in private fusion companies in 2023 alone',
    color: '#26c6da',
    icon: '📈',
  },
  {
    label: 'Carbon Emissions',
    value: '0 CO₂',
    sub: 'No combustion, no long-lived nuclear waste',
    color: '#66bb6a',
    icon: '🌿',
  },
  {
    label: 'NIF Laser Energy In',
    value: '2.05 MJ',
    sub: 'Input laser energy vs 3.15 MJ yield — Dec 2022 shot',
    color: '#ef5350',
    icon: '🔬',
  },
]

export default function Stats({ onClose }) {
  return (
    /* Backdrop */
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 100,
        background: 'rgba(0,0,0,0.78)',
        backdropFilter: 'blur(4px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '20px',
        animation: 'fadeIn 0.2s ease-out',
      }}
    >
      {/* Panel */}
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: 'linear-gradient(160deg, #050d1f 0%, #08152e 100%)',
          border: '1px solid rgba(79,195,247,0.28)',
          borderRadius: 20,
          padding: '32px',
          maxWidth: 720, width: '100%',
          maxHeight: '88vh',
          overflowY: 'auto',
          boxShadow: '0 0 60px rgba(79,195,247,0.12)',
        }}
      >
        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', marginBottom: 24,
        }}>
          <div>
            <div style={{
              fontSize: 10, letterSpacing: 4, color: '#4fc3f7',
              textTransform: 'uppercase', marginBottom: 4,
            }}>
              Key Numbers
            </div>
            <h2 style={{
              fontFamily: 'Orbitron, sans-serif',
              fontSize: 22, fontWeight: 900, color: '#fff',
            }}>
              Fusion by the Stats
            </h2>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.18)',
              color: '#aaa', width: 36, height: 36,
              borderRadius: '50%', cursor: 'pointer',
              fontSize: 18, display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              transition: 'background 0.15s, color 0.15s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.16)'
              e.currentTarget.style.color = '#fff'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.08)'
              e.currentTarget.style.color = '#aaa'
            }}
          >
            ×
          </button>
        </div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))',
          gap: 14,
        }}>
          {STATS.map(stat => (
            <div
              key={stat.label}
              style={{
                background: `${stat.color}0d`,
                border: `1px solid ${stat.color}35`,
                borderRadius: 14, padding: '18px 20px',
                transition: 'border-color 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = `${stat.color}70` }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = `${stat.color}35` }}
            >
              <div style={{ fontSize: 22, marginBottom: 6 }}>{stat.icon}</div>
              <div style={{
                fontFamily: 'Orbitron, sans-serif',
                fontSize: 20, fontWeight: 700,
                color: stat.color, lineHeight: 1.1,
                marginBottom: 6,
              }}>
                {stat.value}
              </div>
              <div style={{
                fontSize: 11, color: 'rgba(255,255,255,0.5)',
                letterSpacing: 0.5, marginBottom: 4, fontWeight: 600,
              }}>
                {stat.label}
              </div>
              <div style={{
                fontSize: 11, color: 'rgba(255,255,255,0.42)',
                lineHeight: 1.5,
              }}>
                {stat.sub}
              </div>
            </div>
          ))}
        </div>

        <p style={{
          marginTop: 20, fontSize: 11,
          color: 'rgba(255,255,255,0.3)',
          textAlign: 'center',
          letterSpacing: 0.5,
        }}>
          Click anywhere outside to close
        </p>
      </div>
    </div>
  )
}
