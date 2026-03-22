import { useState } from 'react'
import TarjetaEmprendedor from './TarjetaEmprendedor'
import { EMPRENDEDORES } from '../data/emprendedores'

export default function Emprendedores({ busqueda, sector }) {
  const [contactado, setContactado] = useState(null)
  const [pedidoA, setPedidoA]       = useState(null)

  const termino = busqueda.toLowerCase()

  // Primero filtrá por búsqueda, luego por sector
  const filtrados = EMPRENDEDORES
    .filter(e => {
      if (!termino) return true
      return (
        e.nombre.toLowerCase().includes(termino)    ||
        e.negocio.toLowerCase().includes(termino)   ||
        e.sector.toLowerCase().includes(termino)    ||
        e.provincia.toLowerCase().includes(termino) ||
        e.tags.some(t => t.toLowerCase().includes(termino))
      )
    })
    .filter(e => {
      if (!sector) return true
      // Comparación flexible — "Comida & Bebidas" matchea "Comida & Repostería"
      return e.sector.toLowerCase().includes(sector.split(' & ')[0].toLowerCase())
    })

  const tituloSeccion = () => {
    if (busqueda) return `Resultados para "${busqueda}" (${filtrados.length})`
    if (sector)   return `${sector} (${filtrados.length})`
    return 'Conocé a los emprendedores'
  }

  return (
    <section className="emprendedores">
      <div className="section-header">
        <h2>{tituloSeccion()}</h2>
        <a className="ver-todos">Explorar todos →</a>
      </div>

      {filtrados.length === 0 ? (
        <div className="sin-resultados">
          <p>😕 No hay emprendedores en <strong>{sector || busqueda}</strong> todavía.</p>
          <p>¡Pronto habrá más! 🌱</p>
        </div>
      ) : (
        <div className="emprendedores-lista">
          {filtrados.map(emp => (
            <TarjetaEmprendedor
              key={emp.id}
              emprendedor={emp}
              onContactar={e => setContactado(e.nombre)}
              onPedir={e => setPedidoA(e.nombre)}
            />
          ))}
        </div>
      )}

      {contactado && (
        <div className="feedback feedback--contacto">
          💬 Abriendo chat con <strong>{contactado}</strong>...
        </div>
      )}
      {pedidoA && (
        <div className="feedback feedback--pedido">
          📦 Iniciando pedido con <strong>{pedidoA}</strong>...
        </div>
      )}
    </section>
  )
}