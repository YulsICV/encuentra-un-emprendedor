
import { useState } from 'react'

export default function RegistroCliente({ onRegistrado, onYaTengo, onCancelar }) {
  const [form, setForm]       = useState({ nombre: '', email: '', telefono: '' })
  const [errores, setErrores] = useState({})

  const validar = () => {
    const e = {}
    if (!form.nombre.trim())        e.nombre    = 'Tu nombre es requerido'
    if (!form.email.includes('@'))  e.email     = 'Ingresá un correo válido'
    if (!form.telefono.trim())      e.telefono  = 'Tu teléfono es requerido'
    return e
  }

  const handleRegistrar = () => {
    const e = validar()
    if (Object.keys(e).length > 0) { setErrores(e); return }
    onRegistrado({
      nombre:   form.nombre,
      email:    form.email,
      telefono: form.telefono,
      tipo:     'cliente',
    })
  }

  return (
    <div className="modal-overlay">
      <div className="modal-card">

        <div className="modal-header">
          <h3>Creá tu cuenta rápida</h3>
          <p>Solo tarda 30 segundos y podés hacer pedidos seguros 🛒</p>
        </div>

        <div className="campo">
          <label>Nombre completo</label>
          <input
            value={form.nombre}
            onChange={e => { setForm(p => ({ ...p, nombre: e.target.value })); setErrores({}) }}
            placeholder="ej. Ana Mora"
          />
          {errores.nombre && <span className="campo-error">{errores.nombre}</span>}
        </div>

        <div className="campo">
          <label>Correo electrónico</label>
          <input
            type="email"
            value={form.email}
            onChange={e => { setForm(p => ({ ...p, email: e.target.value })); setErrores({}) }}
            placeholder="tu@correo.com"
          />
          {errores.email && <span className="campo-error">{errores.email}</span>}
        </div>

        <div className="campo">
          <label>Teléfono / WhatsApp</label>
          <input
            value={form.telefono}
            onChange={e => { setForm(p => ({ ...p, telefono: e.target.value })); setErrores({}) }}
            placeholder="ej. 8888-1234"
          />
          {errores.telefono && <span className="campo-error">{errores.telefono}</span>}
        </div>

        <button className="btn-primary" style={{ width: '100%' }} onClick={handleRegistrar}>
          Crear cuenta y continuar →
        </button>

        <div className="modal-footer">
          <span className="login-link" onClick={onYaTengo}>
            Ya tengo cuenta
          </span>
          <span className="login-link" style={{ color: 'var(--muted)' }} onClick={onCancelar}>
            Cancelar
          </span>
        </div>

      </div>
    </div>
  )
}