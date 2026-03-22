import { useState } from 'react'

const productosIniciales = [
  { id: 1, nombre: 'Pastel personalizado',   precio: 12000, stock: true  },
  { id: 2, nombre: 'Cupcakes x12',           precio: 8500,  stock: true  },
  { id: 3, nombre: 'Torta de bodas',         precio: 45000, stock: false },
]

function formatColones(n) {
  return '₡' + n.toLocaleString('es-CR')
}

export default function DashProductos() {
  const [productos, setProductos] = useState(productosIniciales)
  const [form, setForm]           = useState({ nombre: '', precio: '' })
  const [editando, setEditando]   = useState(null)
  const [errores, setErrores]     = useState({})

  const validar = () => {
    const e = {}
    if (!form.nombre.trim())       e.nombre = 'Nombre requerido'
    if (!form.precio || form.precio <= 0) e.precio = 'Precio inválido'
    return e
  }

  const guardar = () => {
    const e = validar()
    if (Object.keys(e).length > 0) { setErrores(e); return }
    setErrores({})

    if (editando) {
      setProductos(prev => prev.map(p =>
        p.id === editando
          ? { ...p, nombre: form.nombre, precio: Number(form.precio) }
          : p
      ))
      setEditando(null)
    } else {
      setProductos(prev => [...prev, {
        id: Date.now(),
        nombre: form.nombre,
        precio: Number(form.precio),
        stock: true
      }])
    }
    setForm({ nombre: '', precio: '' })
  }

  const editar = (p) => {
    setEditando(p.id)
    setForm({ nombre: p.nombre, precio: p.precio })
  }

  const eliminar = (id) => {
    setProductos(prev => prev.filter(p => p.id !== id))
  }

  const toggleStock = (id) => {
    setProductos(prev => prev.map(p =>
      p.id === id ? { ...p, stock: !p.stock } : p
    ))
  }

  return (
    <div className="dash-seccion">
      <h2 className="dash-titulo">Mis productos</h2>

      {/* Formulario agregar / editar */}
      <div className="prod-form">
        <h3>{editando ? 'Editando producto' : 'Agregar producto'}</h3>
        <div className="row2">
          <div className="campo">
            <label>Nombre</label>
            <input
              value={form.nombre}
              onChange={e => setForm(p => ({ ...p, nombre: e.target.value }))}
              placeholder="ej. Pastel de chocolate"
            />
            {errores.nombre && <span className="campo-error">{errores.nombre}</span>}
          </div>
          <div className="campo">
            <label>Precio (₡)</label>
            <input
              type="number"
              value={form.precio}
              onChange={e => setForm(p => ({ ...p, precio: e.target.value }))}
              placeholder="ej. 12000"
            />
            {errores.precio && <span className="campo-error">{errores.precio}</span>}
          </div>
        </div>
        <div className="prod-form-btns">
          {editando && (
            <button className="btn-secondary" onClick={() => { setEditando(null); setForm({ nombre: '', precio: '' }) }}>
              Cancelar
            </button>
          )}
          <button className="btn-primary" onClick={guardar}>
            {editando ? 'Guardar cambios' : '+ Agregar'}
          </button>
        </div>
      </div>

      {/* Lista de productos */}
      <div className="prod-lista">
        {productos.map(p => (
          <div key={p.id} className="prod-item">
            <div className="prod-info">
              <p className="prod-nombre">{p.nombre}</p>
              <p className="prod-precio">{formatColones(p.precio)}</p>
            </div>
            <div className="prod-acciones">
              <span
                className={`stock-badge ${p.stock ? 'stock-badge--on' : 'stock-badge--off'}`}
                onClick={() => toggleStock(p.id)}
              >
                {p.stock ? 'Disponible' : 'Agotado'}
              </span>
              <button className="btn-icon" onClick={() => editar(p)}>✏️</button>
              <button className="btn-icon btn-icon--danger" onClick={() => eliminar(p.id)}>🗑️</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}