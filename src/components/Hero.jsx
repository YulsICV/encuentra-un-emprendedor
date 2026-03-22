// src/components/Hero.jsx
import { useState } from 'react'

export default function Hero({ busqueda, onBuscar, onNavegar }) {
  const [texto, setTexto] = useState('')

  const handleBuscar = () => {
    if (texto.trim()) {
      onBuscar(texto.trim())
      const el = document.getElementById('ofertas')
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleBuscar()
  }

  const limpiar = () => {
    setTexto('')
    onBuscar('')
  }

  return (
    <section className="hero">
      <div className="hero-container">

        <span className="hero-tag">
          ✨ La comunidad de emprendedores de tu zona
        </span>

        <h1>
          Apoya lo local, <span>encuentra lo que necesitas</span>
        </h1>

        <p className="hero-subtitle">
          Conecta con emprendedores de tu comunidad.
          Hacé pedidos, conocé sus ofertas y comunicate al instante.
        </p>

        <div className="hero-btns">
          <button
            className="btn-primary"
            onClick={() => {
              const el = document.getElementById('emprendedores')
              if (el) el.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            Explorar emprendedores
          </button>
          <button className="btn-secondary" onClick={() => onNavegar('registro')}>
            Registrá tu negocio
          </button>
        </div>

        <div className="hero-search">
          <input
            type="text"
            placeholder="Busca un producto, servicio o emprendedor..."
            value={texto}
            onChange={e => setTexto(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          {busqueda && (
            <button className="btn-limpiar" onClick={limpiar}>✕</button>
          )}
          <button onClick={handleBuscar}>Buscar</button>
        </div>

        {busqueda && (
          <p className="hero-resultado">
            Resultados para: <strong>{busqueda}</strong>
          </p>
        )}

      </div>
    </section>
  )
}