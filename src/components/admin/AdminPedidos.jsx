import { useState } from 'react'

const PEDIDOS_MOCK = [
  { id: 'PC-001', cliente: 'Ana Mora',    emprendedor: 'Dulces de Lucía',   producto: 'Pastel personalizado', total: 8500,  estado: 'En preparación', fecha: '21/03/2026' },
  { id: 'PC-002', cliente: 'Carlos Vega', emprendedor: 'TecnoSolano',       producto: 'Reparación celular',   total: 6400,  estado: 'Entregado',      fecha: '18/03/2026' },
  { id: 'PC-003', cliente: 'María López', emprendedor: 'Tejidos Ana Sofía', producto: 'Blusa bordada',        total: 9000,  estado: 'Pendiente',      fecha: '21/03/2026' },
]

const COLORES = {
  'Pendiente':      'amber',
  'Confirmado':     'sky',
  'En preparación': 'lavender',
  'En camino':      'peach',
  'Entregado':      'mint',
}

function formatColones(n) {
  return '₡' + Number(n).toLocaleString('es-CR')
}

export default function AdminPedidos() {
  const [filtro, setFiltro] = useState('Todos')

  const ESTADOS = ['Todos', 'Pendiente', 'Confirmado', 'En preparación', 'En camino', 'Entregado']

  const filtrados = filtro === 'Todos'
    ? PEDIDOS_MOCK
    : PEDIDOS_MOCK.filter(p => p.estado === filtro)

  return (
    <div className="dash-seccion" style={{ maxWidth: '100%' }}>
      <h2 className="dash-titulo">Todos los pedidos</h2>

      <div className="pedidos-filtros">
        {ESTADOS.map(e => (
          <button
            key={e}
            className={`filtro-btn ${filtro === e ? 'filtro-btn--activo' : ''}`}
            onClick={() => setFiltro(e)}
          >
            {e}
          </button>
        ))}
      </div>

      <div className="pedidos-lista">
        {filtrados.map(p => (
          <div key={p.id} className="pedido-item">
            <div className="pedido-header">
              <span className="pedido-id">{p.id} · {p.fecha}</span>
              <span className={`estado-badge estado-badge--${COLORES[p.estado]}`}>{p.estado}</span>
            </div>
            <p className="pedido-cliente">👤 {p.cliente}</p>
            <p className="pedido-producto">🌱 {p.emprendedor} · 📦 {p.producto}</p>
            <div className="pedido-footer">
              <span className="pedido-monto">{formatColones(p.total)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}