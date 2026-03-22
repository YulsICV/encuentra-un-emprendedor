import { useState } from 'react'

const ESTADOS = ['Pendiente', 'Confirmado', 'En preparación', 'En camino', 'Entregado']

const COLORES = {
  'Pendiente':       'amber',
  'Confirmado':      'sky',
  'En preparación':  'lavender',
  'En camino':       'peach',
  'Entregado':       'mint',
}

const pedidosIniciales = [
  { id: 'P-001', cliente: 'Ana Mora',     producto: 'Pastel personalizado', monto: 8500,  estado: 'Pendiente'      },
  { id: 'P-002', cliente: 'Carlos Vega',  producto: 'Cupcakes x12',         monto: 8500,  estado: 'En preparación' },
  { id: 'P-003', cliente: 'María López',  producto: 'Pastel personalizado', monto: 8500,  estado: 'En camino'      },
  { id: 'P-004', cliente: 'José Quirós',  producto: 'Torta de bodas',       monto: 45000, estado: 'Entregado'      },
]

export default function DashPedidos() {
  const [pedidos, setPedidos]       = useState(pedidosIniciales)
  const [filtro, setFiltro]         = useState('Todos')

  const avanzarEstado = (id) => {
    setPedidos(prev => prev.map(p => {
      if (p.id !== id) return p
      const idx = ESTADOS.indexOf(p.estado)
      if (idx === ESTADOS.length - 1) return p
      return { ...p, estado: ESTADOS[idx + 1] }
    }))
  }

  const pedidosFiltrados = filtro === 'Todos'
    ? pedidos
    : pedidos.filter(p => p.estado === filtro)

  return (
    <div className="dash-seccion">
      <h2 className="dash-titulo">Pedidos recibidos</h2>

      {/* Filtros */}
      <div className="pedidos-filtros">
        {['Todos', ...ESTADOS].map(f => (
          <button
            key={f}
            className={`filtro-btn ${filtro === f ? 'filtro-btn--activo' : ''}`}
            onClick={() => setFiltro(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Lista */}
      <div className="pedidos-lista">
        {pedidosFiltrados.map(p => (
          <div key={p.id} className="pedido-item">
            <div className="pedido-header">
              <span className="pedido-id">{p.id}</span>
              <span className={`estado-badge estado-badge--${COLORES[p.estado]}`}>
                {p.estado}
              </span>
            </div>
            <p className="pedido-cliente">👤 {p.cliente}</p>
            <p className="pedido-producto">📦 {p.producto}</p>
            <div className="pedido-footer">
              <span className="pedido-monto">
                ₡{p.monto.toLocaleString('es-CR')}
              </span>
              {p.estado !== 'Entregado' && (
                <button className="btn-avanzar" onClick={() => avanzarEstado(p.id)}>
                  Avanzar → {ESTADOS[ESTADOS.indexOf(p.estado) + 1]}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}