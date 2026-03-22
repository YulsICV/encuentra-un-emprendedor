export default function Footer({ onNavegar }) {
  return (
    <footer className="footer">

      {/* Top: columnas */}
      <div className="footer-grid">

        {/* Columna 1: marca */}
        <div className="footer-marca">
          <div className="footer-logo">
            <img src="/logo.png" alt="Logo" className="logo-img" />
            <span className="logo-text">
              Encuentra un <strong>Emprendedor</strong>
            </span>
          </div>
          <p className="footer-slogan">
            Apoyando el talento local de Costa Rica, una compra a la vez.
          </p>
          <div className="footer-redes">
            <a className="red-btn">📸</a>
            <a className="red-btn">💬</a>
            <a className="red-btn">👍</a>
            <a className="red-btn">🎵</a>
          </div>
        </div>

        {/* Columna 2: navegación */}
        <div className="footer-col">
          <p className="footer-col-titulo">Plataforma</p>
          <ul>
            <li onClick={() => onNavegar('inicio')}>Inicio</li>
            <li onClick={() => onNavegar('sectores')}>Sectores</li>
            <li onClick={() => onNavegar('ofertas')}>Ofertas del día</li>
            <li onClick={() => onNavegar('emprendedores')}>Emprendedores</li>
          </ul>
        </div>

        {/* Columna 3: para negocios */}
        <div className="footer-col">
          <p className="footer-col-titulo">Para negocios</p>
          <ul>
            <li onClick={() => onNavegar('registro')}>Registrá tu negocio</li>
            <li>Publicar ofertas</li>
            <li>Recibir pedidos</li>
            <li>Centro de ayuda</li>
          </ul>
        </div>

        {/* Columna 4: contacto */}
        <div className="footer-col">
          <p className="footer-col-titulo">Contacto</p>
          <ul>
            <li>📧 hola@encuentraemprendedor.cr</li>
            <li>📍 Guanacaste, Costa Rica</li>
            <li>🕐 Lun–Vie 8am–6pm</li>
          </ul>
        </div>

      </div>

      {/* Divider */}
      <div className="footer-divider" />

      {/* Bottom: créditos */}
      <div className="footer-bottom">
        <p>© 2026 Encuentra un Emprendedor · Todos los derechos reservados</p>
        <p className="footer-credito">
          Diseñado y desarrollado con 💚 por <strong>Yuliana Cruz V.</strong>
        </p>
      </div>

    </footer>
  )
}