import { useState } from 'react'

const SECTORES = [
  { id: 1, icono: '🍽️', nombre: 'Comida & Bebidas',    cantidad: 214 },
  { id: 2, icono: '💇', nombre: 'Belleza & Estética',   cantidad: 130 },
  { id: 3, icono: '👗', nombre: 'Moda & Ropa',          cantidad: 98  },
  { id: 4, icono: '🎨', nombre: 'Arte & Artesanías',    cantidad: 76  },
  { id: 5, icono: '🛠️', nombre: 'Servicios del Hogar', cantidad: 112 },
  { id: 6, icono: '📱', nombre: 'Tecnología',           cantidad: 54  },
  { id: 7, icono: '🌿', nombre: 'Salud & Bienestar',    cantidad: 88  },
  { id: 8, icono: '📚', nombre: 'Educación',            cantidad: 61  },
]

export default function Sectores({ onSeleccionar }) {
  const [activo, setActivo] = useState(null)

  const handleClick = (sector) => {
    const nuevo = activo === sector.id ? null : sector.id
    setActivo(nuevo)

    // Emitir al padre el nombre del sector o null para limpiar
    onSeleccionar(nuevo ? sector.nombre : '')

    // Scroll a emprendedores
    setTimeout(() => {
      const el = document.getElementById('emprendedores')
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  return (
    <section className="sectores">
      <div className="section-header">
        <h2>Explorá por sector</h2>
        {activo && (
          <a className="ver-todos" onClick={() => { setActivo(null); onSeleccionar('') }}>
            Limpiar filtro ✕
          </a>
        )}
        {!activo && <a className="ver-todos">Ver todos →</a>}
      </div>

      <div className="sectores-grid">
        {SECTORES.map(sector => (
          <div
            key={sector.id}
            className={`sector-card ${activo === sector.id ? 'activo' : ''}`}
            onClick={() => handleClick(sector)}
          >
            <div className="sector-icono">{sector.icono}</div>
            <div className="sector-nombre">{sector.nombre}</div>
            <div className="sector-cantidad">{sector.cantidad} negocios</div>
          </div>
        ))}
      </div>
    </section>
  )
}