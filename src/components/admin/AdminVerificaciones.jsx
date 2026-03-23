// src/components/admin/AdminVerificaciones.jsx
import { useState } from 'react'

export default function AdminVerificaciones({ admin }) {
  const [solicitudes, setSolicitudes] = useState([
    { id: 'V-001', negocio: 'Dulces de Lucía',  email: 'lucia@correo.com',  fecha: '21/03/2026', estado: 'Pendiente', comprobante: 'SINPE-8888'   },
    { id: 'V-002', negocio: 'TecnoSolano',      email: 'marcos@correo.com', fecha: '20/03/2026', estado: 'Pendiente', comprobante: 'Transfer-BCR' },
    { id: 'V-003', negocio: 'Verde Vivo CR',    email: 'verde@correo.com',  fecha: '19/03/2026', estado: 'Aprobado',  comprobante: 'SINPE-7777'   },
  ])

  const cambiarEstado = (id, nuevoEstado) => {
    setSolicitudes(prev => prev.map(s => s.id === id ? { ...s, estado: nuevoEstado } : s))
  }

  const COLORES      = { 'Pendiente': 'amber', 'Aprobado': 'mint', 'Rechazado': 'peach' }
  const esSuperAdmin = admin.rol === 'superadmin'

  return (
    <div className="dash-seccion">
      <h2 className="dash-titulo">Verificaciones de negocio</h2>
      <p style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '1.5rem' }}>
        Solicitudes de emprendedores que pagaron la verificación y esperan aprobación.
      </p>
      <div className="pedidos-lista">
        {solicitudes.map(s => (
          <div key={s.id} className="pedido-item">
            <div className="pedido-header">
              <span className="pedido-id">{s.id}</span>
              <span className={`estado-badge estado-badge--${COLORES[s.estado]}`}>{s.estado}</span>
            </div>
            <p className="pedido-cliente">🌱 {s.negocio}</p>
            <p className="pedido-producto">📧 {s.email}</p>
            <p style={{ fontSize: '12px', color: 'var(--muted)', marginBottom: '10px' }}>
              💳 {s.comprobante} · 📅 {s.fecha}
            </p>
            {s.estado === 'Pendiente' && (
              <div className="pedido-footer">
                <button
                  className="btn-primary"
                  style={{ fontSize: '12px', padding: '6px 16px', background: '#1a9e6e' }}
                  onClick={() => cambiarEstado(s.id, 'Aprobado')}
                >
                  ✓ Aprobar
                </button>
                {esSuperAdmin && (
                  <button
                    className="btn-primary"
                    style={{ fontSize: '12px', padding: '6px 16px', background: '#e53e3e' }}
                    onClick={() => cambiarEstado(s.id, 'Rechazado')}
                  >
                    ✕ Rechazar
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}