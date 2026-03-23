// src/components/admin/AdminContrasenas.jsx
import { useState } from 'react'

export default function AdminContrasenas() {
  const [usuarios, setUsuarios] = useState([
    { id: 1, nombre: 'Lucía Ramírez', email: 'lucia@correo.com',  tipo: 'Emprendedor', password: '12345678' },
    { id: 2, nombre: 'Marcos Solano', email: 'marcos@correo.com', tipo: 'Emprendedor', password: '12345678' },
    { id: 3, nombre: 'Ana Mora',      email: 'ana@correo.com',    tipo: 'Cliente',     password: '12345678' },
  ])
  const [editando, setEditando] = useState(null)
  const [nuevaPass, setNuevaPass] = useState('')
  const [guardado, setGuardado]   = useState(null)

  const resetear = (id) => {
    if (nuevaPass.length < 6) return
    setUsuarios(prev => prev.map(u => u.id === id ? { ...u, password: nuevaPass } : u))
    setEditando(null)
    setNuevaPass('')
    setGuardado(id)
    setTimeout(() => setGuardado(null), 2000)
  }

  return (
    <div className="dash-seccion">
      <h2 className="dash-titulo">Resetear contraseñas</h2>
      <p style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '1.5rem' }}>
        Solo usá esto cuando un usuario no pueda acceder a su cuenta.
      </p>
      <div className="pedidos-lista">
        {usuarios.map(u => (
          <div key={u.id} className="pedido-item">
            <div className="pedido-header">
              <span className="pedido-id">{u.tipo}</span>
            </div>
            <p className="pedido-cliente">👤 {u.nombre}</p>
            <p className="pedido-producto">📧 {u.email}</p>

            {guardado === u.id && (
              <div style={{ background: 'var(--mint)', borderRadius: '8px', padding: '6px 12px', fontSize: '12px', color: 'var(--mint-dark)', fontWeight: 700, marginBottom: '8px' }}>
                ✅ Contraseña actualizada
              </div>
            )}

            {editando === u.id ? (
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                <input
                  type="text"
                  value={nuevaPass}
                  onChange={e => setNuevaPass(e.target.value)}
                  placeholder="Nueva contraseña (mín. 6 caracteres)"
                  style={{ flex: 1, padding: '7px 12px', borderRadius: '8px', border: '1.5px solid var(--border)', fontSize: '13px', fontFamily: 'Nunito, sans-serif', minWidth: '200px' }}
                />
                <button className="btn-primary" style={{ fontSize: '12px', padding: '7px 14px' }} onClick={() => resetear(u.id)}>
                  Guardar
                </button>
                <button className="btn-secondary" style={{ fontSize: '12px', padding: '6px 14px' }} onClick={() => { setEditando(null); setNuevaPass('') }}>
                  Cancelar
                </button>
              </div>
            ) : (
              <div className="pedido-footer">
                <span style={{ fontSize: '12px', color: 'var(--muted)' }}>
                  {'•'.repeat(u.password.length)}
                </span>
                <button
                  className="btn-ver"
                  style={{ fontSize: '11px', padding: '4px 12px' }}
                  onClick={() => { setEditando(u.id); setNuevaPass('') }}
                >
                  Resetear
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}