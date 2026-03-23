// src/components/dashboard/Dashboard.jsx
import { useState } from 'react'
import DashResumen from './DashResumen'
import DashProductos from './DashProductos'
import DashOfertas from './DashOfertas'
import DashPedidos from './DashPedidos'
import DashPagos from './DashPagos'
import DashPerfil from './DashPerfil'
import DashCorreo from './DashCorreo'

const SECCIONES = [
  { id: 'perfil', icono: '👤', label: 'Mi Perfil' },
  { id: 'resumen', icono: '📊', label: 'Resumen' },
  { id: 'productos', icono: '📦', label: 'Productos' },
  { id: 'ofertas', icono: '🔥', label: 'Ofertas' },
  { id: 'pedidos', icono: '🛒', label: 'Pedidos' },
  { id: 'pagos', icono: '💳', label: 'Métodos de pago' },
  { id: 'correo', icono: '✉️', label: 'Correo' },
]

export default function Dashboard({ usuario, onSalir }) {
  const [seccion, setSeccion] = useState('resumen')

  return (
    <div className="dash-layout">
      <aside className="dash-sidebar">

        <div className="dash-perfil">
          <div className="dash-avatar">{usuario?.avatar || '👤'}</div>
          <div>
            <p className="dash-nombre">{usuario?.nombre || 'Mi negocio'}</p>
            <p className="dash-negocio">{usuario?.negocio || ''}</p>
          </div>
        </div>

        <nav className="dash-nav">
          {SECCIONES.map(s => (
            <button
              key={s.id}
              className={`dash-nav-btn ${seccion === s.id ? 'dash-nav-btn--activo' : ''}`}
              onClick={() => setSeccion(s.id)}
            >
              <span>{s.icono}</span>
              {s.label}
            </button>
          ))}
        </nav>

        <button className="dash-salir" onClick={onSalir}>
          ← Salir del panel
        </button>

      </aside>

      <main className="dash-main">
        {seccion === 'perfil' && <DashPerfil usuario={usuario} />}
        {seccion === 'resumen' && <DashResumen />}
        {seccion === 'productos' && <DashProductos />}
        {seccion === 'ofertas' && <DashOfertas />}
        {seccion === 'pedidos' && <DashPedidos />}
        {seccion === 'pagos' && <DashPagos />}
        {seccion === 'correo' && <DashCorreo usuario={usuario} />}
      </main>

    </div>
  )
}