import { useNavigate } from 'react-router-dom'

export default function TarjetaEmprendedor({ emprendedor, onContactar, onPedir }) {
  const { avatar, nombre, negocio, sector, provincia, tags, descripcion, estrellas, reseñas } = emprendedor
  const navigate = useNavigate()
  return (
    <div className="perfil-card">

      <div className="perfil-avatar">{avatar}</div>

      <div className="perfil-info">
        <p className="perfil-nombre">{nombre}</p>
        <p className="perfil-negocio">
          {negocio} · {sector} · {provincia}
        </p>

        <div className="perfil-tags">
          {tags.map((tag, i) => (
            <span key={i} className="tag">{tag}</span>
          ))}
        </div>

        <p className="perfil-desc">{descripcion}</p>

        <p className="perfil-rating">
          <span className="estrellas">{'★'.repeat(Math.round(estrellas))}</span>
          {estrellas} · {reseñas} reseñas
        </p>

        <div className="perfil-btns">
          <button className="btn-pedido" onClick={() => onPedir(emprendedor)}>
            Hacer pedido
          </button>
          <button className="btn-contacto" onClick={() => onContactar(emprendedor)}>
            Contactar
          </button>
          <button className="btn-ver" onClick={() => navigate(`/emprendedor/${emprendedor.id}`)}>
            Ver perfil
          </button>
        </div>
      </div>

    </div>
  )
}