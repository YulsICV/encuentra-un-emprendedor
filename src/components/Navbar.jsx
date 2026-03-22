import { useNavigate } from 'react-router-dom'

export default function Navbar({ seccionActiva, onNavegar }) {
  const navigate = useNavigate()

  const links = [
    { id: 'inicio', label: 'Inicio' },
    { id: 'sectores', label: 'Sectores' },
    { id: 'ofertas', label: 'Ofertas' },
    { id: 'emprendedores', label: 'Emprendedores' },
    { id: 'sobre-nosotros', label: 'Sobre nosotros' },
  ]

  return (
    <nav className="navbar">

      <div className="navbar-logo" onClick={() => onNavegar('inicio')}>
        <img src="/logo.png" alt="Logo" className="logo-img" />
        <span className="logo-text">
          Encuentra un <strong>Emprendedor</strong>
        </span>
      </div>

      <ul className="navbar-links">
        {links.map((link) => (
          <li key={link.id}>
            <button
              className={`nav-link ${seccionActiva === link.id ? 'nav-link--activo' : ''}`}
              onClick={() => onNavegar(link.id)}
            >
              {link.label}
            </button>
          </li>
        ))}
      </ul>

      <div className="navbar-acciones">
        <button className="btn-secondary" onClick={() => navigate('/registro')}>
          Registrá tu negocio
        </button>
        <button className="btn-primary" onClick={() => navigate('/login')}>
          Entrar
        </button>
      </div>

    </nav>
  )
}