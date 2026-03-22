// src/components/Navbar.jsx
import { useState, useEffect } from 'react'

export default function Navbar({ seccionActiva, onNavegar, clienteActivo }) {
  const [abierto, setAbierto] = useState(false)

  const links = [
    { id: 'inicio',         label: 'Inicio'         },
    { id: 'sectores',       label: 'Sectores'       },
    { id: 'ofertas',        label: 'Ofertas'        },
    { id: 'emprendedores',  label: 'Emprendedores'  },
    { id: 'sobre-nosotros', label: 'Sobre nosotros' },
  ]

  const handleLink = (id) => {
    onNavegar(id)
    setAbierto(false)
  }

  useEffect(() => {
    const cerrar = () => setAbierto(false)
    window.addEventListener('scroll', cerrar)
    return () => window.removeEventListener('scroll', cerrar)
  }, [])

  return (
    <nav className="navbar">

      <div className="navbar-logo" onClick={() => handleLink('inicio')}>
        <img src="/logo.png" alt="Logo" className="logo-img" />
        <span className="logo-text">
          Encuentra un <strong>Emprendedor</strong>
        </span>
      </div>

      <ul className={`navbar-links ${abierto ? 'abierto' : ''}`}>
        {links.map(link => (
          <li key={link.id}>
            <button
              className={`nav-link ${seccionActiva === link.id ? 'nav-link--activo' : ''}`}
              onClick={() => handleLink(link.id)}
            >
              {link.label}
            </button>
          </li>
        ))}
        <li className="navbar-acciones-mobile">
          <button className="btn-secondary" onClick={() => handleLink('registro')}>
            Registrá tu negocio
          </button>
          {clienteActivo ? (
            <button className="btn-primary" onClick={() => handleLink('mi-cuenta')}>
              👤 {clienteActivo.nombre.split(' ')[0]}
            </button>
          ) : (
            <button className="btn-primary" onClick={() => handleLink('login')}>
              Entrar
            </button>
          )}
        </li>
      </ul>

      <div className="navbar-acciones">
        <button className="btn-secondary" onClick={() => onNavegar('registro')}>
          Registrá tu negocio
        </button>
        {clienteActivo ? (
          <button className="btn-primary" onClick={() => onNavegar('mi-cuenta')}>
            👤 {clienteActivo.nombre.split(' ')[0]}
          </button>
        ) : (
          <button className="btn-primary" onClick={() => onNavegar('login')}>
            Entrar
          </button>
        )}
      </div>

      <button
        className="navbar-hamburguesa"
        onClick={() => setAbierto(p => !p)}
        aria-label="Menú"
      >
        <span className="hamburguesa-linea" />
        <span className="hamburguesa-linea" />
        <span className="hamburguesa-linea" />
      </button>

    </nav>
  )
}