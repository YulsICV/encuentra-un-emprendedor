
import { useState } from 'react'

const pagosIniciales = [
  { id: 1, tipo: 'SINPE',    detalle: '8888-1234',         icono: '📱' },
  { id: 2, tipo: 'Tarjeta',  detalle: 'Visa / Mastercard', icono: '💳' },
  { id: 3, tipo: 'Efectivo', detalle: 'Contra entrega',    icono: '💵' },
]

export default function DashPagos() {
  const [metodos, setMetodos]     = useState(pagosIniciales)
  const [form, setForm]           = useState({ tipo: 'SINPE', detalle: '' })
  const [agregando, setAgregando] = useState(false)
  const [errores, setErrores]     = useState({})

  const agregar = () => {
    if (!form.detalle.trim()) {
      setErrores({ detalle: 'Este campo es requerido' })
      return
    }
    setMetodos(prev => [...prev, {
      id:      Date.now(),
      tipo:    form.tipo,
      detalle: form.detalle,
      icono:   form.tipo === 'SINPE' ? '📱'
             : form.tipo === 'Tarjeta' ? '💳'
             : form.tipo === 'Transferencia' ? '🏦'
             : '💵',
    }])
    setForm({ tipo: 'SINPE', detalle: '' })
    setErrores({})
    setAgregando(false)
  }

  const eliminar = (id) => setMetodos(prev => prev.filter(m => m.id !== id))

  return (
    <div className="dash-seccion">
      <h2 className="dash-titulo">Métodos de pago</h2>
      <p style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '1.5rem' }}>
        Configurá cómo querés recibir pagos de tus clientes.
      </p>

      {/* Lista actual */}
      <div className="prod-lista" style={{ marginBottom: '1.25rem' }}>
        {metodos.map(m => (
          <div key={m.id} className="prod-item">
            <div className="prod-info">
              <p className="prod-nombre">{m.icono} {m.tipo}</p>
              <p style={{ fontSize: '13px', color: 'var(--muted)' }}>{m.detalle}</p>
            </div>
            <button
              className="btn-icon btn-icon--danger"
              onClick={() => eliminar(m.id)}
            >
              🗑️
            </button>
          </div>
        ))}

        {metodos.length === 0 && (
          <div className="sin-resultados">
            <p>💳 No tenés métodos de pago configurados.</p>
          </div>
        )}
      </div>

      {/* Formulario agregar */}
      {!agregando ? (
        <button className="btn-secondary" onClick={() => setAgregando(true)}>
          + Agregar método
        </button>
      ) : (
        <div className="prod-form">
          <h3>Nuevo método de pago</h3>

          <div className="campo">
            <label>Tipo</label>
            <select
              value={form.tipo}
              onChange={e => setForm(p => ({ ...p, tipo: e.target.value }))}
            >
              <option>SINPE</option>
              <option>Tarjeta</option>
              <option>Transferencia</option>
              <option>Efectivo</option>
            </select>
          </div>

          <div className="campo">
            <label>
              {form.tipo === 'SINPE'          ? 'Número de teléfono'  :
               form.tipo === 'Tarjeta'        ? 'Tipos aceptados'     :
               form.tipo === 'Transferencia'  ? 'Banco / cuenta'      :
               'Descripción'}
            </label>
            <input
              value={form.detalle}
              onChange={e => {
                setForm(p => ({ ...p, detalle: e.target.value }))
                setErrores({})
              }}
              placeholder={
                form.tipo === 'SINPE'         ? 'ej. 8888-1234'          :
                form.tipo === 'Tarjeta'       ? 'ej. Visa / Mastercard'  :
                form.tipo === 'Transferencia' ? 'ej. BCR / BAC'          :
                'ej. Contra entrega'
              }
            />
            {errores.detalle && (
              <span className="campo-error">{errores.detalle}</span>
            )}
          </div>

          <div className="btn-row">
            <button
              className="btn-secondary"
              onClick={() => { setAgregando(false); setErrores({}) }}
            >
              Cancelar
            </button>
            <button className="btn-primary" onClick={agregar}>
              Guardar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}