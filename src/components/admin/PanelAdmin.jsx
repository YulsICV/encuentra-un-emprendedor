// src/components/admin/PanelAdmin.jsx
import { useState } from 'react'
import AdminEmprendedores  from './AdminEmprendedores'
import AdminPedidos        from './AdminPedidos'
import AdminEstadisticas   from './AdminEstadisticas'
import AdminVerificaciones from './AdminVerificaciones'
import AdminMembresias     from './AdminMembresias'
import AdminContrasenas    from './AdminContrasenas'

const SECCIONES_ADMIN = [
  { id: 'estadisticas',   icono: '📊', label: 'Estadísticas',  roles: ['superadmin', 'asistente'] },
  { id: 'emprendedores',  icono: '🌱', label: 'Emprendedores', roles: ['superadmin', 'asistente'] },
  { id: 'pedidos',        icono: '📦', label: 'Pedidos',        roles: ['superadmin', 'asistente'] },
  { id: 'verificaciones', icono: '✅', label: 'Verificaciones', roles: ['superadmin', 'asistente'] },
  { id: 'membresias',     icono: '💳', label: 'Membresías',     roles: ['superadmin']              },
  { id: 'contrasenas',    icono: '🔑', label: 'Contraseñas',    roles: ['superadmin']              },
]

export default function PanelAdmin({ admin, onSalir }) {
  const [seccion, setSeccion]               = useState('estadisticas')
  const [confirmarSalir, setConfirmarSalir] = useState(false)

  const seccionesVisibles = SECCIONES_ADMIN.filter(s => s.roles.includes(admin.rol))

  return (
    <div className="dash-layout">

      {/* Modal confirmar salir */}
      {confirmarSalir && (
        <div className="modal-overlay">
          <div className="modal-card" style={{ textAlign: 'center', maxWidth: '340px' }}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>👋</div>
            <h3 style={{ fontFamily: 'Playfair Display, serif', marginBottom: '.5rem' }}>
              ¿Salir del panel?
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '1.5rem' }}>
              Vas a cerrar sesión como administrador.
            </p>
            <div className="btn-row">
              <button className="btn-secondary" onClick={() => setConfirmarSalir(false)}>
                Cancelar
              </button>
              <button className="btn-primary" onClick={onSalir} style={{ flex: 2 }}>
                Salir
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar oscuro */}
      <aside className="dash-sidebar admin-sidebar">
        <div className="dash-perfil">
          <div className="dash-avatar admin-avatar">
            {admin.avatar}
          </div>
          <div>
            <p className="dash-nombre admin-nombre">{admin.nombre}</p>
            <p className="dash-negocio admin-rol">
              {admin.rol === 'superadmin' ? '⚙️ Super Admin' : '🛠️ Asistente'}
            </p>
          </div>
        </div>

        <nav className="dash-nav">
          {seccionesVisibles.map(s => (
            <button
              key={s.id}
              className={`dash-nav-btn ${seccion === s.id ? 'dash-nav-btn--admin-activo' : 'dash-nav-btn--admin'}`}
              onClick={() => setSeccion(s.id)}
            >
              <span>{s.icono}</span>
              {s.label}
            </button>
          ))}
        </nav>

        <button
          className="dash-salir admin-salir"
          onClick={() => setConfirmarSalir(true)}
        >
          {'← Salir del panel'}
        </button>
      </aside>

      {/* Contenido principal */}
      <main className="dash-main">
        {seccion === 'estadisticas'   && <AdminEstadisticas />}
        {seccion === 'emprendedores'  && <AdminEmprendedores admin={admin} />}
        {seccion === 'pedidos'        && <AdminPedidos />}
        {seccion === 'verificaciones' && <AdminVerificaciones admin={admin} />}
        {seccion === 'membresias'     && <AdminMembresias />}
        {seccion === 'contrasenas'    && <AdminContrasenas />}
      </main>

    </div>
  )
}