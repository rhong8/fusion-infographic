import { useState } from 'react'
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps'

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'

const STATUS = {
  operational:    { color: '#00e676', label: 'Operational' },
  construction:   { color: '#ffd600', label: 'Under Construction' },
  planned:        { color: '#40c4ff', label: 'Planned' },
  decommissioned: { color: '#90a4ae', label: 'Decommissioned' },
}

// JET and Tokamak Energy are ~5 miles apart — offset in SVG px to prevent overlap
const PIXEL_OFFSET = {
  jet: [0, -13],
  te:  [0,  13],
}

const SITES = [
  {
    id: 'iter',
    name: 'ITER',
    location: 'Saint-Paul-lès-Durance, France',
    coordinates: [5.76, 43.70],
    status: 'construction',
    blurb: 'ITER is the world\'s largest fusion experiment, currently under assembly in southern France. As of 2025, major vessel components are being integrated on-site, with First Plasma now targeted for 2034 following a revised construction timeline.',
  },
  {
    id: 'nif',
    name: 'National Ignition Facility',
    location: 'Livermore, California, USA',
    coordinates: [-121.71, 37.69],
    status: 'operational',
    blurb: 'NIF made history in December 2022, becoming the first fusion device to achieve ignition — producing 3.15 MJ from 2.05 MJ of laser input. Follow-on experiments continue to refine ignition conditions and push energy yields higher.',
  },
  {
    id: 'pppl',
    name: 'Princeton Plasma Physics Lab',
    location: 'Princeton, New Jersey, USA',
    coordinates: [-74.60, 40.35],
    status: 'operational',
    blurb: 'PPPL operates the NSTX-U spherical tokamak and leads foundational U.S. plasma physics research. In 2024, the lab broke ground on a new $341M facility focused on developing next-generation compact, high-field fusion devices.',
  },
  {
    id: 'cfs',
    name: 'Commonwealth Fusion Systems',
    location: 'Devens, Massachusetts, USA',
    coordinates: [-71.62, 42.55],
    status: 'construction',
    blurb: 'CFS is constructing SPARC, a compact high-field tokamak in Devens, Massachusetts. Their REBCO superconducting magnets set a world record of 20 tesla in 2021, and SPARC is designed to demonstrate net energy gain before the end of the decade.',
  },
  {
    id: 'w7x',
    name: 'Wendelstein 7-X',
    location: 'Greifswald, Germany',
    coordinates: [13.42, 54.07],
    status: 'operational',
    blurb: 'Wendelstein 7-X is the world\'s most advanced stellarator, accumulating over 1,000 seconds of total plasma operation. Its campaigns have validated optimized magnetic geometry, confirming the viability of stellarators as a long-pulse fusion approach.',
  },
  {
    id: 'te',
    name: 'Tokamak Energy',
    location: 'Milton Park, Oxford, UK',
    coordinates: [-1.28, 51.61],
    status: 'operational',
    blurb: 'Tokamak Energy\'s ST40 became the first privately-funded device to achieve a plasma temperature of 100 million°C in 2022 — the threshold for commercial fusion. The company is now developing its next-generation ST80-HTS using high-temperature superconducting magnets.',
  },
  {
    id: 'jt60sa',
    name: 'JT-60SA',
    location: 'Naka, Japan',
    coordinates: [140.54, 36.48],
    status: 'operational',
    blurb: 'JT-60SA achieved First Plasma in December 2023, becoming the world\'s largest operational superconducting tokamak. This joint EU-Japan device in Naka, Japan directly supports ITER by validating operating scenarios and plasma control techniques in advance.',
  },
  {
    id: 'east',
    name: 'EAST Tokamak',
    location: 'Hefei, China',
    coordinates: [117.27, 31.86],
    status: 'operational',
    blurb: 'China\'s EAST set a world record in January 2024, sustaining a 70-million°C plasma for 1,066 seconds — nearly 18 minutes. This achievement demonstrates the long-pulse stability and heat exhaust management that a commercial fusion power plant will require.',
  },
  {
    id: 'jet',
    name: 'Joint European Torus (JET)',
    location: 'Culham, UK',
    coordinates: [-1.23, 51.66],
    status: 'decommissioned',
    blurb: 'JET operated at Culham, UK for 40 years (1983–2023), setting a world fusion energy record of 59.7 MJ in February 2022. It was decommissioned in December 2023 after fulfilling its mission to pioneer fusion research and directly inform the design of ITER.',
  },
]

export default function Map({ onNavigate }) {
  const [selected, setSelected] = useState(null)

  function handleMarkerClick(site) {
    setSelected(prev => prev?.id === site.id ? null : site)
  }

  const sel = selected ? STATUS[selected.status] : null

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      background: '#050a14',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: 'Orbitron, sans-serif',
    }}>

      {/* ── Map ──────────────────────────────────────────────── */}
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ scale: 145, center: [10, 18] }}
        width={900}
        height={520}
        style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}
      >
        <Geographies geography={GEO_URL}>
          {({ geographies }) =>
            geographies.map(geo => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="#0a1f3d"
                stroke="#1a3a6b"
                strokeWidth={0.4}
                style={{
                  default: { outline: 'none' },
                  hover:   { fill: '#0d2650', outline: 'none' },
                  pressed: { outline: 'none' },
                }}
              />
            ))
          }
        </Geographies>

        {SITES.map(site => {
          const { color } = STATUS[site.status]
          const isSelected = selected?.id === site.id
          const [ox, oy] = PIXEL_OFFSET[site.id] ?? [0, 0]

          return (
            <Marker
              key={site.id}
              coordinates={site.coordinates}
              onClick={() => handleMarkerClick(site)}
              style={{ cursor: 'pointer' }}
            >
              <g transform={`translate(${ox},${oy})`}>
                {/* Outer pulsating ring */}
                <circle fill="none" stroke={color} strokeWidth={1.2}>
                  <animate attributeName="r"       values="5;15;5"     dur="2.6s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.55;0;0.55" dur="2.6s" repeatCount="indefinite" />
                </circle>
                {/* Selected ring */}
                {isSelected && (
                  <circle r={11} fill="none" stroke={color} strokeWidth={1.5} opacity={0.85} />
                )}
                {/* Core dot */}
                <circle
                  r={isSelected ? 6.5 : 5}
                  fill={color}
                  stroke={isSelected ? '#fff' : 'none'}
                  strokeWidth={isSelected ? 1.2 : 0}
                  style={{ filter: `drop-shadow(0 0 5px ${color})` }}
                />
              </g>
            </Marker>
          )
        })}
      </ComposableMap>

      {/* ── Header ───────────────────────────────────────────── */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        padding: '18px 28px',
        display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
        zIndex: 15,
        background: 'linear-gradient(to bottom, rgba(5,10,20,0.88) 0%, transparent 100%)',
        pointerEvents: 'none',
      }}>
        <button
          onClick={() => onNavigate('hero')}
          style={{
            pointerEvents: 'auto',
            background: 'rgba(79,195,247,0.08)',
            border: '1px solid rgba(79,195,247,0.28)',
            color: '#4fc3f7',
            padding: '8px 18px',
            borderRadius: 8,
            cursor: 'pointer',
            fontSize: 10,
            fontFamily: 'Orbitron, sans-serif',
            letterSpacing: 2,
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'rgba(79,195,247,0.18)'
            e.currentTarget.style.borderColor = 'rgba(79,195,247,0.6)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'rgba(79,195,247,0.08)'
            e.currentTarget.style.borderColor = 'rgba(79,195,247,0.28)'
          }}
        >
          ← BACK
        </button>

        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 9, letterSpacing: 4, color: 'rgba(79,195,247,0.6)', marginBottom: 4 }}>
            GLOBAL FUSION SITES
          </div>
          <div style={{ fontSize: 22, fontWeight: 700, color: '#fff', letterSpacing: 2 }}>
            WORLD MAP
          </div>
        </div>
      </div>

      {/* ── Legend ───────────────────────────────────────────── */}
      <div style={{
        position: 'absolute', bottom: 28, left: 28,
        background: 'rgba(5,10,20,0.88)',
        border: '1px solid rgba(79,195,247,0.14)',
        borderRadius: 10,
        padding: '14px 20px',
        backdropFilter: 'blur(8px)',
        zIndex: 10,
      }}>
        <div style={{ fontSize: 8, letterSpacing: 3, color: '#4fc3f7', marginBottom: 12 }}>
          STATUS
        </div>
        {Object.entries(STATUS).map(([key, { color, label }]) => (
          <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <div style={{
              width: 8, height: 8, borderRadius: '50%',
              background: color, boxShadow: `0 0 6px ${color}`,
              flexShrink: 0,
            }} />
            <span style={{ fontSize: 9, letterSpacing: 1.5, color: 'rgba(255,255,255,0.7)' }}>
              {label.toUpperCase()}
            </span>
          </div>
        ))}
      </div>

      {/* ── Hint (no selection) ───────────────────────────────── */}
      {!selected && (
        <div style={{
          position: 'absolute', bottom: 28, left: '50%',
          transform: 'translateX(-50%)',
          fontSize: 9, letterSpacing: 3,
          color: 'rgba(255,255,255,0.28)',
          pointerEvents: 'none',
          zIndex: 10,
        }}>
          CLICK A SITE TO EXPLORE
        </div>
      )}

      {/* ── Info Panel ───────────────────────────────────────── */}
      {selected && sel && (
        <div
          key={selected.id}
          style={{
            position: 'absolute',
            top: '50%', right: 28,
            transform: 'translateY(-50%)',
            width: 310,
            background: 'rgba(5,10,20,0.93)',
            border: `1px solid ${sel.color}44`,
            borderLeft: `3px solid ${sel.color}`,
            borderRadius: '0 14px 14px 0',
            padding: '22px 22px 22px 20px',
            backdropFilter: 'blur(16px)',
            boxShadow: `0 0 40px ${sel.color}14, 0 8px 32px rgba(0,0,0,0.7)`,
            zIndex: 20,
            animation: 'fadeIn 0.18s ease-out',
          }}
        >
          <button
            onClick={() => setSelected(null)}
            style={{
              position: 'absolute', top: 10, right: 12,
              background: 'none', border: 'none',
              color: 'rgba(255,255,255,0.35)', cursor: 'pointer',
              fontSize: 18, lineHeight: 1, padding: 4,
            }}
            onMouseEnter={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.75)' }}
            onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.35)' }}
          >
            ×
          </button>

          {/* Status badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '3px 10px', borderRadius: 20,
            background: `${sel.color}14`,
            border: `1px solid ${sel.color}38`,
            marginBottom: 14,
          }}>
            <div style={{
              width: 6, height: 6, borderRadius: '50%',
              background: sel.color, boxShadow: `0 0 5px ${sel.color}`,
            }} />
            <span style={{ fontSize: 8, letterSpacing: 2, color: sel.color }}>
              {sel.label.toUpperCase()}
            </span>
          </div>

          <div style={{
            fontSize: 14, fontWeight: 700, color: '#fff',
            lineHeight: 1.3, marginBottom: 6,
          }}>
            {selected.name}
          </div>

          <div style={{
            fontSize: 9, letterSpacing: 1.5,
            color: 'rgba(255,255,255,0.38)',
            marginBottom: 16,
          }}>
            {selected.location.toUpperCase()}
          </div>

          <p style={{
            fontSize: 12, lineHeight: 1.78,
            color: 'rgba(255,255,255,0.72)',
            fontFamily: 'Inter, sans-serif',
            margin: 0,
          }}>
            {selected.blurb}
          </p>
        </div>
      )}
    </div>
  )
}
