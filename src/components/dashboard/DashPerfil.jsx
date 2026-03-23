// src/components/dashboard/DashPerfil.jsx
import { useState, useRef } from 'react'

const SECTORES = [
  'Comida & Bebidas', 'Belleza & Estética', 'Moda & Ropa',
  'Arte & Artesanías', 'Servicios del Hogar', 'Tecnología',
  'Salud & Bienestar', 'Educación', 'Mascotas', 'Fotografía', 'Otro'
]

const PROVINCIAS = [
  'San José', 'Alajuela', 'Cartago',
  'Heredia', 'Guanacaste', 'Puntarenas', 'Limón'
]

const AVATARES_EMOJI = [
  '👩‍🍳','🧑‍🔧','👩‍🎨','🧑‍💼','👩‍💻','🧑‍🌾',
  '👩‍🔬','🧑‍🎤','👩‍🏫','🧑‍🍳','🪡','🌱','🎨','🛠️','📸'
]

function validar(datos) {
  const e = {}
  if (!datos.nombre.trim())                 e.nombre      = 'Requerido'
  if (!datos.apellido.trim())               e.apellido    = 'Requerido'
  if (!datos.negocio.trim())                e.negocio     = 'Requerido'
  if (!datos.sector)                        e.sector      = 'Seleccioná un sector'
  if (!datos.provincia)                     e.provincia   = 'Seleccioná una provincia'
  if (datos.descripcion.trim().length < 20) e.descripcion = 'Mínimo 20 caracteres'
  return e
}

function cargarPerfil(usuario) {
  try {
    const saved = localStorage.getItem(`perfil_${usuario?.email || 'demo'}`)
    if (saved) return JSON.parse(saved)
  } catch { /* ignorar */ }
  return {
    nombre: usuario?.nombre || '', apellido: usuario?.apellido || '',
    email: usuario?.email || '', telefono: usuario?.telefono || '',
    negocio: usuario?.negocio || '', sector: usuario?.sector || '',
    provincia: usuario?.provincia || '', descripcion: usuario?.descripcion || '',
    instagram: usuario?.instagram || '', whatsapp: usuario?.whatsapp || '',
    facebook: usuario?.facebook || '', tiktok: usuario?.tiktok || '',
    web: usuario?.web || '', avatar: usuario?.avatar || '🌱',
    fotoUrl: null,   // foto real subida (base64)
    usarFoto: false, // true = mostrar foto, false = mostrar emoji
  }
}

export default function DashPerfil({ usuario }) {
  const [datos,    setDatos]    = useState(() => cargarPerfil(usuario))
  const [errores,  setErrores]  = useState({})
  const [editando, setEditando] = useState(false)
  const [guardado, setGuardado] = useState(false)
  const [tabAvatar, setTabAvatar] = useState(false)
  const fotoInputRef = useRef(null)

  const actualizar = (campo, valor) => {
    setDatos(prev => ({ ...prev, [campo]: valor }))
    if (errores[campo]) setErrores(prev => ({ ...prev, [campo]: null }))
  }

  // Manejar subida de foto
  const handleFoto = (e) => {
    const archivo = e.target.files[0]
    if (!archivo) return
    if (archivo.size > 3 * 1024 * 1024) {
      alert('La imagen no puede pesar más de 3 MB.')
      return
    }
    const reader = new FileReader()
    reader.onload = (ev) => {
      setDatos(prev => ({ ...prev, fotoUrl: ev.target.result, usarFoto: true }))
      setTabAvatar(false)
    }
    reader.readAsDataURL(archivo)
  }

  const quitarFoto = () => {
    setDatos(prev => ({ ...prev, fotoUrl: null, usarFoto: false }))
    if (fotoInputRef.current) fotoInputRef.current.value = ''
  }

  const guardar = () => {
    const e = validar(datos)
    if (Object.keys(e).length > 0) { setErrores(e); return }
    setErrores({})
    try {
      localStorage.setItem(`perfil_${usuario?.email || 'demo'}`, JSON.stringify(datos))
    } catch { /* ignorar */ }
    setEditando(false)
    setGuardado(true)
    setTimeout(() => setGuardado(false), 2500)
  }

  const cancelar = () => {
    setDatos(cargarPerfil(usuario))
    setErrores({})
    setEditando(false)
    setTabAvatar(false)
  }

  // Renderiza el avatar (foto o emoji)
  const AvatarVista = ({ size = 72, fontSize = '2.2rem' }) => (
    <div className="perfil-avatar" style={{ width: size, height: size, fontSize }}>
      {datos.usarFoto && datos.fotoUrl
        ? <img src={datos.fotoUrl} alt="Foto de perfil" className="perfil-foto-img" />
        : datos.avatar}
    </div>
  )

  // ── MODO VISTA ──
  if (!editando) return (
    <div className="dash-seccion">
      <div className="perfil-header">
        <h2 className="dash-titulo">Mi Perfil</h2>
        <button className="btn-primary" onClick={() => setEditando(true)}>✏️ Editar perfil</button>
      </div>

      {guardado && <div className="perfil-guardado">✅ Perfil actualizado correctamente</div>}

      <div className="perfil-card">
        <div className="perfil-avatar-zona">
          <AvatarVista />
          <div>
            <h3 className="perfil-nombre-grande">{datos.nombre} {datos.apellido}</h3>
            <p className="perfil-negocio-grande">{datos.negocio}</p>
            <div className="perfil-chips">
              {datos.sector    && <span className="perfil-chip perfil-chip--sector">{datos.sector}</span>}
              {datos.provincia && <span className="perfil-chip perfil-chip--provincia">📍 {datos.provincia}</span>}
            </div>
          </div>
        </div>
        {datos.descripcion && (
          <p className="perfil-descripcion">{datos.descripcion}</p>
        )}
      </div>

      <div className="perfil-grid">
        <div className="perfil-bloque">
          <h4 className="perfil-bloque-titulo">📋 Datos personales</h4>
          <FilaDato label="Nombre"   valor={`${datos.nombre} ${datos.apellido}`} />
          <FilaDato label="Correo"   valor={datos.email} />
          <FilaDato label="Teléfono" valor={datos.telefono} />
        </div>
        <div className="perfil-bloque">
          <h4 className="perfil-bloque-titulo">🔗 Redes sociales</h4>
          <FilaDato label="Instagram" valor={datos.instagram} vacio="No indicado" />
          <FilaDato label="WhatsApp"  valor={datos.whatsapp}  vacio="No indicado" />
          <FilaDato label="Facebook"  valor={datos.facebook}  vacio="No indicado" />
          <FilaDato label="TikTok"    valor={datos.tiktok}    vacio="No indicado" />
          <FilaDato label="Sitio web" valor={datos.web}       vacio="No indicado" />
        </div>
      </div>
    </div>
  )

  // ── MODO EDICIÓN ──
  return (
    <div className="dash-seccion">
      <div className="perfil-header">
        <h2 className="dash-titulo">Editando perfil</h2>
        <div className="btn-row">
          <button className="btn-secondary" onClick={cancelar}>Cancelar</button>
          <button className="btn-primary"   onClick={guardar}>Guardar cambios</button>
        </div>
      </div>

      {/* ── Selector de avatar / foto ── */}
      <div className="perfil-bloque" style={{ marginBottom: '1.5rem' }}>
        <h4 className="perfil-bloque-titulo">🖼️ Foto de perfil</h4>

        <div className="perfil-avatar-edit-row">
          {/* Preview actual */}
          <div className="perfil-avatar perfil-avatar--grande">
            {datos.usarFoto && datos.fotoUrl
              ? <img src={datos.fotoUrl} alt="Foto" className="perfil-foto-img" />
              : <span style={{ fontSize: '2.4rem' }}>{datos.avatar}</span>}
          </div>

          <div className="perfil-avatar-opciones">
            {/* Subir foto */}
            <button
              className="btn-primary"
              style={{ fontSize: '13px' }}
              onClick={() => fotoInputRef.current?.click()}
            >
              📷 Subir foto
            </button>
            <input
              ref={fotoInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              style={{ display: 'none' }}
              onChange={handleFoto}
            />

            {/* Quitar foto */}
            {datos.usarFoto && datos.fotoUrl && (
              <button className="btn-secondary" style={{ fontSize: '13px' }} onClick={quitarFoto}>
                🗑️ Quitar foto
              </button>
            )}

            {/* Toggle emoji */}
            <button
              className="btn-secondary"
              style={{ fontSize: '13px' }}
              onClick={() => { setTabAvatar(v => !v); }}
            >
              😀 Usar emoji
            </button>

            <p className="tags-hint" style={{ margin: 0 }}>
              JPG, PNG o WebP · máx. 3 MB
            </p>
          </div>
        </div>

        {/* Grid de emojis */}
        {tabAvatar && (
          <div className="perfil-avatares" style={{ marginTop: '1rem' }}>
            {AVATARES_EMOJI.map(a => (
              <button
                key={a}
                className={`perfil-avatar-op ${!datos.usarFoto && datos.avatar === a ? 'perfil-avatar-op--activo' : ''}`}
                onClick={() => {
                  actualizar('avatar', a)
                  actualizar('usarFoto', false)
                  setTabAvatar(false)
                }}
              >
                {a}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Datos personales */}
      <div className="perfil-bloque">
        <h4 className="perfil-bloque-titulo">📋 Datos personales</h4>
        <div className="row2">
          <Campo label="Nombre" error={errores.nombre}>
            <input value={datos.nombre} onChange={e => actualizar('nombre', e.target.value)} placeholder="Tu nombre" />
          </Campo>
          <Campo label="Apellido" error={errores.apellido}>
            <input value={datos.apellido} onChange={e => actualizar('apellido', e.target.value)} placeholder="Tu apellido" />
          </Campo>
        </div>
        <Campo label="Correo electrónico">
          <input value={datos.email} disabled style={{ opacity: .6, cursor: 'not-allowed' }} />
        </Campo>
        <Campo label="Teléfono / WhatsApp">
          <input value={datos.telefono} onChange={e => actualizar('telefono', e.target.value)} placeholder="8888-1234" />
        </Campo>
      </div>

      {/* Datos del negocio */}
      <div className="perfil-bloque">
        <h4 className="perfil-bloque-titulo">🏪 Datos del negocio</h4>
        <Campo label="Nombre del negocio" error={errores.negocio}>
          <input value={datos.negocio} onChange={e => actualizar('negocio', e.target.value)} placeholder="ej. Dulces de Lucía" />
        </Campo>
        <div className="row2">
          <Campo label="Sector" error={errores.sector}>
            <select value={datos.sector} onChange={e => actualizar('sector', e.target.value)}>
              <option value="">Seleccioná</option>
              {SECTORES.map(s => <option key={s}>{s}</option>)}
            </select>
          </Campo>
          <Campo label="Provincia" error={errores.provincia}>
            <select value={datos.provincia} onChange={e => actualizar('provincia', e.target.value)}>
              <option value="">Seleccioná</option>
              {PROVINCIAS.map(p => <option key={p}>{p}</option>)}
            </select>
          </Campo>
        </div>
        <Campo label="Descripción" error={errores.descripcion} hint={`${datos.descripcion.length} caracteres`}>
          <textarea
            value={datos.descripcion}
            onChange={e => actualizar('descripcion', e.target.value)}
            placeholder="Describí qué ofrecés, tu especialidad y qué te diferencia..."
            rows={4}
          />
        </Campo>
      </div>

      {/* Redes sociales */}
      <div className="perfil-bloque">
        <h4 className="perfil-bloque-titulo">🔗 Redes sociales</h4>
        <div className="row2">
          <Campo label="Instagram">
            <input value={datos.instagram} onChange={e => actualizar('instagram', e.target.value)} placeholder="@usuario" />
          </Campo>
          <Campo label="WhatsApp">
            <input value={datos.whatsapp} onChange={e => actualizar('whatsapp', e.target.value)} placeholder="8888-1234" />
          </Campo>
          <Campo label="Facebook">
            <input value={datos.facebook} onChange={e => actualizar('facebook', e.target.value)} placeholder="/tupagina" />
          </Campo>
          <Campo label="TikTok">
            <input value={datos.tiktok} onChange={e => actualizar('tiktok', e.target.value)} placeholder="@usuario" />
          </Campo>
        </div>
        <Campo label="Sitio web">
          <input value={datos.web} onChange={e => actualizar('web', e.target.value)} placeholder="https://tu-tienda.com" />
        </Campo>
      </div>

      <div className="btn-row" style={{ marginTop: '1rem' }}>
        <button className="btn-secondary" onClick={cancelar}>Cancelar</button>
        <button className="btn-primary"   onClick={guardar}>Guardar cambios</button>
      </div>
    </div>
  )
}

function FilaDato({ label, valor, vacio = '' }) {
  return (
    <div className="perfil-fila">
      <span className="perfil-fila-label">{label}</span>
      <span className={`perfil-fila-valor ${!valor ? 'perfil-fila-valor--vacio' : ''}`}>
        {valor || vacio || '—'}
      </span>
    </div>
  )
}

function Campo({ label, error, hint, children }) {
  return (
    <div className="campo">
      <label>{label}</label>
      {children}
      {hint  && !error && <span className="campo-hint">{hint}</span>}
      {error && <span className="campo-error">{error}</span>}
    </div>
  )
}