import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ReferenceLine, ResponsiveContainer, Legend,
} from 'recharts'

const data = [
  { date: '2018',     yield: 0.006,  input: 1.80 },
  { date: '2019',     yield: 0.012,  input: 1.80 },
  { date: '2020',     yield: 0.170,  input: 1.90 },
  { date: 'Aug 2021', yield: 1.350,  input: 1.90 },
  { date: 'Dec 2022', yield: 3.150,  input: 2.05 },
  { date: 'Jul 2023', yield: 3.880,  input: 2.05 },
]

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  const isIgnition = label === 'Dec 2022'
  return (
    <div style={{
      background: '#080f22',
      border: `1px solid ${isIgnition ? '#4caf50' : 'rgba(79,195,247,0.3)'}`,
      borderRadius: 10, padding: '12px 16px',
      fontSize: 13,
    }}>
      <div style={{
        fontFamily: 'Orbitron, sans-serif',
        fontSize: 11, color: isIgnition ? '#4caf50' : '#4fc3f7',
        marginBottom: 6, letterSpacing: 1,
      }}>
        {label} {isIgnition ? '★ IGNITION' : ''}
      </div>
      {payload.map(p => (
        <div key={p.name} style={{ color: p.color, marginBottom: 3 }}>
          <span style={{ color: 'rgba(255,255,255,0.5)', marginRight: 6 }}>
            {p.name === 'yield' ? 'Energy Yield' : 'Laser Input'}:
          </span>
          <strong>{p.value.toFixed(3)} MJ</strong>
        </div>
      ))}
      {payload.length >= 2 && (
        <div style={{ color: 'rgba(255,255,255,0.45)', marginTop: 6, fontSize: 11 }}>
          Q = {(payload[0].value / payload[1].value).toFixed(2)}
        </div>
      )}
    </div>
  )
}

export default function Chart() {
  return (
    <div style={{
      width: '100%',
      background: 'rgba(255,255,255,0.025)',
      border: '1px solid rgba(79,195,247,0.18)',
      borderRadius: 18,
      padding: '28px 24px 20px',
    }}>
      <div style={{ marginBottom: 20 }}>
        <div style={{
          fontSize: 10, letterSpacing: 3,
          color: '#4fc3f7', textTransform: 'uppercase', marginBottom: 6,
        }}>
          National Ignition Facility
        </div>
        <h3 style={{
          fontFamily: 'Orbitron, sans-serif',
          fontSize: 18, fontWeight: 700, color: '#fff',
        }}>
          Energy Yield Over Time
        </h3>
        <p style={{
          fontSize: 12, color: 'rgba(255,255,255,0.45)',
          marginTop: 4,
        }}>
          Fusion yield (MJ) vs. laser driver input (MJ) — NIF, Lawrence Livermore
        </p>
      </div>

      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={data} margin={{ top: 10, right: 10, bottom: 0, left: 0 }}>
          <defs>
            <linearGradient id="yieldGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#4caf50" stopOpacity={0.5} />
              <stop offset="95%" stopColor="#4caf50" stopOpacity={0.04} />
            </linearGradient>
            <linearGradient id="inputGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#ef5350" stopOpacity={0.35} />
              <stop offset="95%" stopColor="#ef5350" stopOpacity={0.04} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 4" stroke="rgba(255,255,255,0.06)" />

          <XAxis
            dataKey="date"
            tick={{ fill: 'rgba(255,255,255,0.45)', fontSize: 11 }}
            axisLine={{ stroke: 'rgba(255,255,255,0.12)' }}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: 'rgba(255,255,255,0.45)', fontSize: 11 }}
            axisLine={{ stroke: 'rgba(255,255,255,0.12)' }}
            tickLine={false}
            tickFormatter={v => `${v} MJ`}
            domain={[0, 4.5]}
          />

          <Tooltip content={<CustomTooltip />} />

          <Legend
            wrapperStyle={{ fontSize: 11, paddingTop: 8, color: 'rgba(255,255,255,0.55)' }}
            formatter={name => name === 'yield' ? 'Fusion Yield' : 'Laser Input'}
          />

          {/* Breakeven line */}
          <ReferenceLine
            y={2.05} stroke="#ffa726" strokeDasharray="5 3"
            label={{
              value: '← Breakeven',
              fill: '#ffa726', fontSize: 10,
              position: 'insideTopRight',
            }}
          />

          <Area
            type="monotone" dataKey="input"
            stroke="#ef5350" strokeWidth={2}
            fill="url(#inputGrad)"
            dot={{ r: 4, fill: '#ef5350', strokeWidth: 0 }}
          />
          <Area
            type="monotone" dataKey="yield"
            stroke="#4caf50" strokeWidth={2.5}
            fill="url(#yieldGrad)"
            dot={({ cx, cy, payload }) => (
              <circle
                key={payload.date}
                cx={cx} cy={cy}
                r={payload.date === 'Dec 2022' ? 7 : 4}
                fill={payload.date === 'Dec 2022' ? '#4caf50' : '#4caf50'}
                stroke={payload.date === 'Dec 2022' ? '#fff' : 'none'}
                strokeWidth={payload.date === 'Dec 2022' ? 2 : 0}
              />
            )}
          />
        </AreaChart>
      </ResponsiveContainer>

      {/* Ignition callout */}
      <div style={{
        marginTop: 14,
        background: 'rgba(76,175,80,0.08)',
        border: '1px solid rgba(76,175,80,0.28)',
        borderRadius: 10, padding: '10px 16px',
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <div style={{
          width: 10, height: 10, borderRadius: '50%',
          background: '#4caf50', flexShrink: 0,
          boxShadow: '0 0 8px #4caf50',
        }} />
        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)', lineHeight: 1.5 }}>
          <strong style={{ color: '#4caf50' }}>Dec 5, 2022 — Historic Ignition:</strong>{' '}
          NIF produced 3.15 MJ from 2.05 MJ of laser input (Q ≈ 1.54), the first time
          any fusion experiment achieved scientific energy breakeven.
        </p>
      </div>
    </div>
  )
}
