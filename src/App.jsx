import { useState } from 'react'
import Hero from './Hero.jsx'
import Sun from './Sun.jsx'
import Tokamak from './Tokamak.jsx'

export default function App() {
  const [page, setPage] = useState('hero')

  return (
    <>
      {page === 'hero'    && <Hero     onNavigate={setPage} />}
      {page === 'sun'     && <Sun      onNavigate={setPage} />}
      {page === 'tokamak' && <Tokamak  onNavigate={setPage} />}
    </>
  )
}
