// src/components/OfertasDelDia.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import RegistroCliente from './RegistroCliente'
import FormularioPedido from './FormularioPedido'

const OFERTAS = [
  { id: 1, emoji: '🍰', color: 'mint',     titulo: 'Pastel personalizado',    emprendedor: 'Dulces de Lucía',     precioOriginal: 12000, descuento: 30 },
  { id: 2, emoji: '💆', color: 'peach',    titulo: 'Masaje relajante 60 min', emprendedor: 'Spa Natural Valeria', precioOriginal: 19000, descuento: 20 },
  { id: 3, emoji: '👗', color: 'lavender', titulo: 'Blusa bordada a mano',    emprendedor: 'Tejidos Ana Sofía',   precioOriginal: 15000, descuento: 40 },
  { id: 4, emoji: '🌿', color: 'sky',      titulo: 'Kit de plantas suculentas', emprendedor: 'Verde Vivo CR',     precioOriginal: 8000,  descuento: 25 },
]

function calcularPrecio(original, descuento) {
  return Math.round(original * (1 - descuento / 100))
}

function formatColones(monto) {
  return '₡' + monto.toLocaleString('es-CR')
}

export default function OfertasDelDia({ busqueda, clienteActivo, onClienteRegistrado, pedidoPendiente, onPedidoPendiente, onNuevoPedido }) {
  const navigate                                        = useNavigate()
  const [cantidades, setCantidades]                     = useState({}) // { id: cantidad }
  const [seleccionados, setSeleccionados]               = useState([]) // ofertas en carrito
  const [vista, setVista]                               = useState(null)
  const [productoSeleccionado, setProductoSeleccionado] = useState(null)

  const clienteParaUsar = clienteActivo

  if (clienteActivo && pedidoPendiente?.origen === 'carrito' && vista !== 'pedido') {
    setProductoSeleccionado(pedidoPendiente.producto)
    setVista('pedido')
    onPedidoPendiente(null)
  }

  // Agregar/quitar del carrito
  const toggleOferta = (oferta) => {
    const yaEsta = seleccionados.find(p => p.id === oferta.id)
    if (yaEsta) {
      setSeleccionados(prev => prev.filter(p => p.id !== oferta.id))
      setCantidades(prev => { const n = { ...prev }; delete n[oferta.id]; return n })
    } else {
      setSeleccionados(prev => [...prev, oferta])
      setCantidades(prev => ({ ...prev, [oferta.id]: 1 }))
    }
  }

  const cambiarCantidad = (id, delta) => {
    setCantidades(prev => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + delta)
    }))
  }

  const estaEnCarrito = (id) => seleccionados.some(p => p.id === id)

  const totalCarrito = seleccionados.reduce((acc, p) => {
    const precio    = calcularPrecio(p.precioOriginal, p.descuento)
    const cantidad  = cantidades[p.id] || 1
    return acc + precio * cantidad
  }, 0)

  const handleConfirmarCarrito = () => {
    if (seleccionados.length === 0) return

    // Construir producto con detalle de items
    const items = seleccionados.map(p => ({
      id:       p.id,
      emoji:    p.emoji,
      nombre:   p.titulo,
      cantidad: cantidades[p.id] || 1,
      precio:   calcularPrecio(p.precioOriginal, p.descuento),
      subtotal: calcularPrecio(p.precioOriginal, p.descuento) * (cantidades[p.id] || 1),
      emprendedor: p.emprendedor,
    }))

    const producto = {
      id:         0,
      emoji:      '🛒',
      nombre:     `Carrito (${seleccionados.length} ${seleccionados.length === 1 ? 'producto' : 'productos'})`,
      precio:     totalCarrito,
      disponible: true,
      items,      // ← detalle de cada producto
    }

    setProductoSeleccionado(producto)
    if (clienteParaUsar) {
      setVista('pedido')
    } else {
      setVista('registro')
    }
  }

  const handleRegistrado = (nuevoCliente) => {
    onClienteRegistrado(nuevoCliente)
    setVista('pedido')
  }

  const handleConfirmado = (datosPedido) => {
    onNuevoPedido(datosPedido)
    setSeleccionados([])
    setCantidades({})
    setTimeout(() => setVista(null), 2500)
  }

  const termino   = busqueda?.toLowerCase() || ''
  const filtradas = termino
    ? OFERTAS.filter(o =>
        o.titulo.toLowerCase().includes(termino) ||
        o.emprendedor.toLowerCase().includes(termino)
      )
    : OFERTAS

  return (
    <section className="ofertas">

      {vista === 'registro' && (
        <RegistroCliente
          onRegistrado={handleRegistrado}
          onYaTengo={() => {
            onPedidoPendiente({ producto: productoSeleccionado, origen: 'carrito' })
            navigate('/login')
          }}
          onCancelar={() => setVista(null)}
        />
      )}

      {vista === 'pedido' && productoSeleccionado && clienteParaUsar && (
        <FormularioPedido
          producto={productoSeleccionado}
          emprendedor="Varios emprendedores"
          cliente={clienteParaUsar}
          onConfirmar={handleConfirmado}
          onCancelar={() => setVista(null)}
        />
      )}

      <div className="section-header">
        <h2>🔥 {busqueda ? `Ofertas para "${busqueda}"` : 'Ofertas del día'}</h2>
        <a className="ver-todos">Ver todas →</a>
      </div>

      {filtradas.length === 0 ? (
        <div className="sin-resultados">
          <p>😕 Sin ofertas para <strong>{busqueda}</strong></p>
          <p>Intentá con otro término.</p>
        </div>
      ) : (
        <div className="ofertas-grid">
          {filtradas.map((oferta) => {
            const precioFinal = calcularPrecio(oferta.precioOriginal, oferta.descuento)
            const enCarrito   = estaEnCarrito(oferta.id)
            const cantidad    = cantidades[oferta.id] || 1

            return (
              <div key={oferta.id} className={`oferta-card ${enCarrito ? 'oferta-card--seleccionada' : ''}`}>
                <div className={`oferta-img oferta-img--${oferta.color}`}>
                  <span>{oferta.emoji}</span>
                  <span className="badge-descuento">-{oferta.descuento}%</span>
                </div>
                <div className="oferta-body">
                  <p className="oferta-titulo">{oferta.titulo}</p>
                  <p className="oferta-emprendedor">🌱 {oferta.emprendedor}</p>
                  <div className="oferta-footer">
                    <div className="oferta-precios">
                      <span className="precio-nuevo">{formatColones(precioFinal)}</span>
                      <span className="precio-viejo">{formatColones(oferta.precioOriginal)}</span>
                    </div>
                    {enCarrito ? (
                      <div className="cantidad-inline">
                        <button className="cantidad-btn-sm" onClick={() => cambiarCantidad(oferta.id, -1)}>-</button>
                        <span className="cantidad-sm">{cantidad}</span>
                        <button className="cantidad-btn-sm" onClick={() => cambiarCantidad(oferta.id, 1)}>+</button>
                        <button className="btn-quitar" onClick={() => toggleOferta(oferta)}>✕</button>
                      </div>
                    ) : (
                      <button className="btn-pedir" onClick={() => toggleOferta(oferta)}>
                        Agregar
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Carrito */}
      {seleccionados.length > 0 && (
        <div className="carrito">
          <p className="carrito-titulo">🛒 Tu selección ({seleccionados.length})</p>

          {/* Agrupado por emprendedor */}
          {Array.from(new Set(seleccionados.map(p => p.emprendedor))).map(emp => {
            const items = seleccionados.filter(p => p.emprendedor === emp)
            const subtotal = items.reduce((acc, p) =>
              acc + calcularPrecio(p.precioOriginal, p.descuento) * (cantidades[p.id] || 1), 0)
            return (
              <div key={emp} className="carrito-grupo">
                <p className="carrito-grupo-titulo">🌱 {emp}</p>
                {items.map(p => (
                  <div key={p.id} className="carrito-item">
                    <span>{p.emoji} {p.titulo}</span>
                    <div className="carrito-item-derecha">
                      <span className="carrito-cantidad">x{cantidades[p.id] || 1}</span>
                      <span className="carrito-precio">
                        {formatColones(calcularPrecio(p.precioOriginal, p.descuento) * (cantidades[p.id] || 1))}
                      </span>
                    </div>
                  </div>
                ))}
                <p className="carrito-subtotal">Subtotal: {formatColones(subtotal)}</p>
              </div>
            )
          })}

          <div className="carrito-total">
            <span>Total</span>
            <strong>{formatColones(totalCarrito)}</strong>
          </div>
          <button
            className="btn-primary"
            style={{ width: '100%', marginTop: '0.75rem' }}
            onClick={handleConfirmarCarrito}
          >
            Confirmar pedido
          </button>
        </div>
      )}

    </section>
  )
}