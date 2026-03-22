// src/components/OfertasDelDia.jsx
import { useState } from 'react'
import RegistroCliente from './RegistroCliente'
import FormularioPedido from './FormularioPedido'
import { useNavigate } from 'react-router-dom'

const OFERTAS = [
  {
    id: 1,
    emoji: '🍰',
    color: 'mint',
    titulo: 'Pastel personalizado',
    emprendedor: 'Dulces de Lucía',
    precioOriginal: 12000,
    descuento: 30,
  },
  {
    id: 2,
    emoji: '💆',
    color: 'peach',
    titulo: 'Masaje relajante 60 min',
    emprendedor: 'Spa Natural Valeria',
    precioOriginal: 19000,
    descuento: 20,
  },
  {
    id: 3,
    emoji: '👗',
    color: 'lavender',
    titulo: 'Blusa bordada a mano',
    emprendedor: 'Tejidos Ana Sofía',
    precioOriginal: 15000,
    descuento: 40,
  },
  {
    id: 4,
    emoji: '🌿',
    color: 'sky',
    titulo: 'Kit de plantas suculentas',
    emprendedor: 'Verde Vivo CR',
    precioOriginal: 8000,
    descuento: 25,
  },
]

function calcularPrecio(original, descuento) {
  return Math.round(original * (1 - descuento / 100))
}

function formatColones(monto) {
  return '₡' + monto.toLocaleString('es-CR')
}

export default function OfertasDelDia({ busqueda, clienteActivo, onClienteRegistrado }) {
  const [pedidos, setPedidos] = useState([])
  const [vista, setVista] = useState(null)
  const [productoSeleccionado, setProductoSeleccionado] = useState(null)
  const [cliente, setCliente] = useState(clienteActivo)
  const navigate = useNavigate()

  const agregarPedido = (oferta) => {
    if (!pedidos.find(p => p.id === oferta.id)) {
      setPedidos([...pedidos, oferta])
    }
  }

  const yaPedido = (id) => pedidos.some(p => p.id === id)

  const handleConfirmarCarrito = () => {
    if (pedidos.length === 0) return
    const total = pedidos.reduce((acc, p) => acc + calcularPrecio(p.precioOriginal, p.descuento), 0)
    setProductoSeleccionado({
      id: 0,
      emoji: '🛒',
      nombre: `Carrito (${pedidos.length} ${pedidos.length === 1 ? 'producto' : 'productos'})`,
      precio: total,
      disponible: true,
    })
    if (cliente) {
      setVista('pedido')
    } else {
      setVista('registro')
    }
  }

  const handleRegistrado = (nuevoCliente) => {
    setCliente(nuevoCliente)
    onClienteRegistrado(nuevoCliente)
    setVista('pedido')
  }

  const handleConfirmado = () => {
    setPedidos([])
    setTimeout(() => setVista(null), 2500)
  }

  const termino = busqueda?.toLowerCase() || ''
  const filtradas = termino
    ? OFERTAS.filter(o =>
      o.titulo.toLowerCase().includes(termino) ||
      o.emprendedor.toLowerCase().includes(termino)
    )
    : OFERTAS

  return (
    <section className="ofertas">

      {/* Modales */}
      {vista === 'registro' && (
        <RegistroCliente
          onRegistrado={handleRegistrado}
          onYaTengo={() => navigate('/login')}  // ← antes era setVista(null)
          onCancelar={() => setVista(null)}
        />
      )}

      {vista === 'pedido' && productoSeleccionado && cliente && (
        <FormularioPedido
          producto={productoSeleccionado}
          emprendedor="Varios emprendedores"
          cliente={cliente}
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
            const pedido = yaPedido(oferta.id)

            return (
              <div key={oferta.id} className="oferta-card">
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
                    <button
                      className={`btn-pedir ${pedido ? 'btn-pedir--pedido' : ''}`}
                      onClick={() => agregarPedido(oferta)}
                      disabled={pedido}
                    >
                      {pedido ? '✓ Pedido' : 'Pedir'}
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {pedidos.length > 0 && (
        <div className="carrito">
          <p className="carrito-titulo">🛒 Tu selección ({pedidos.length})</p>
          <ul className="carrito-lista">
            {pedidos.map(p => (
              <li key={p.id}>
                {p.emoji} {p.titulo}
                <span>{formatColones(calcularPrecio(p.precioOriginal, p.descuento))}</span>
              </li>
            ))}
          </ul>
          <div className="carrito-total">
            <span>Total</span>
            <strong>
              {formatColones(
                pedidos.reduce((acc, p) => acc + calcularPrecio(p.precioOriginal, p.descuento), 0)
              )}
            </strong>
          </div>
          <button
            className="btn-primary"
            style={{ width: '100%', marginTop: '0.75rem' }}
            onClick={handleConfirmarCarrito}
          >
            Confirmar pedidos
          </button>
        </div>
      )}

    </section>
  )
}