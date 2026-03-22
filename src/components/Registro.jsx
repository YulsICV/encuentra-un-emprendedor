// src/components/Registro.jsx
import { useState } from 'react'

const SECTORES = [
  'Comida & Bebidas', 'Belleza & Estética', 'Moda & Ropa',
  'Arte & Artesanías', 'Servicios del Hogar', 'Tecnología',
  'Salud & Bienestar', 'Educación', 'Mascotas', 'Fotografía', 'Otro'
]

const PROVINCIAS = [
  'San José', 'Alajuela', 'Cartago',
  'Heredia', 'Guanacaste', 'Puntarenas', 'Limón'
]

const TAGS = [
  'Entrega a domicilio', 'Pedido express', 'Sin gluten',
  'Personalizado', 'Online', 'Garantía', 'Ecológico', 'Hecho a mano'
]

// Estado inicial del formulario
const estadoInicial = {
  nombre: '', apellido: '', email: '', telefono: '',
  password: '', password2: '',
  negocio: '', sector: '', provincia: '', descripcion: '',
  tags: [],
  instagram: '', whatsapp: '', facebook: '', tiktok: '', web: ''
}

// Validaciones por paso
function validarPaso(paso, datos) {
  const errores = {}

  if (paso === 1) {
    if (!datos.nombre.trim())       errores.nombre    = 'El nombre es requerido'
    if (!datos.apellido.trim())     errores.apellido  = 'El apellido es requerido'
    if (!datos.email.includes('@')) errores.email     = 'Ingresá un correo válido'
    if (!datos.telefono.trim())     errores.telefono  = 'El teléfono es requerido'
    if (datos.password.length < 8)  errores.password  = 'Mínimo 8 caracteres'
    if (datos.password !== datos.password2) errores.password2 = 'Las contraseñas no coinciden'
  }

  if (paso === 2) {
    if (!datos.negocio.trim())              errores.negocio     = 'El nombre del negocio es requerido'
    if (!datos.sector)                      errores.sector      = 'Seleccioná un sector'
    if (!datos.provincia)                   errores.provincia   = 'Seleccioná una provincia'
    if (datos.descripcion.trim().length < 50) errores.descripcion = 'Mínimo 50 caracteres'
  }

  return errores
}

export default function Registro({ onVolver }) {
  const [paso, setPaso]       = useState(1)
  const [datos, setDatos]     = useState(estadoInicial)
  const [errores, setErrores] = useState({})
  const [listo, setListo]     = useState(false)

  // Actualizar un campo
  const actualizar = (campo, valor) => {
    setDatos(prev => ({ ...prev, [campo]: valor }))
    // Limpiar error del campo al escribir
    if (errores[campo]) setErrores(prev => ({ ...prev, [campo]: null }))
  }

  // Toggle de tags
  const toggleTag = (tag) => {
    setDatos(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }))
  }

  // Avanzar paso con validación
  const siguiente = () => {
    const erroresNuevos = validarPaso(paso, datos)
    if (Object.keys(erroresNuevos).length > 0) {
      setErrores(erroresNuevos)
      return
    }
    setErrores({})
    setPaso(p => p + 1)
  }

  const anterior = () => setPaso(p => p - 1)

  const confirmar = () => setListo(true)

  if (listo) return <Exito nombre={datos.nombre} negocio={datos.negocio} onVolver={onVolver} />

  return (
    <section className="registro">

      {/* Header */}
      <div className="registro-header">
        <button className="btn-volver" onClick={onVolver}>← Volver</button>
        <h2>Registrá tu negocio</h2>
        <p>Paso {paso} de 3</p>
      </div>

      {/* Barra de progreso */}
      <div className="progreso-barra">
        <div className="progreso-fill" style={{ width: `${(paso / 3) * 100}%` }} />
      </div>

      {/* Pasos */}
      {paso === 1 && <PasoUno datos={datos} errores={errores} onChange={actualizar} />}
      {paso === 2 && <PasoDos datos={datos} errores={errores} onChange={actualizar} onToggleTag={toggleTag} />}
      {paso === 3 && <PasoTres datos={datos} onChange={actualizar} />}

      {/* Botones */}
      <div className="registro-btns">
        {paso > 1 && (
          <button className="btn-secondary" onClick={anterior}>← Atrás</button>
        )}
        {paso < 3
          ? <button className="btn-primary" onClick={siguiente}>Continuar →</button>
          : <button className="btn-primary" onClick={confirmar}>¡Publicar mi negocio! 🎉</button>
        }
      </div>

    </section>
  )
}
// ── PASO 1: Datos personales ──
function PasoUno({ datos, errores, onChange }) {
  return (
    <div className="paso-form">
      <h3>Tus datos personales</h3>

      <div className="row2">
        <Campo label="Nombre" error={errores.nombre}>
          <input value={datos.nombre} onChange={e => onChange('nombre', e.target.value)} placeholder="ej. Lucía" />
        </Campo>
        <Campo label="Apellido" error={errores.apellido}>
          <input value={datos.apellido} onChange={e => onChange('apellido', e.target.value)} placeholder="ej. Ramírez" />
        </Campo>
      </div>

      <Campo label="Correo electrónico" error={errores.email}>
        <input type="email" value={datos.email} onChange={e => onChange('email', e.target.value)} placeholder="tu@correo.com" />
      </Campo>

      <Campo label="Teléfono / WhatsApp" error={errores.telefono} hint="Los clientes podrán contactarte por aquí">
        <input value={datos.telefono} onChange={e => onChange('telefono', e.target.value)} placeholder="ej. 8888-1234" />
      </Campo>

      <div className="row2">
        <Campo label="Contraseña" error={errores.password}>
          <input type="password" value={datos.password} onChange={e => onChange('password', e.target.value)} placeholder="Mínimo 8 caracteres" />
        </Campo>
        <Campo label="Confirmar contraseña" error={errores.password2}>
          <input type="password" value={datos.password2} onChange={e => onChange('password2', e.target.value)} placeholder="Repetí la contraseña" />
        </Campo>
      </div>
    </div>
  )
}

// ── PASO 2: Datos del negocio ──
function PasoDos({ datos, errores, onChange, onToggleTag }) {
  return (
    <div className="paso-form">
      <h3>Tu negocio</h3>

      <Campo label="Nombre del negocio" error={errores.negocio}>
        <input value={datos.negocio} onChange={e => onChange('negocio', e.target.value)} placeholder="ej. Dulces de Lucía" />
      </Campo>

      <div className="row2">
        <Campo label="Sector" error={errores.sector}>
          <select value={datos.sector} onChange={e => onChange('sector', e.target.value)}>
            <option value="">Seleccioná</option>
            {SECTORES.map(s => <option key={s}>{s}</option>)}
          </select>
        </Campo>
        <Campo label="Provincia" error={errores.provincia}>
          <select value={datos.provincia} onChange={e => onChange('provincia', e.target.value)}>
            <option value="">Seleccioná</option>
            {PROVINCIAS.map(p => <option key={p}>{p}</option>)}
          </select>
        </Campo>
      </div>

      <Campo label="Descripción" error={errores.descripcion} hint={`${datos.descripcion.length} / 50 mínimo`}>
        <textarea value={datos.descripcion} onChange={e => onChange('descripcion', e.target.value)} placeholder="Describí qué ofrecés, tu especialidad y qué te diferencia..." />
      </Campo>

      <div className="campo">
        <label>Etiquetas</label>
        <div className="tags-select">
          {TAGS.map(tag => (
            <span
              key={tag}
              className={`tag-option ${datos.tags.includes(tag) ? 'tag-option--activo' : ''}`}
              onClick={() => onToggleTag(tag)}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── PASO 3: Redes sociales ──
function PasoTres({ datos, onChange }) {
  return (
    <div className="paso-form">
      <h3>Redes sociales y contacto</h3>
      <p className="paso-hint">Todo es opcional — completá solo lo que tenés activo</p>

      <Campo label="Instagram">
        <input value={datos.instagram} onChange={e => onChange('instagram', e.target.value)} placeholder="@tu_usuario" />
      </Campo>
      <Campo label="WhatsApp">
        <input value={datos.whatsapp} onChange={e => onChange('whatsapp', e.target.value)} placeholder="8888-1234" />
      </Campo>
      <Campo label="Facebook">
        <input value={datos.facebook} onChange={e => onChange('facebook', e.target.value)} placeholder="/tupagina" />
      </Campo>
      <Campo label="TikTok">
        <input value={datos.tiktok} onChange={e => onChange('tiktok', e.target.value)} placeholder="@tu_usuario" />
      </Campo>
      <Campo label="Sitio web">
        <input value={datos.web} onChange={e => onChange('web', e.target.value)} placeholder="https://tu-tienda.com" />
      </Campo>
    </div>
  )
}

// ── COMPONENTE REUTILIZABLE: Campo con error ──
function Campo({ label, error, hint, children }) {
  return (
    <div className="campo">
      <label>{label}</label>
      {children}
      {hint && !error && <span className="campo-hint">{hint}</span>}
      {error && <span className="campo-error">{error}</span>}
    </div>
  )
}

// ── PANTALLA DE ÉXITO ──
function Exito({ nombre, negocio, onVolver }) {
  return (
    <div className="registro-exito">
      <div className="exito-icono">🎉</div>
      <h2>¡Bienvenido/a, {nombre}!</h2>
      <p><strong>{negocio}</strong> ya está publicado en la plataforma.</p>
      <div className="exito-chips">
        <span className="chip">✅ Perfil publicado</span>
        <span className="chip">📦 Publicar productos</span>
        <span className="chip">🔥 Crear oferta del día</span>
      </div>
      <button className="btn-primary" onClick={onVolver}>Ir a la plataforma →</button>
    </div>
  )
}