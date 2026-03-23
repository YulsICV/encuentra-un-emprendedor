// src/components/dashboard/DashCorreo.jsx
// Correo interno: el emprendedor recibe y responde mensajes del admin.
// Los mensajes se guardan en localStorage con clave 'correo_{email}'.

const STORAGE_KEY_PREFIX = 'correo_'

function cargarMensajes(email) {
  try {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}${email}`)
    return saved ? JSON.parse(saved) : mensajesDemo()
  } catch {
    return mensajesDemo()
  }
}

function mensajesDemo() {
  return [
    {
      id: 1,
      de: 'admin',
      deNombre: '⚙️ Administración',
      para: 'emprendedor',
      asunto: '¡Bienvenido/a a Encuentra un Emprendedor!',
      cuerpo: 'Hola, nos alegra tenerte en la plataforma. Si tenés alguna consulta sobre tu cuenta, membresía o publicaciones, no dudés en escribirnos aquí. ¡Mucho éxito!',
      fecha: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      leido: false,
    },
    {
      id: 2,
      de: 'admin',
      deNombre: '⚙️ Administración',
      para: 'emprendedor',
      asunto: 'Recordatorio: completá tu perfil',
      cuerpo: 'Notamos que tu perfil aún no tiene descripción completa. Un perfil completo genera hasta 3x más visitas. ¡Te animamos a completarlo!',
      fecha: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      leido: false,
    },
  ]
}

function guardarMensajes(email, mensajes) {
  try {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}${email}`, JSON.stringify(mensajes))
  } catch { /* ignorar */ }
}

function formatFecha(iso) {
  const d = new Date(iso)
  const ahora = new Date()
  const diff = ahora - d
  const mins  = Math.floor(diff / 60000)
  const horas = Math.floor(diff / 3600000)
  const dias  = Math.floor(diff / 86400000)
  if (mins  < 1)   return 'ahora'
  if (mins  < 60)  return `hace ${mins} min`
  if (horas < 24)  return `hace ${horas}h`
  if (dias  < 7)   return `hace ${dias} día${dias > 1 ? 's' : ''}`
  return d.toLocaleDateString('es-CR', { day: '2-digit', month: 'short' })
}

import { useState } from 'react'

export default function DashCorreo({ usuario }) {
  const email = usuario?.email || 'demo'
  const [mensajes,   setMensajes]   = useState(() => cargarMensajes(email))
  const [seleccionado, setSeleccionado] = useState(null)
  const [respuesta,  setRespuesta]  = useState('')
  const [enviando,   setEnviando]   = useState(false)
  const [exito,      setExito]      = useState(false)

  const noLeidos = mensajes.filter(m => !m.leido && m.de === 'admin').length

  const abrir = (msg) => {
    // Marcar como leído
    const actualizados = mensajes.map(m =>
      m.id === msg.id ? { ...m, leido: true } : m
    )
    setMensajes(actualizados)
    guardarMensajes(email, actualizados)
    setSeleccionado({ ...msg, leido: true })
    setRespuesta('')
    setExito(false)
  }

  const enviarRespuesta = () => {
    if (!respuesta.trim()) return
    setEnviando(true)

    setTimeout(() => {
      const nuevo = {
        id: Date.now(),
        de: 'emprendedor',
        deNombre: usuario?.nombre || 'Emprendedor/a',
        para: 'admin',
        asunto: `Re: ${seleccionado.asunto}`,
        cuerpo: respuesta.trim(),
        fecha: new Date().toISOString(),
        leido: true,
        esRespuesta: true,
        enRespuestaA: seleccionado.id,
      }
      const actualizados = [...mensajes, nuevo]
      setMensajes(actualizados)
      guardarMensajes(email, actualizados)
      setRespuesta('')
      setEnviando(false)
      setExito(true)
      // Actualizar el seleccionado para que se vea el hilo
      setSeleccionado(prev => ({ ...prev, _hiloActualizado: Date.now() }))
    }, 600)
  }

  const volver = () => {
    setSeleccionado(null)
    setRespuesta('')
    setExito(false)
  }

  // ── VISTA DETALLE ──
  if (seleccionado) {
    const hilo = mensajes.filter(m =>
      m.id === seleccionado.id ||
      m.enRespuestaA === seleccionado.id ||
      m.id === seleccionado.enRespuestaA
    ).sort((a, b) => new Date(a.fecha) - new Date(b.fecha))

    return (
      <div className="dash-seccion">
        <button className="correo-volver" onClick={volver}>← Volver a bandeja</button>

        <div className="correo-detalle">
          <h3 className="correo-asunto-titulo">{seleccionado.asunto}</h3>

          {/* Hilo de mensajes */}
          <div className="correo-hilo">
            {hilo.map(msg => (
              <div
                key={msg.id}
                className={`correo-burbuja ${msg.de === 'emprendedor' ? 'correo-burbuja--mia' : 'correo-burbuja--admin'}`}
              >
                <div className="correo-burbuja-meta">
                  <span className="correo-burbuja-de">{msg.deNombre || (msg.de === 'admin' ? '⚙️ Administración' : usuario?.nombre || 'Vos')}</span>
                  <span className="correo-burbuja-fecha">{formatFecha(msg.fecha)}</span>
                </div>
                <p className="correo-burbuja-cuerpo">{msg.cuerpo}</p>
              </div>
            ))}
          </div>

          {/* Caja de respuesta */}
          {exito && (
            <div className="perfil-guardado" style={{ marginBottom: '1rem' }}>
              ✅ Respuesta enviada a administración
            </div>
          )}

          <div className="correo-respuesta-wrap">
            <label className="tags-label" style={{ marginBottom: '.5rem' }}>Responder</label>
            <textarea
              className="correo-respuesta-input"
              rows={4}
              value={respuesta}
              onChange={e => setRespuesta(e.target.value)}
              placeholder="Escribí tu respuesta aquí..."
              disabled={enviando}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '.75rem' }}>
              <button
                className="btn-primary"
                onClick={enviarRespuesta}
                disabled={!respuesta.trim() || enviando}
                style={{ minWidth: '120px' }}
              >
                {enviando ? 'Enviando...' : '📤 Enviar'}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ── VISTA BANDEJA ──
  return (
    <div className="dash-seccion">
      <div className="perfil-header">
        <h2 className="dash-titulo">
          ✉️ Correo interno
          {noLeidos > 0 && (
            <span className="correo-badge-no-leidos">{noLeidos}</span>
          )}
        </h2>
      </div>

      <p className="dash-desc">
        Acá recibís mensajes de la administración de la plataforma. Podés responderlos directamente.
      </p>

      {mensajes.length === 0 ? (
        <div className="tags-vacio">
          <span>📭</span>
          <p>Tu bandeja está vacía.</p>
        </div>
      ) : (
        <div className="correo-lista">
          {[...mensajes]
            .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
            .map(msg => (
              <button
                key={msg.id}
                className={`correo-item ${!msg.leido && msg.de === 'admin' ? 'correo-item--noleido' : ''}`}
                onClick={() => abrir(msg)}
              >
                <div className="correo-item-top">
                  <span className="correo-item-de">
                    {msg.de === 'admin' ? '⚙️ Administración' : `↩️ Tu respuesta`}
                  </span>
                  <span className="correo-item-fecha">{formatFecha(msg.fecha)}</span>
                </div>
                <p className="correo-item-asunto">
                  {!msg.leido && msg.de === 'admin' && (
                    <span className="correo-punto-noleido" />
                  )}
                  {msg.asunto}
                </p>
                <p className="correo-item-preview">{msg.cuerpo}</p>
              </button>
            ))}
        </div>
      )}
    </div>
  )
}