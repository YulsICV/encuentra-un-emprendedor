// src/components/PanelCliente.jsx
import { useState } from 'react'

const PEDIDOS_MOCK = [
  {
    id: 'PC-001',
    emprendedor: 'Dulces de Lucía',
    producto: 'Carrito (2 productos)',
    total: 20500,
    estado: 'En preparación',
    fecha: '21/03/2026',
  },
  {
    id: 'PC-002',
    emprendedor: 'TecnoSolano',
    producto: 'Reparación de celular',
    total: 6400,
    estado: 'Entregado',
    fecha: '18/03/2026',
  },
  {
    id: 'PC-003',
    emprendedor: 'Tejidos Ana Sofía',
    producto: 'Blusa bordada',
    total: 9000,
    estado: 'Pendiente',
    fecha: '21/03/2026',
  },
]

const FAVORITOS_MOCK = [
  { id: 1, avatar: '👩‍🍳', negocio: 'Dulces de Lucía',  sector: 'Comida & Repostería' },
  { id: 3, avatar: '👩‍🎨', negocio: 'Tejidos Ana Sofía', sector: 'Moda & Artesanías'   },
]

const COLORES_ESTADO = {
  'Pendiente':       'amber',
  'Confirmado':      'sky',
  'En preparación':  'lavender',
  'En camino':       'peach',
  'Entregado':       'mint',
}

function formatColones(n) {
  return '₡' + Number(n).toLocaleString('es-CR')
}

const SECCIONES = [
  { id: 'pedidos',   icono: '📦', label: 'Mis pedidos'    },
  { id: 'historial', icono: '📋', label: 'Historial'      },
  { id: 'favoritos', icono: '❤️', label: 'Favoritos'      },
  { id: 'datos',     icono: '👤', label: 'Mis datos'      },
]

// ── PEDIDOS ──
function SeccionPedidos({ pedidos }) {
  const activos = pedidos.filter(p => p.estado !== 'Entregado')
  return (
    <div className="dash-seccion">
      <h2 className="dash-titulo">Mis pedidos activos</h2>
      {activos.length === 0 ? (
        <div className="sin-resultados">
          <p>😊 No tenés pedidos activos ahora mismo.</p>
        </div>
      ) : (
        <div className="pedidos-lista">
          {activos.map(p => (
            <div key={p.id} className="pedido-item">
              <div className="pedido-header">
                <span className="pedido-id">{p.id}</span>
                <span className={`estado-badge estado-badge--${COLORES_ESTADO[p.estado]}`}>
                  {p.estado}
                </span>
              </div>
              <p className="pedido-cliente">🏪 {p.emprendedor}</p>
              <p className="pedido-producto">📦 {p.producto}</p>
              <div className="pedido-footer">
                <span className="pedido-monto">{formatColones(p.total)}</span>
                <span style={{ fontSize: '11px', color: 'var(--muted)' }}>{p.fecha}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ── HISTORIAL ──
function SeccionHistorial({ pedidos }) {
  const entregados = pedidos.filter(p => p.estado === 'Entregado')
  const total = entregados.reduce((acc, p) => acc + p.total, 0)

  return (
    <div className="dash-seccion">
      <h2 className="dash-titulo">Historial de compras</h2>

      <div className="stats-grid" style={{ marginBottom: '1.5rem' }}>
        <div className="stat-card stat-card--mint">
          <span className="stat-icono">📦</span>
          <p className="stat-valor">{entregados.length}</p>
          <p className="stat-label">Pedidos completados</p>
        </div>
        <div className="stat-card stat-card--peach">
          <span className="stat-icono">💰</span>
          <p className="stat-valor">{formatColones(total)}</p>
          <p className="stat-label">Total gastado</p>
        </div>
      </div>

      {entregados.length === 0 ? (
        <div className="sin-resultados">
          <p>📭 Todavía no tenés compras completadas.</p>
        </div>
      ) : (
        <div className="pedidos-lista">
          {entregados.map(p => (
            <div key={p.id} className="pedido-item">
              <div className="pedido-header">
                <span className="pedido-id">{p.id}</span>
                <span className={`estado-badge estado-badge--mint`}>
                  {p.estado}
                </span>
              </div>
              <p className="pedido-cliente">🏪 {p.emprendedor}</p>
              <p className="pedido-producto">📦 {p.producto}</p>
              <div className="pedido-footer">
                <span className="pedido-monto">{formatColones(p.total)}</span>
                <span style={{ fontSize: '11px', color: 'var(--muted)' }}>{p.fecha}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ── FAVORITOS ──
function SeccionFavoritos({ favoritos, onVerPerfil }) {
  return (
    <div className="dash-seccion">
      <h2 className="dash-titulo">Mis favoritos</h2>
      {favoritos.length === 0 ? (
        <div className="sin-resultados">
          <p>💔 Todavía no guardaste favoritos.</p>
        </div>
      ) : (
        <div className="emprendedores-lista">
          {favoritos.map(f => (
            <div key={f.id} className="perfil-card">
              <div className="perfil-avatar">{f.avatar}</div>
              <div className="perfil-info">
                <p className="perfil-nombre">{f.negocio}</p>
                <p className="perfil-negocio">{f.sector}</p>
                <div className="perfil-btns" style={{ marginTop: '8px' }}>
                  <button
                    className="btn-pedido"
                    onClick={() => onVerPerfil(f.id)}
                  >
                    Ver perfil
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ── DATOS ──
function SeccionDatos({ cliente, onGuardar }) {
  const [form, setForm]       = useState({ ...cliente })
  const [editando, setEditando] = useState(false)
  const [guardado, setGuardado] = useState(false)

  const handleGuardar = () => {
    onGuardar(form)
    setEditando(false)
    setGuardado(true)
    setTimeout(() => setGuardado(false), 2000)
  }

  return (
    <div className="dash-seccion">
      <h2 className="dash-titulo">Mis datos</h2>

      <div className="prod-form">
        <div className="campo">
          <label>Nombre completo</label>
          <input
            value={form.nombre}
            onChange={e => { setForm(p => ({ ...p, nombre: e.target.value })); setEditando(true) }}
            placeholder="Tu nombre"
          />
        </div>
        <div className="campo">
          <label>Correo electrónico</label>
          <input
            type="email"
            value={form.email}
            onChange={e => { setForm(p => ({ ...p, email: e.target.value })); setEditando(true) }}
            placeholder="tu@correo.com"
          />
        </div>
        <div className="campo">
          <label>Teléfono / WhatsApp</label>
          <input
            value={form.telefono}
            onChange={e => { setForm(p => ({ ...p, telefono: e.target.value })); setEditando(true) }}
            placeholder="8888-1234"
          />
        </div>

        {editando && (
          <button className="btn-primary" onClick={handleGuardar}>
            Guardar cambios
          </button>
        )}

        {guardado && (
          <div style={{ background: 'var(--mint)', borderRadius: '10px', padding: '10px 14px', fontSize: '13px', color: 'var(--mint-dark)', fontWeight: 700 }}>
            ✅ Datos actualizados correctamente
          </div>
        )}
      </div>
    </div>
  )
}

// ── PANEL PRINCIPAL ──
export default function PanelCliente({ cliente, onSalir, onVerPerfil }) {
  const [seccion, setSeccion]   = useState('pedidos')
  const [datosCliente, setDatosCliente] = useState(cliente)

  return (
    <div className="dash-layout">

      <aside className="dash-sidebar">
        <div className="dash-perfil">
          <div className="dash-avatar" style={{ background: 'var(--sky)', fontSize: '20px' }}>
            {cliente.nombre.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="dash-nombre">{datosCliente.nombre}</p>
            <p className="dash-negocio">{datosCliente.email}</p>
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
          {'← Salir'}
        </button>
      </aside>

      <main className="dash-main">
        {seccion === 'pedidos'   && <SeccionPedidos   pedidos={PEDIDOS_MOCK} />}
        {seccion === 'historial' && <SeccionHistorial  pedidos={PEDIDOS_MOCK} />}
        {seccion === 'favoritos' && <SeccionFavoritos  favoritos={FAVORITOS_MOCK} onVerPerfil={onVerPerfil} />}
        {seccion === 'datos'     && <SeccionDatos      cliente={datosCliente} onGuardar={setDatosCliente} />}
        {seccion === 'pagos'     && <SeccionPagos />}
      </main>

    </div>
  )
}