import { useState } from 'react'

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
  { id: 'pedidos',   icono: '📦', label: 'Mis pedidos' },
  { id: 'historial', icono: '📋', label: 'Historial'   },
  { id: 'favoritos', icono: '❤️', label: 'Favoritos'   },
  { id: 'datos',     icono: '👤', label: 'Mis datos'   },
]

// ── DETALLE PEDIDO ──
function DetallePedido({ pedido, onCerrar }) {
  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <div className="modal-header">
          <h3>Detalle del pedido</h3>
          <p>{pedido.id} · {pedido.fecha}</p>
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <span className={`estado-badge estado-badge--${COLORES_ESTADO[pedido.estado]}`}>
            {pedido.estado}
          </span>
        </div>

        <div style={{ background: 'var(--cream)', borderRadius: '10px', padding: '10px 14px', marginBottom: '1rem' }}>
          <p style={{ fontSize: '12px', color: 'var(--muted)', marginBottom: '2px' }}>Negocio</p>
          <p style={{ fontSize: '14px', fontWeight: 800 }}>🌱 {pedido.emprendedor}</p>
        </div>

        {pedido.items && pedido.items.length > 0 && (
          <div style={{ marginBottom: '1rem' }}>
            <p style={{ fontSize: '12px', fontWeight: 800, color: 'var(--muted)', marginBottom: '8px' }}>
              Productos
            </p>
            {pedido.items.map((item, i) => (
              <div key={i} className="carrito-item" style={{ padding: '6px 0' }}>
                <span style={{ fontSize: '13px' }}>{item.emoji} {item.nombre}</span>
                <div className="carrito-item-derecha">
                  <span className="carrito-cantidad">x{item.cantidad}</span>
                  <span className="carrito-precio">{formatColones(item.subtotal)}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        <div style={{ background: 'var(--cream)', borderRadius: '10px', padding: '10px 14px', marginBottom: '1rem' }}>
          <p style={{ fontSize: '12px', color: 'var(--muted)', marginBottom: '2px' }}>Entrega</p>
          <p style={{ fontSize: '13px', fontWeight: 700 }}>
            {pedido.entrega === 'domicilio' ? '🚚 A domicilio' : '🏪 Retiro en local'}
          </p>
          {pedido.direccion && (
            <p style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '2px' }}>{pedido.direccion}</p>
          )}
        </div>

        {pedido.nota && (
          <div style={{ background: 'var(--cream)', borderRadius: '10px', padding: '10px 14px', marginBottom: '1rem' }}>
            <p style={{ fontSize: '12px', color: 'var(--muted)', marginBottom: '2px' }}>Nota</p>
            <p style={{ fontSize: '13px' }}>{pedido.nota}</p>
          </div>
        )}

        <div className="pedido-total">
          <span>Total</span>
          <strong>{formatColones(pedido.total)}</strong>
        </div>

        <button className="btn-primary" style={{ width: '100%', marginTop: '1rem' }} onClick={onCerrar}>
          Cerrar
        </button>
      </div>
    </div>
  )
}

// ── PEDIDOS ACTIVOS ──
function SeccionPedidos({ pedidos }) {
  const [pedidoDetalle, setPedidoDetalle] = useState(null)
  const activos = pedidos.filter(p => p.estado !== 'Entregado')

  return (
    <div className="dash-seccion">
      <h2 className="dash-titulo">Mis pedidos activos</h2>

      {pedidoDetalle && (
        <DetallePedido pedido={pedidoDetalle} onCerrar={() => setPedidoDetalle(null)} />
      )}

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
              <p className="pedido-cliente">🌱 {p.emprendedor}</p>
              <p className="pedido-producto">📦 {p.producto}</p>
              <div className="pedido-footer">
                <span className="pedido-monto">{formatColones(p.total)}</span>
                <button
                  className="btn-ver"
                  style={{ fontSize: '11px', padding: '4px 12px' }}
                  onClick={() => setPedidoDetalle(p)}
                >
                  Ver detalle
                </button>
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
  const [pedidoDetalle, setPedidoDetalle] = useState(null)
  const entregados = pedidos.filter(p => p.estado === 'Entregado')
  const total      = entregados.reduce((acc, p) => acc + p.total, 0)

  return (
    <div className="dash-seccion">
      <h2 className="dash-titulo">Historial de compras</h2>

      {pedidoDetalle && (
        <DetallePedido pedido={pedidoDetalle} onCerrar={() => setPedidoDetalle(null)} />
      )}

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
                <span className="estado-badge estado-badge--mint">{p.estado}</span>
              </div>
              <p className="pedido-cliente">🌱 {p.emprendedor}</p>
              <p className="pedido-producto">📦 {p.producto}</p>
              <div className="pedido-footer">
                <span className="pedido-monto">{formatColones(p.total)}</span>
                <button
                  className="btn-ver"
                  style={{ fontSize: '11px', padding: '4px 12px' }}
                  onClick={() => setPedidoDetalle(p)}
                >
                  Ver detalle
                </button>
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
                  <button className="btn-pedido" onClick={() => onVerPerfil(f.id)}>
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
  const [form, setForm]         = useState({ ...cliente })
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
export default function PanelCliente({ cliente, pedidos = [], onSalir, onVerPerfil }) {
  const [seccion, setSeccion]           = useState('pedidos')
  const [datosCliente, setDatosCliente] = useState(cliente)
  const [confirmarSalir, setConfirmarSalir] = useState(false) // ← nuevo

  return (
    <div className="dash-layout">

      {/* Modal confirmar cierre de sesión */}
      {confirmarSalir && (
        <div className="modal-overlay">
          <div className="modal-card" style={{ textAlign: 'center', maxWidth: '340px' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>👋</div>
            <h3 style={{ fontFamily: 'Playfair Display, serif', marginBottom: '.5rem' }}>
              ¿Cerrás sesión?
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '1.5rem' }}>
              Tu historial de pedidos se guardará cuando volvás a entrar.
            </p>
            <div className="btn-row">
              <button
                className="btn-secondary"
                onClick={() => setConfirmarSalir(false)}
              >
                Cancelar
              </button>
              <button
                className="btn-primary"
                onClick={onSalir}
                style={{ flex: 2 }}
              >
                Sí, cerrar sesión
              </button>
            </div>
          </div>
        </div>
      )}

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

        {/* ← Ahora abre el modal en vez de confirmar con window.confirm */}
        <button className="dash-salir" onClick={() => setConfirmarSalir(true)}>
          {'← Cerrar sesión'}
        </button>
      </aside>

      <main className="dash-main">
        {seccion === 'pedidos'   && <SeccionPedidos   pedidos={pedidos} />}
        {seccion === 'historial' && <SeccionHistorial  pedidos={pedidos} />}
        {seccion === 'favoritos' && <SeccionFavoritos  favoritos={FAVORITOS_MOCK} onVerPerfil={onVerPerfil} />}
        {seccion === 'datos'     && <SeccionDatos      cliente={datosCliente} onGuardar={setDatosCliente} />}
      </main>

    </div>
  )
}