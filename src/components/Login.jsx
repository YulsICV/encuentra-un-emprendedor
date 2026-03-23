import { useState } from 'react'

const USUARIOS_EMPRENDEDORES = [
  {
    id: 1,
    nombre: 'Lucía Ramírez',
    negocio: 'Dulces de Lucía',
    email: 'lucia@correo.com',
    password: '12345678',
    avatar: '👩‍🍳',
    tipo: 'emprendedor',
  },
  {
    id: 2,
    nombre: 'Marcos Solano',
    negocio: 'TecnoSolano',
    email: 'marcos@correo.com',
    password: '12345678',
    avatar: '🧑‍🔧',
    tipo: 'emprendedor',
  },
]

const USUARIOS_CLIENTES = [
  {
    id: 101,
    nombre: 'Ana Mora',
    email: 'ana@correo.com',
    telefono: '8888-0001',
    password: '12345678',
    tipo: 'cliente',
  },
  {
    id: 102,
    nombre: 'Carlos Vega',
    email: 'carlos@correo.com',
    telefono: '8888-0002',
    password: '12345678',
    tipo: 'cliente',
  },
]

const USUARIOS_ADMIN = [
  {
    id: 'admin-1',
    nombre: 'Yuliana Cruz',
    email: 'admin@encuentraemprendedor.cr',
    password: 'Admin2026!',
    tipo: 'admin',
    rol: 'superadmin',
    avatar: '👑',
  },
  {
    id: 'admin-2',
    nombre: 'Asistente',
    email: 'asistente@encuentraemprendedor.cr',
    password: 'Asist2026!',
    tipo: 'admin',
    rol: 'asistente',
    avatar: '🛠️',
  },
]

const TABS_LOGIN = [
  { id: 'cliente', label: '👤 Soy cliente' },
  { id: 'emprendedor', label: '🌱 Soy emprendedor' },
  { id: 'admin', label: '⚙️ Administrador' },
]

const SUBTITULOS = {
  cliente: 'Entrá para ver tus pedidos y favoritos',
  emprendedor: 'Entrá a tu panel de negocio',
  admin: 'Acceso restringido — solo personal autorizado',
}

export default function Login({ onEntrar, onVolver, onRegistro }) {
  const [tab, setTab] = useState('cliente')
  const [form, setForm] = useState({ email: '', password: '' })
  const [errores, setErrores] = useState({})
  const [intento, setIntento] = useState(false)

  const handleLogin = () => {
    const e = {}
    if (!form.email.includes('@')) e.email = 'Ingresá un correo válido'
    if (form.password.length < 6) e.password = 'Mínimo 6 caracteres'

    if (Object.keys(e).length > 0) { setErrores(e); return }

    const listas = {
      cliente: USUARIOS_CLIENTES,
      emprendedor: USUARIOS_EMPRENDEDORES,
      admin: USUARIOS_ADMIN,
    }

    const usuario = listas[tab].find(
      u => u.email === form.email && u.password === form.password
    )

    if (usuario) {
      setErrores({})
      onEntrar(usuario)
    } else {
      setIntento(true)
      setErrores({ general: 'Correo o contraseña incorrectos' })
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleLogin()
  }

  const cambiarTab = (nuevoTab) => {
    setTab(nuevoTab)
    setForm({ email: '', password: '' })
    setErrores({})
    setIntento(false)
  }

  return (
    <div className="login-wrap">
      <div className={`login-card ${intento ? 'login-card--error' : ''}`}>

        <div className="login-logo">
          <img src="/logo.png" alt="Logo" className="logo-img" />
        </div>

        <h2 className="login-titulo">Bienvenido/a de vuelta</h2>

        {/* Tabs — generadas desde el array */}
        <div className="login-tabs">
          {TABS_LOGIN.map(t => (
            <button
              key={t.id}
              className={`login-tab ${tab === t.id ? 'login-tab--activo' : ''}`}
              onClick={() => cambiarTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>

        <p className="login-subtitulo">{SUBTITULOS[tab]}</p>

        {errores.general && (
          <div className="login-error-box">
            ⚠️ {errores.general}
          </div>
        )}

        {/* Tab admin — aviso visual */}
        {tab === 'admin' && (
          <div style={{ background: '#fef3c7', border: '1px solid #f59e0b', borderRadius: '10px', padding: '10px 14px', fontSize: '12px', color: '#92400e', marginBottom: '1rem' }}>
            🔐 Este acceso es exclusivo para el equipo de <strong>Encuentra un Emprendedor</strong>. Si no sos parte del equipo, volvé al inicio.
          </div>
        )}

        <div className="campo">
          <label>Correo electrónico</label>
          <input
            type="email"
            placeholder="tu@correo.com"
            value={form.email}
            onChange={e => {
              setForm(p => ({ ...p, email: e.target.value }))
              setIntento(false)
              setErrores({})
            }}
            onKeyDown={handleKeyDown}
          />
          {errores.email && <span className="campo-error">{errores.email}</span>}
        </div>

        <div className="campo">
          <label>Contraseña</label>
          <input
            type="password"
            placeholder="Tu contraseña"
            value={form.password}
            onChange={e => {
              setForm(p => ({ ...p, password: e.target.value }))
              setIntento(false)
              setErrores({})
            }}
            onKeyDown={handleKeyDown}
          />
          {errores.password && <span className="campo-error">{errores.password}</span>}
        </div>

        <button className="btn-primary" style={{ width: '100%' }} onClick={handleLogin}>
          Entrar
        </button>

        <div className="login-footer">
          {tab === 'cliente' && (
            <p>¿No tenés cuenta?{' '}
              <span className="login-link" onClick={onRegistro}>
                Registrá tu negocio
              </span>
            </p>
          )}
          <span className="login-link" style={{ color: 'var(--muted)' }} onClick={onVolver}>
            {'← Volver al inicio'}
          </span>
        </div>

        {/* Usuarios de prueba — solo para cliente y emprendedor */}
        {tab !== 'admin' && (
          <div className="login-hint">
            <p>🧪 Usuarios de prueba ({tab === 'cliente' ? 'clientes' : 'emprendedores'}):</p>
            {(tab === 'cliente' ? USUARIOS_CLIENTES : USUARIOS_EMPRENDEDORES).map(u => (
              <p
                key={u.id}
                className="login-hint-user"
                onClick={() => setForm({ email: u.email, password: u.password })}
              >
                {u.tipo === 'emprendedor' ? u.avatar : '👤'} {u.email} · {u.password}
              </p>
            ))}
          </div>
        )}

      </div>
    </div>
  )
}