import { useState } from 'react'

const ofertasIniciales = [
  { id: 1, producto: 'Pastel personalizado', precioOriginal: 12000, descuento: 30, activa: true  },
  { id: 2, producto: 'Cupcakes x12',         precioOriginal: 8500,  descuento: 15, activa: false },
]

function precioFinal(original, descuento) {
  return Math.round(original * (1 - descuento / 100))
}

export default function DashOfertas() {
  const [ofertas, setOfertas]   = useState(ofertasIniciales)
  const [form, setForm]         = useState({ producto: '', precioOriginal: '', descuento: '' })
  const [errores, setErrores]   = useState({})

  const validar = () => {
    const e = {}
    if (!form.producto.trim())                          e.producto       = 'Requerido'
    if (!form.precioOriginal || form.precioOriginal <= 0) e.precioOriginal = 'Precio inválido'
    if (!form.descuento || form.descuento < 1 || form.descuento > 90) e.descuento = 'Entre 1 y 90'
    return e
  }

  const agregar = () => {
    const e = validar()
    if (Object.keys(e).length > 0) { setErrores(e); return }
    setErrores({})
    setOfertas(prev => [...prev, {
      id: Date.now(),
      producto: form.producto,
      precioOriginal: Number(form.precioOriginal),
      descuento: Number(form.descuento),
      activa: true
    }])
    setForm({ producto: '', precioOriginal: '', descuento: '' })
  }

  const toggleActiva = (id) => {
    setOfertas(prev => prev.map(o => o.id === id ? { ...o, activa: !o.activa } : o))
  }

  const eliminar = (id) => {
    setOfertas(prev => prev.filter(o => o.id !== id))
  }

  return (
    <div className="dash-seccion">
      <h2 className="dash-titulo">Ofertas del día</h2>

      {/* Formulario */}
      <div className="prod-form">
        <h3>Nueva oferta</h3>
        <div className="campo">
          <label>Producto</label>
          <input value={form.producto} onChange={e => setForm(p => ({ ...p, producto: e.target.value }))} placeholder="ej. Pastel de chocolate" />
          {errores.producto && <span className="campo-error">{errores.producto}</span>}
        </div>
        <div className="row2">
          <div className="campo">
            <label>Precio original (₡)</label>
            <input type="number" value={form.precioOriginal} onChange={e => setForm(p => ({ ...p, precioOriginal: e.target.value }))} placeholder="12000" />
            {errores.precioOriginal && <span className="campo-error">{errores.precioOriginal}</span>}
          </div>
          <div className="campo">
            <label>Descuento (%)</label>
            <input type="number" value={form.descuento} onChange={e => setForm(p => ({ ...p, descuento: e.target.value }))} placeholder="30" />
            {errores.descuento && <span className="campo-error">{errores.descuento}</span>}
          </div>
        </div>
        {form.precioOriginal && form.descuento && (
          <p className="oferta-preview">
            Precio con descuento: <strong>₡{precioFinal(Number(form.precioOriginal), Number(form.descuento)).toLocaleString('es-CR')}</strong>
          </p>
        )}
        <button className="btn-primary" onClick={agregar}>+ Publicar oferta</button>
      </div>

      {/* Lista */}
      <div className="prod-lista">
        {ofertas.map(o => (
          <div key={o.id} className={`prod-item ${!o.activa ? 'prod-item--inactivo' : ''}`}>
            <div className="prod-info">
              <p className="prod-nombre">{o.producto}</p>
              <p className="prod-precio">
                ₡{precioFinal(o.precioOriginal, o.descuento).toLocaleString('es-CR')}
                <span className="precio-tachado"> ₡{o.precioOriginal.toLocaleString('es-CR')}</span>
                <span className="descuento-badge">-{o.descuento}%</span>
              </p>
            </div>
            <div className="prod-acciones">
              <span
                className={`stock-badge ${o.activa ? 'stock-badge--on' : 'stock-badge--off'}`}
                onClick={() => toggleActiva(o.id)}
              >
                {o.activa ? 'Activa' : 'Pausada'}
              </span>
              <button className="btn-icon btn-icon--danger" onClick={() => eliminar(o.id)}>🗑️</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}