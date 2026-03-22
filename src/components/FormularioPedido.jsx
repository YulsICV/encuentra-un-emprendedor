// src/components/FormularioPedido.jsx
import { useState } from 'react'

function formatColones(n) {
  return '₡' + Number(n).toLocaleString('es-CR')
}

export default function FormularioPedido({ producto, emprendedor, cliente, onConfirmar, onCancelar }) {
  const [form, setForm] = useState({
    cantidad:  1,
    nota:      '',
    entrega:   'domicilio',
    direccion: '',
  })
  const [confirmado, setConfirmado]         = useState(false)
  const [errorDireccion, setErrorDireccion] = useState(false)

  // Si es carrito el total ya viene calculado, si no se multiplica por cantidad
  const esCarrito = producto.id === 0
  const total     = esCarrito ? producto.precio : producto.precio * form.cantidad

  const handleConfirmar = () => {
    if (form.entrega === 'domicilio' && !form.direccion.trim()) {
      setErrorDireccion(true)
      return
    }
    setErrorDireccion(false)
    setConfirmado(true)
    onConfirmar({
      producto,
      emprendedor,
      cliente,
      ...form,
      total,
      estado: 'Pendiente',
      fecha:  new Date().toLocaleDateString('es-CR'),
    })
  }

  if (confirmado) {
    return (
      <div className="modal-overlay">
        <div className="modal-card" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎉</div>
          <h3>¡Pedido enviado!</h3>
          <p style={{ color: 'var(--muted)', fontSize: '13px', margin: '.5rem 0 1.25rem' }}>
            <strong>{emprendedor}</strong> recibió tu pedido y te contactará pronto.
          </p>
          <div style={{ background: 'var(--mint)', borderRadius: '12px', padding: '12px 16px', marginBottom: '1.25rem' }}>
            <p style={{ fontSize: '13px', color: 'var(--mint-dark)', fontWeight: 700 }}>
              📦 {producto.nombre} {!esCarrito && `x${form.cantidad}`}
            </p>
            <p style={{ fontSize: '14px', color: 'var(--mint-dark)', fontWeight: 800 }}>
              Total: {formatColones(total)}
            </p>
          </div>
          <button className="btn-primary" style={{ width: '100%' }} onClick={onCancelar}>
            Listo
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="modal-overlay">
      <div className="modal-card">

        <div className="modal-header">
          <h3>Confirmar pedido</h3>
          <p>Pedido para <strong>{emprendedor}</strong></p>
        </div>

        {/* Resumen del producto */}
        <div className="pedido-resumen">
          <span className="pedido-resumen-emoji">{producto.emoji}</span>
          <div>
            <p style={{ fontWeight: 800, fontSize: '14px' }}>{producto.nombre}</p>
            <p style={{ color: 'var(--mint-dark)', fontWeight: 700, fontSize: '13px' }}>
              {esCarrito ? formatColones(producto.precio) : `${formatColones(producto.precio)} c/u`}
            </p>
          </div>
        </div>

        {/* Detalle del carrito */}
        {esCarrito && producto.items && producto.items.length > 0 && (
          <div style={{ marginBottom: '1rem' }}>
            <p style={{ fontSize: '12px', fontWeight: 800, color: 'var(--muted)', marginBottom: '6px' }}>
              Productos incluidos
            </p>
            {producto.items.map((item, i) => (
              <div key={i} className="carrito-item" style={{ padding: '5px 0' }}>
                <span style={{ fontSize: '12px' }}>{item.emoji} {item.nombre}</span>
                <div className="carrito-item-derecha">
                  <span className="carrito-cantidad">x{item.cantidad}</span>
                  <span className="carrito-precio">{formatColones(item.subtotal)}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Cantidad — solo para productos individuales */}
        {!esCarrito && (
          <div className="campo">
            <label>Cantidad</label>
            <div className="cantidad-control">
              <button
                className="cantidad-btn"
                onClick={() => setForm(p => ({ ...p, cantidad: Math.max(1, p.cantidad - 1) }))}
              >
                -
              </button>
              <span className="cantidad-num">{form.cantidad}</span>
              <button
                className="cantidad-btn"
                onClick={() => setForm(p => ({ ...p, cantidad: p.cantidad + 1 }))}
              >
                +
              </button>
            </div>
          </div>
        )}

        {/* Tipo de entrega */}
        <div className="campo">
          <label>Tipo de entrega</label>
          <div className="entrega-opciones">
            <div
              className={`entrega-opcion ${form.entrega === 'domicilio' ? 'entrega-opcion--activa' : ''}`}
              onClick={() => setForm(p => ({ ...p, entrega: 'domicilio' }))}
            >
              🚚 A domicilio
            </div>
            <div
              className={`entrega-opcion ${form.entrega === 'retiro' ? 'entrega-opcion--activa' : ''}`}
              onClick={() => setForm(p => ({ ...p, entrega: 'retiro' }))}
            >
              🏪 Retiro en local
            </div>
          </div>
        </div>

        {/* Dirección */}
        {form.entrega === 'domicilio' && (
          <div className="campo">
            <label>Dirección de entrega</label>
            <input
              value={form.direccion}
              onChange={e => {
                setForm(p => ({ ...p, direccion: e.target.value }))
                setErrorDireccion(false)
              }}
              placeholder="ej. San José, Barrio Escalante, 100m norte del parque"
              style={{ borderColor: errorDireccion ? '#e53e3e' : '' }}
            />
            {errorDireccion && (
              <span className="campo-error">La dirección es requerida para entrega a domicilio</span>
            )}
          </div>
        )}

        {/* Nota */}
        <div className="campo">
          <label>Nota para el emprendedor (opcional)</label>
          <textarea
            value={form.nota}
            onChange={e => setForm(p => ({ ...p, nota: e.target.value }))}
            placeholder="ej. Sin azúcar, para el 25 de marzo..."
            style={{ minHeight: '70px' }}
          />
        </div>

        {/* Total */}
        <div className="pedido-total">
          <span>Total estimado</span>
          <strong>{formatColones(total)}</strong>
        </div>

        {/* Info cliente */}
        <div className="pedido-cliente-info">
          👤 {cliente.nombre} · 📞 {cliente.telefono}
        </div>

        <div className="btn-row" style={{ marginTop: '1rem' }}>
          <button className="btn-secondary" onClick={onCancelar}>Cancelar</button>
          <button
            className="btn-primary"
            onClick={handleConfirmar}
            style={{ flex: 2 }}
          >
            Confirmar pedido 🎉
          </button>
        </div>

      </div>
    </div>
  )
}