// src/components/admin/AdminMembresias.jsx
import { useState } from 'react'

const DIAS_GRACIA = 7

function diasEntre(fecha1, fecha2) {
  const d1 = new Date(fecha1)
  const d2 = new Date(fecha2)
  return Math.ceil((d2 - d1) / (1000 * 60 * 60 * 24))
}

function hoy() {
  return new Date().toISOString().split('T')[0]
}

function formatFecha(fecha) {
  if (!fecha) return '-'
  const [y, m, d] = fecha.split('-')
  return `${d}/${m}/${y}`
}

const USUARIOS_INIT = [
  {
    id: 1,
    nombre:      'Lucía Ramírez',
    email:       'lucia@correo.com',
    plan:        'Emprendedor',
    estado:      'Activo',
    inicio:      '2026-03-01',
    vence:       '2026-04-01',
    descuento:   0,
    estrella:    true,
    degradaciones: 0,
    historial: [
      { fecha: '2026-02-01', plan: 'Gratis',      monto: 0,    nota: 'Registro inicial' },
      { fecha: '2026-03-01', plan: 'Emprendedor', monto: 4990, nota: 'Pago SINPE' },
    ],
  },
  {
    id: 2,
    nombre:      'Marcos Solano',
    email:       'marcos@correo.com',
    plan:        'Negocio Pro',
    estado:      'Activo',
    inicio:      '2026-03-10',
    vence:       '2026-04-10',
    descuento:   10,
    estrella:    false,
    degradaciones: 1,
    historial: [
      { fecha: '2026-01-10', plan: 'Gratis',      monto: 0,    nota: 'Registro inicial'   },
      { fecha: '2026-02-10', plan: 'Emprendedor', monto: 4990, nota: 'Pago SINPE'          },
      { fecha: '2026-02-20', plan: 'Gratis',      monto: 0,    nota: 'Degradado por mora'  },
      { fecha: '2026-03-10', plan: 'Negocio Pro', monto: 9990, nota: 'Pago con 10% descto' },
    ],
  },
  {
    id: 3,
    nombre:      'Ana Sofía Vargas',
    email:       'ana@correo.com',
    plan:        'Gratis',
    estado:      'Activo',
    inicio:      '2026-01-15',
    vence:       null,
    descuento:   0,
    estrella:    false,
    degradaciones: 0,
    historial: [
      { fecha: '2026-01-15', plan: 'Gratis', monto: 0, nota: 'Registro inicial' },
    ],
  },
]

const PLANES      = ['Gratis', 'Emprendedor', 'Negocio Pro']
const PLAN_COLOR  = { 'Gratis': 'amber', 'Emprendedor': 'mint', 'Negocio Pro': 'lavender' }
const PLAN_PRECIO = { 'Gratis': 0, 'Emprendedor': 4990, 'Negocio Pro': 9990 }

function formatColones(n) {
  return '₡' + Number(n).toLocaleString('es-CR')
}

// ── MODAL HISTORIAL ──
function ModalHistorial({ usuario, onCerrar }) {
  return (
    <div className="modal-overlay">
      <div className="modal-card" style={{ maxWidth: '480px' }}>
        <div className="modal-header">
          <h3>Historial de pagos</h3>
          <p>{usuario.nombre} · {usuario.email}</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '1rem' }}>
          {usuario.historial.map((h, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', background: 'var(--cream)', borderRadius: '10px', gap: '8px', flexWrap: 'wrap' }}>
              <div>
                <p style={{ fontSize: '13px', fontWeight: 800 }}>{h.plan}</p>
                <p style={{ fontSize: '11px', color: 'var(--muted)' }}>{h.nota}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: '13px', fontWeight: 700, color: 'var(--mint-dark)' }}>
                  {h.monto === 0 ? 'Gratis' : formatColones(h.monto)}
                </p>
                <p style={{ fontSize: '11px', color: 'var(--muted)' }}>{formatFecha(h.fecha)}</p>
              </div>
            </div>
          ))}
        </div>

        <button className="btn-primary" style={{ width: '100%' }} onClick={onCerrar}>
          Cerrar
        </button>
      </div>
    </div>
  )
}

// ── MODAL EDITAR MEMBRESÍA ──
function ModalEditar({ usuario, onGuardar, onCerrar }) {
  const [form, setForm] = useState({
    plan:      usuario.plan,
    inicio:    usuario.inicio,
    vence:     usuario.vence || '',
    descuento: usuario.descuento,
    nota:      '',
  })

  const handleGuardar = () => {
    if (!form.nota.trim()) {
      alert('Escribí una nota para el historial')
      return
    }
    onGuardar(usuario.id, form)
  }

  return (
    <div className="modal-overlay">
      <div className="modal-card" style={{ maxWidth: '440px' }}>
        <div className="modal-header">
          <h3>Editar membresía</h3>
          <p>{usuario.nombre}</p>
        </div>

        <div className="campo">
          <label>Plan</label>
          <select value={form.plan} onChange={e => setForm(p => ({ ...p, plan: e.target.value }))}>
            {PLANES.map(pl => <option key={pl}>{pl}</option>)}
          </select>
        </div>

        <div className="campo">
          <label>Fecha de inicio</label>
          <input
            type="date"
            value={form.inicio}
            onChange={e => setForm(p => ({ ...p, inicio: e.target.value }))}
          />
        </div>

        <div className="campo">
          <label>Fecha de vencimiento</label>
          <input
            type="date"
            value={form.vence}
            onChange={e => setForm(p => ({ ...p, vence: e.target.value }))}
          />
          <span className="campo-hint">Dejá vacío si es plan Gratis sin vencimiento</span>
        </div>

        <div className="campo">
          <label>Descuento aplicado (%)</label>
          <input
            type="number"
            min="0"
            max="100"
            value={form.descuento}
            onChange={e => setForm(p => ({ ...p, descuento: Number(e.target.value) }))}
          />
          <span className="campo-hint">
            {form.descuento > 0
              ? `Precio con descuento: ${formatColones(PLAN_PRECIO[form.plan] * (1 - form.descuento / 100))}`
              : 'Sin descuento'}
          </span>
        </div>

        <div className="campo">
          <label>Nota para el historial</label>
          <input
            type="text"
            value={form.nota}
            onChange={e => setForm(p => ({ ...p, nota: e.target.value }))}
            placeholder="ej. Renovación manual, descuento por fidelidad..."
          />
        </div>

        <div className="btn-row">
          <button className="btn-secondary" onClick={onCerrar}>Cancelar</button>
          <button className="btn-primary" onClick={handleGuardar} style={{ flex: 2 }}>
            Guardar cambios
          </button>
        </div>
      </div>
    </div>
  )
}

// ── MODAL ELIMINAR ──
function ModalEliminar({ usuario, onConfirmar, onCerrar }) {
  return (
    <div className="modal-overlay">
      <div className="modal-card" style={{ textAlign: 'center', maxWidth: '360px' }}>
        <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🗑️</div>
        <h3 style={{ fontFamily: 'Playfair Display, serif', marginBottom: '.5rem' }}>
          ¿Eliminar cuenta?
        </h3>
        <p style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '.75rem' }}>
          Vas a eliminar permanentemente la cuenta de:
        </p>
        <div style={{ background: 'var(--cream)', borderRadius: '12px', padding: '12px', marginBottom: '1rem' }}>
          <p style={{ fontWeight: 800, fontSize: '14px' }}>{usuario.nombre}</p>
          <p style={{ fontSize: '12px', color: 'var(--muted)' }}>{usuario.email}</p>
          <p style={{ fontSize: '12px', color: 'var(--muted)' }}>Plan: {usuario.plan}</p>
        </div>
        <div style={{ background: '#fee2e2', borderRadius: '10px', padding: '10px 14px', fontSize: '12px', color: '#b91c1c', marginBottom: '1.25rem', textAlign: 'left' }}>
          ⚠️ Esta acción <strong>no se puede deshacer</strong>. Se eliminará el perfil, productos y datos del emprendedor.
        </div>
        <div className="btn-row">
          <button className="btn-secondary" onClick={onCerrar}>Cancelar</button>
          <button
            className="btn-primary"
            style={{ flex: 2, background: '#e53e3e' }}
            onClick={onConfirmar}
          >
            Sí, eliminar cuenta
          </button>
        </div>
      </div>
    </div>
  )
}

// ── COMPONENTE PRINCIPAL ──
export default function AdminMembresias() {
  const [usuarios, setUsuarios]         = useState(USUARIOS_INIT)
  const [modalHistorial, setModalHistorial] = useState(null)
  const [modalEditar, setModalEditar]   = useState(null)
  const [modalEliminar, setModalEliminar] = useState(null)
  const [filtro, setFiltro]             = useState('Todos')

  const hoyStr = hoy()

  // Calcular estado real de cada usuario
  const usuariosConEstado = usuarios.map(u => {
    if (!u.vence || u.plan === 'Gratis') return { ...u, diasRestantes: null, enGracia: false }
    const diasRestantes = diasEntre(hoyStr, u.vence)
    const enGracia      = diasRestantes < 0 && diasRestantes >= -DIAS_GRACIA
    const vencido       = diasRestantes < -DIAS_GRACIA
    return { ...u, diasRestantes, enGracia, vencido }
  })

  const filtrados = filtro === 'Todos'
    ? usuariosConEstado
    : usuariosConEstado.filter(u => u.plan === filtro)

  const handleGuardarEdicion = (id, form) => {
    setUsuarios(prev => prev.map(u => {
      if (u.id !== id) return u
      const esDegradacion = form.plan === 'Gratis' && u.plan !== 'Gratis'
      return {
        ...u,
        plan:          form.plan,
        inicio:        form.inicio,
        vence:         form.vence || null,
        descuento:     form.descuento,
        degradaciones: esDegradacion ? u.degradaciones + 1 : u.degradaciones,
        historial: [...u.historial, {
          fecha: hoyStr,
          plan:  form.plan,
          monto: PLAN_PRECIO[form.plan] * (1 - form.descuento / 100),
          nota:  form.nota,
        }],
      }
    }))
    setModalEditar(null)
  }

  const handleEliminar = (id) => {
    setUsuarios(prev => prev.filter(u => u.id !== id))
    setModalEliminar(null)
  }

  const toggleEstrella = (id) => {
    setUsuarios(prev => prev.map(u =>
      u.id === id ? { ...u, estrella: !u.estrella } : u
    ))
  }

  return (
    <div className="dash-seccion" style={{ maxWidth: '100%' }}>
      <h2 className="dash-titulo">Gestión de membresías</h2>

      {/* Modales */}
      {modalHistorial && (
        <ModalHistorial usuario={modalHistorial} onCerrar={() => setModalHistorial(null)} />
      )}
      {modalEditar && (
        <ModalEditar
          usuario={modalEditar}
          onGuardar={handleGuardarEdicion}
          onCerrar={() => setModalEditar(null)}
        />
      )}
      {modalEliminar && (
        <ModalEliminar
          usuario={modalEliminar}
          onConfirmar={() => handleEliminar(modalEliminar.id)}
          onCerrar={() => setModalEliminar(null)}
        />
      )}

      {/* Filtros */}
      <div className="pedidos-filtros" style={{ marginBottom: '1.5rem' }}>
        {['Todos', ...PLANES].map(f => (
          <button
            key={f}
            className={`filtro-btn ${filtro === f ? 'filtro-btn--activo' : ''}`}
            onClick={() => setFiltro(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Tarjetas */}
      <div className="pedidos-lista">
        {filtrados.map(u => {
          const diasText = u.diasRestantes !== null
            ? u.diasRestantes > 0
              ? `${u.diasRestantes} días restantes`
              : u.enGracia
                ? `⚠️ Gracia: ${DIAS_GRACIA + u.diasRestantes} días`
                : '🔴 Vencido — degradar a Gratis'
            : null

          return (
            <div
              key={u.id}
              className="pedido-item"
              style={{ borderLeft: u.estrella ? '3px solid #f59e0b' : u.enGracia ? '3px solid #f59e0b' : u.vencido ? '3px solid #e53e3e' : '' }}
            >
              {/* Header */}
              <div className="pedido-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="pedido-id">{u.email}</span>
                  {u.estrella && <span title="Emprendedor estrella" style={{ fontSize: '14px' }}>⭐</span>}
                  {u.degradaciones > 0 && (
                    <span style={{ fontSize: '11px', background: '#fee2e2', color: '#b91c1c', padding: '2px 8px', borderRadius: '50px', fontWeight: 700 }}>
                      {u.degradaciones}x degradado
                    </span>
                  )}
                </div>
                <span className={`estado-badge estado-badge--${u.estado === 'Activo' ? 'mint' : 'peach'}`}>
                  {u.estado}
                </span>
              </div>

              {/* Info */}
              <p className="pedido-cliente">👤 {u.nombre}</p>

              {/* Plan y fechas */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', margin: '8px 0', alignItems: 'center' }}>
                <span className={`estado-badge estado-badge--${PLAN_COLOR[u.plan]}`}>
                  {u.plan}
                </span>
                {u.descuento > 0 && (
                  <span style={{ fontSize: '11px', background: 'var(--lavender)', color: 'var(--lav-dark)', padding: '2px 8px', borderRadius: '50px', fontWeight: 700 }}>
                    {u.descuento}% descuento
                  </span>
                )}
              </div>

              {/* Fechas */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '8px', margin: '8px 0' }}>
                <div style={{ background: 'var(--cream)', borderRadius: '8px', padding: '7px 10px' }}>
                  <p style={{ fontSize: '10px', color: 'var(--muted)', fontWeight: 700, textTransform: 'uppercase' }}>Inicio</p>
                  <p style={{ fontSize: '13px', fontWeight: 800 }}>{formatFecha(u.inicio)}</p>
                </div>
                <div style={{ background: 'var(--cream)', borderRadius: '8px', padding: '7px 10px' }}>
                  <p style={{ fontSize: '10px', color: 'var(--muted)', fontWeight: 700, textTransform: 'uppercase' }}>Vence</p>
                  <p style={{ fontSize: '13px', fontWeight: 800 }}>{u.vence ? formatFecha(u.vence) : '—'}</p>
                </div>
                {diasText && (
                  <div style={{ background: u.vencido ? '#fee2e2' : u.enGracia ? '#fef3c7' : 'var(--mint)', borderRadius: '8px', padding: '7px 10px' }}>
                    <p style={{ fontSize: '10px', color: 'var(--muted)', fontWeight: 700, textTransform: 'uppercase' }}>Estado</p>
                    <p style={{ fontSize: '12px', fontWeight: 800, color: u.vencido ? '#b91c1c' : u.enGracia ? '#92400e' : 'var(--mint-dark)' }}>
                      {diasText}
                    </p>
                  </div>
                )}
                <div style={{ background: 'var(--cream)', borderRadius: '8px', padding: '7px 10px' }}>
                  <p style={{ fontSize: '10px', color: 'var(--muted)', fontWeight: 700, textTransform: 'uppercase' }}>Gracia</p>
                  <p style={{ fontSize: '13px', fontWeight: 800 }}>{DIAS_GRACIA} días</p>
                </div>
              </div>

              {/* Acciones */}
              <div className="pedido-footer" style={{ flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
                <button
                  className="btn-ver"
                  style={{ fontSize: '11px', padding: '5px 12px' }}
                  onClick={() => setModalHistorial(u)}
                >
                  📋 Historial
                </button>
                <button
                  className="btn-ver"
                  style={{ fontSize: '11px', padding: '5px 12px' }}
                  onClick={() => setModalEditar(u)}
                >
                  ✏️ Editar plan
                </button>
                <button
                  className="btn-ver"
                  style={{ fontSize: '11px', padding: '5px 12px', color: u.estrella ? '#f59e0b' : 'var(--muted)', borderColor: u.estrella ? '#f59e0b' : 'var(--border)' }}
                  onClick={() => toggleEstrella(u.id)}
                >
                  {u.estrella ? '⭐ Estrella' : '☆ Estrella'}
                </button>
                <button
                  className="btn-primary"
                  style={{ fontSize: '11px', padding: '5px 12px', background: '#e53e3e' }}
                  onClick={() => setModalEliminar(u)}
                >
                  🗑️ Eliminar
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Leyenda */}
      <div style={{ marginTop: '1.5rem', display: 'flex', gap: '12px', flexWrap: 'wrap', fontSize: '11px', color: 'var(--muted)' }}>
        <span>⭐ Emprendedor estrella</span>
        <span style={{ color: '#f59e0b' }}>⚠️ En período de gracia</span>
        <span style={{ color: '#e53e3e' }}>🔴 Cuenta vencida</span>
        <span style={{ color: '#b91c1c' }}>🔢 Veces degradado</span>
      </div>
    </div>
  )
}