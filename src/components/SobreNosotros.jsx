const VALORES = [
  { icono: '🤝', titulo: 'Comunidad', desc: 'Creemos en el poder de apoyar lo local y conectar personas.' },
  { icono: '💡', titulo: 'Innovación', desc: 'Usamos tecnología para simplificar cómo los negocios crecen.' },
  { icono: '🌱', titulo: 'Crecimiento', desc: 'Cada compra local ayuda a una persona a construir su sueño.' },
  { icono: '🔒', titulo: 'Confianza', desc: 'Perfiles verificados y contacto directo sin intermediarios.' },
]

export default function SobreNosotros() {
  return (
    <section className="sobre-nosotros" id="sobre-nosotros">

      {/* Historia */}
      <div className="sobre-hero">
        <span className="hero-tag">🌱 Nuestra historia</span>
        <h2>Nacimos para darle visibilidad <span>al talento local</span></h2>
        <p>
          Encuentra un Emprendedor nació de una idea simple: que sea fácil 
          descubrir, apoyar y conectar con las personas que construyen sus 
          sueños cada día en Costa Rica. Creemos que cada negocio local 
          merece una vitrina digital.
        </p>
      </div>

      {/* Valores */}
      <div className="valores-grid">
        {VALORES.map((v, i) => (
          <div key={i} className="valor-card">
            <div className="valor-icono">{v.icono}</div>
            <p className="valor-titulo">{v.titulo}</p>
            <p className="valor-desc">{v.desc}</p>
          </div>
        ))}
      </div>

      {/* Equipo / crédito */}
      <div className="sobre-credito">
        <div className="credito-avatar">👤</div>
        <div>
          <p className="credito-nombre">Yuliana Cruz V.</p>
          <p className="credito-rol">Fundadora · Diseñadora · Desarrolladora</p>
          <p className="credito-desc">
            Este proyecto fue construido con mucho café ☕ y ganas de 
            aportar algo útil a la comunidad emprendedora de Costa Rica.
          </p>
        </div>
      </div>

    </section>
  )
}