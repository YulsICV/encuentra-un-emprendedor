// src/components/Emprendedores.jsx
import { useState } from 'react'
import TarjetaEmprendedor from './TarjetaEmprendedor'
import { EMPRENDEDORES } from '../data/emprendedores'

export default function Emprendedores({ busqueda }) {
  const [contactado, setContactado] = useState(null)
  const [pedidoA, setPedidoA]       = useState(null)

  const termino = busqueda.toLowerCase()
  const filtrados = termino
    ? EMPRENDEDORES.filter(e =>
        e.nombre.toLowerCase().includes(termino)    ||
        e.negocio.toLowerCase().includes(termino)   ||
        e.sector.toLowerCase().includes(termino)    ||
        e.provincia.toLowerCase().includes(termino) ||
        e.tags.some(t => t.toLowerCase().includes(termino))
      )
    : EMPRENDEDORES

  return (
    <section className="emprendedores">
      <div className="section-header">
        <h2>
          {busqueda
            ? `Resultados para "${busqueda}" (${filtrados.length})`
            : 'Conocé a los emprendedores'
          }
        </h2>
        <a className="ver-todos">Explorar todos →</a>
      </div>

      {filtrados.length === 0 ? (
        <div className="sin-resultados">
          <p>😕 No encontramos resultados para <strong>{busqueda}</strong></p>
          <p>Intentá con otro término o explorá por sector.</p>
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