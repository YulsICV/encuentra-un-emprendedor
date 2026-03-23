// src/components/admin/AdminEmprendedores.jsx
import { useState } from 'react'
import { EMPRENDEDORES } from '../../data/emprendedores'

const STORAGE_KEY_PREFIX = 'correo_'

function enviarMensajeAdmin(emailEmprendedor, adminNombre, asunto, cuerpo) {
  try {
    const key    = `${STORAGE_KEY_PREFIX}${emailEmprendedor}`
    const saved  = localStorage.getItem(key)
    const previos = saved ? JSON.parse(saved) : []
    const nuevo  = {
      id:       Date.now(),
      de:       'admin',
      deNombre: `⚙️ ${adminNombre}`,
      para:     'emprendedor',
      asunto,
      cuerpo,
      fecha:    new Date().toISOString(),
      leido:    false,
    }
    localStorage.setItem(key, JSON.stringify([...previos, nuevo]))
    return true
  } catch {
    return false
  }
}

export default function AdminEmprendedores({ admin }) {
  const [lista, setLista] = useState(
    EMPRENDEDORES.map(e => ({ ...e, estado: 'Activo', plan: 'Gratis' }))
  )
  const [busqueda,   setBusqueda]   = useState('')
  const [modal,      setModal]      = useState(null)  // { emprendedor } | null
  const [asunto,     setAsunto]     = useState('')
  const [cuerpo,     setCuerpo]     = useState('')
  const [errMsg,     setErrMsg]     = useState('')
  const [enviado,    setEnviado]    = useState(false)
  const [enviando,   setEnviando]   = useState(false)

  const esSuperAdmin = admin.rol === 'superadmin'

  const cambiarEstado = (id) => {
    setLista(prev => prev.map(e =>
      e.id === id ? { ...e, estado: e.estado === 'Activo' ? 'Suspendido' : 'Activo' } : e
    ))
  }

  const eliminar = (id, nombre) => {
    if (window.confirm(`¿Seguro que querés eliminar "${nombre}"? Esta acción no se puede deshacer.`)) {
      setLista(prev => prev.filter(e => e.id !== id))
    }
  }

  const abrirModal = (emp) => {
    setModal(emp)
    setAsunto('')
    setCuerpo('')
    setErrMsg('')
    setEnviado(false)
  }

  const cerrarModal = () => {
    setModal(null)
    setEnviado(false)
  }

  const enviar = () => {
    if (!asunto.trim()) { setErrMsg('El asunto es requerido.'); return }
    if (!cuerpo.trim()) { setErrMsg('El mensaje no puede estar vacío.'); return }
    setErrMsg('')
    setEnviando(true)

    setTimeout(() => {
      // Usamos el email del emprendedor como clave; si no existe usamos el id
      const emailDestino = modal.email || `emp_${modal.id}`
      enviarMensajeAdmin(emailDestino, admin.nombre, asunto.trim(), cuerpo.trim())
      setEnviando(false)
      setEnviado(true)
    }, 600)
  }

  const filtrados = busqueda
    ? lista.filter(e =>
        e.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        e.negocio.toLowerCase().includes(busqueda.toLowerCase())
      )
    : lista

  return (
    <div className="dash-seccion" style={{ maxWidth: '100%' }}>
      <h2 className="dash-titulo">Emprendedores</h2>

      {/* Buscador */}
      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Buscar por nombre o negocio..."
          value={busqueda}
          onChange={e => setBusqueda(e.target.value)}
          style={{
            width: '100%', padding: '10px 14px', borderRadius: '10px',
            border: '1.5px solid var(--border)', fontSize: '14px',
            fontFamily: 'Nunito, sans-serif', outline: 'none'
          }}
        />
      </div>

      {filtrados.length === 0 ? (
        <div className="sin-resultados">
          <p>😕 No se encontraron emprendedores.</p>
        </div>
      ) : (
        <div className="pedidos-lista">
          {filtrados.map(e => (
            <div key={e.id} className="pedido-item">
              <div className="pedido-header">
                <span style={{ fontSize: '14px', fontWeight: 800 }}>{e.avatar} {e.negocio}</span>
                <span className={`estado-badge estado-badge--${e.estado === 'Activo' ? 'mint' : 'peach'}`}>
                  {e.estado}
                </span>
              </div>
              <p className="pedido-cliente">👤 {e.nombre} · 📍 {e.provincia}</p>
              <p className="pedido-producto">🗂️ {e.sector}</p>
              <div className="pedido-footer" style={{ flexWrap: 'wrap', gap: '8px' }}>
                <span className="estado-badge estado-badge--amber">{e.plan}</span>

                {/* ✉️ Botón mensaje — visible para todos los admins */}
                <button
                  className="btn-primary"
                  style={{ fontSize: '12px', padding: '5px 14px', background: '#2563eb' }}
                  onClick={() => abrirModal(e)}
                >
                  ✉️ Mensaje
                </button>

                {esSuperAdmin && (
                  <>
                    <button
                      className="btn-primary"
                      style={{ fontSize: '12px', padding: '5px 14px', background: e.estado === 'Activo' ? '#e53e3e' : '#1a9e6e' }}
                      onClick={() => cambiarEstado(e.id)}
                    >
                      {e.estado === 'Activo' ? 'Suspender' : 'Activar'}
                    </button>
                    <button
                      className="btn-primary"
                      style={{ fontSize: '12px', padding: '5px 14px', background: '#2d2d2d' }}
                      onClick={() => eliminar(e.id, e.negocio)}
                    >
                      🗑️ Eliminar
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Modal de mensaje ── */}
      {modal && (
        <div className="modal-overlay" onClick={cerrarModal}>
          <div
            className="modal-card"
            style={{ maxWidth: '480px', width: '100%' }}
            onClick={e => e.stopPropagation()}
          >
            {!enviado ? (
              <>
                <h3 style={{ fontFamily: 'Playfair Display, serif', marginBottom: '.25rem' }}>
                  ✉️ Enviar mensaje
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '1.2rem' }}>
                  Para: <strong>{modal.avatar} {modal.nombre}</strong> · {modal.negocio}
                </p>

                <div className="campo" style={{ marginBottom: '.75rem' }}>
                  <label>Asunto</label>
                  <input
                    value={asunto}
                    onChange={e => { setAsunto(e.target.value); setErrMsg('') }}
                    placeholder="ej. Verificación de cuenta"
                    maxLength={80}
                  />
                </div>

                <div className="campo" style={{ marginBottom: '.75rem' }}>
                  <label>Mensaje</label>
                  <textarea
                    value={cuerpo}
                    onChange={e => { setCuerpo(e.target.value); setErrMsg('') }}
                    placeholder="Escribí el mensaje para este emprendedor..."
                    rows={5}
                    style={{ resize: 'vertical' }}
                  />
                </div>

                {errMsg && <p className="tags-error" style={{ marginBottom: '.75rem' }}>{errMsg}</p>}

                <div className="btn-row">
                  <button className="btn-secondary" onClick={cerrarModal}>Cancelar</button>
                  <button
                    className="btn-primary"
                    onClick={enviar}
                    disabled={enviando}
                    style={{ flex: 2 }}
                  >
                    {enviando ? 'Enviando...' : '📤 Enviar mensaje'}
                  </button>
                </div>
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                <p style={{ fontSize: '2.5rem', marginBottom: '.75rem' }}>✅</p>
                <h3 style={{ fontFamily: 'Playfair Display, serif', marginBottom: '.5rem' }}>
                  Mensaje enviado
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '1.5rem' }}>
                  {modal.nombre} lo verá en su correo interno del panel.
                </p>
                <button className="btn-primary" onClick={cerrarModal}>Cerrar</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}