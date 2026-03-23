// src/components/dashboard/DashTags.jsx
import { useState, useRef } from 'react'

const SUGERIDOS = [
  'amigurumi', 'tejido a mano', 'crochet', 'macramé', 'bordado',
  'repostería', 'sin gluten', 'vegano', 'personalizado', 'express',
  'reparación', 'garantía', 'domicilio', 'delivery', 'mayoreo',
  'natural', 'orgánico', 'artesanal', 'hecho en CR', 'encargo',
  'bodas', 'cumpleaños', 'empresarial', 'regalo', 'minorista',
  'vintage', 'reciclado', 'sostenible', 'local', 'urgente',
]

const MAX_TAGS    = 10
const STORAGE_KEY = 'dash_tags'

// ✅ Leer localStorage en la función de inicialización del useState
// Esto evita llamar setState dentro de un useEffect
function cargarTagsIniciales() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

export default function DashTags() {
  // ✅ useState con función inicializadora — se ejecuta solo una vez, sin useEffect
  const [tags,     setTags]     = useState(cargarTagsIniciales)
  const [input,    setInput]    = useState('')
  const [error,    setError]    = useState('')
  const [guardado, setGuardado] = useState(false)
  const inputRef = useRef(null)

  const guardar = (nuevosTags) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nuevosTags))
    setGuardado(true)
    setTimeout(() => setGuardado(false), 2000)
  }

  const agregarTag = (texto) => {
    const limpio = texto.trim().toLowerCase().replace(/\s+/g, ' ')
    if (!limpio) return

    if (limpio.length < 2) {
      setError('El tag debe tener al menos 2 caracteres.')
      return
    }
    if (limpio.length > 30) {
      setError('El tag no puede superar 30 caracteres.')
      return
    }
    if (tags.includes(limpio)) {
      setError('Ese tag ya está agregado.')
      return
    }
    if (tags.length >= MAX_TAGS) {
      setError(`Máximo ${MAX_TAGS} tags permitidos.`)
      return
    }

    setError('')
    const nuevos = [...tags, limpio]
    setTags(nuevos)
    guardar(nuevos)
    setInput('')
    inputRef.current?.focus()
  }

  const eliminarTag = (tag) => {
    const nuevos = tags.filter(t => t !== tag)
    setTags(nuevos)
    guardar(nuevos)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      agregarTag(input)
    }
    if (e.key === 'Backspace' && input === '' && tags.length > 0) {
      eliminarTag(tags[tags.length - 1])
    }
  }

  const sugeridosDisponibles = SUGERIDOS.filter(s => !tags.includes(s))

  return (
    <div className="dash-seccion">
      <h2 className="dash-titulo">🏷️ Mis Tags</h2>
      <p className="dash-desc">
        Los tags ayudan a los clientes a encontrarte cuando buscan algo específico.
        Por ejemplo: <em>amigurumi</em>, <em>sin gluten</em>, <em>reparación express</em>.
      </p>

      {/* Campo principal */}
      <div className="tags-campo-wrap">
        <label className="tags-label">
          Agregá tus tags
          <span className="tags-contador">{tags.length}/{MAX_TAGS}</span>
        </label>

        <div
          className="tags-input-zona"
          onClick={() => inputRef.current?.focus()}
        >
          {tags.map(tag => (
            <span key={tag} className="tags-chip">
              {tag}
              <button
                className="tags-chip-x"
                onClick={(e) => { e.stopPropagation(); eliminarTag(tag) }}
                aria-label={`Eliminar tag ${tag}`}
              >×</button>
            </span>
          ))}

          {tags.length < MAX_TAGS && (
            <input
              ref={inputRef}
              className="tags-input"
              value={input}
              onChange={e => { setInput(e.target.value); setError('') }}
              onKeyDown={handleKeyDown}
              placeholder={tags.length === 0 ? 'Escribí un tag y presioná Enter...' : '+ tag'}
              maxLength={32}
            />
          )}
        </div>

        {error && <p className="tags-error">{error}</p>}

        <p className="tags-hint">
          Presioná <kbd>Enter</kbd> o <kbd>,</kbd> para agregar · <kbd>Backspace</kbd> para borrar el último
        </p>
      </div>

      {guardado && (
        <div className="tags-guardado">✅ Tags guardados</div>
      )}

      {/* Sugeridos */}
      {sugeridosDisponibles.length > 0 && (
        <div className="tags-sugeridos-wrap">
          <p className="tags-sugeridos-titulo">💡 Sugerencias — hacé clic para agregar</p>
          <div className="tags-sugeridos">
            {sugeridosDisponibles.slice(0, 16).map(s => (
              <button
                key={s}
                className="tags-sugerido"
                onClick={() => agregarTag(s)}
                disabled={tags.length >= MAX_TAGS}
              >
                + {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Vista previa */}
      {tags.length > 0 && (
        <div className="tags-preview-wrap">
          <p className="tags-sugeridos-titulo">👁️ Así te verán los clientes en tu perfil</p>
          <div className="tags-preview">
            {tags.map(tag => (
              <span key={tag} className="tags-preview-chip">{tag}</span>
            ))}
          </div>
        </div>
      )}

      {/* Estado vacío */}
      {tags.length === 0 && (
        <div className="tags-vacio">
          <span>🏷️</span>
          <p>Aún no tenés tags.</p>
          <p>Agregá palabras clave para que los clientes te encuentren más fácil.</p>
        </div>
      )}
    </div>
  )
}