// src/components/legal/Membresias.jsx
import { useState } from 'react'

const PLANES = [
  {
    id: 'gratis',
    nombre: 'Gratis',
    precio: 0,
    periodo: '',
    color: 'cream',
    badge: null,
    descripcion: 'Para empezar a vender sin costo',
    funciones: [
      { texto: 'Perfil público del negocio',     incluido: true  },
      { texto: 'Hasta 5 productos publicados',   incluido: true  },
      { texto: '1 oferta del día activa',         incluido: true  },
      { texto: 'Chat con clientes',               incluido: true  },
      { texto: 'Aparecer en búsquedas',           incluido: true  },
      { texto: 'Aparecer primero en búsquedas',   incluido: false },
      { texto: 'Estadísticas avanzadas',          incluido: false },
      { texto: 'Insignia de negocio verificado',  incluido: false },
      { texto: 'Chat prioritario',                incluido: false },
      { texto: 'Más de 3 fotos por producto',     incluido: false },
    ],
    cta: 'Registrarme gratis',
    ctaTipo: 'secondary',
  },
  {
    id: 'emprendedor',
    nombre: 'Emprendedor',
    precio: 4990,
    periodo: '/mes',
    color: 'mint',
    badge: 'Más popular',
    descripcion: 'Para negocios que quieren crecer',
    funciones: [
      { texto: 'Perfil público del negocio',     incluido: true },
      { texto: 'Hasta 20 productos publicados',  incluido: true },
      { texto: 'Hasta 5 ofertas del día activas', incluido: true },
      { texto: 'Chat con clientes',              incluido: true },
      { texto: 'Aparecer primero en búsquedas',  incluido: true },
      { texto: 'Estadísticas avanzadas',         incluido: true },
      { texto: 'Hasta 5 fotos por producto',     incluido: true },
      { texto: 'Insignia de negocio verificado', incluido: false },
      { texto: 'Chat prioritario',               incluido: false },
    ],
    cta: 'Empezar con SINPE',
    ctaTipo: 'primary',
  },
  {
    id: 'pro',
    nombre: 'Negocio Pro',
    precio: 9990,
    periodo: '/mes',
    color: 'lavender',
    badge: 'Completo',
    descripcion: 'Para negocios establecidos',
    funciones: [
      { texto: 'Perfil público del negocio',        incluido: true },
      { texto: 'Productos ilimitados',              incluido: true },
      { texto: 'Ofertas del día ilimitadas',        incluido: true },
      { texto: 'Chat prioritario con clientes',     incluido: true },
      { texto: 'Aparecer primero en búsquedas',     incluido: true },
      { texto: 'Estadísticas avanzadas completas',  incluido: true },
      { texto: 'Fotos ilimitadas por producto',     incluido: true },
      { texto: 'Insignia de negocio verificado ✓',  incluido: true },
    ],
    cta: 'Empezar con SINPE',
    ctaTipo: 'primary',
  },
]

const EXTRAS = [
  { nombre: 'Verificación de negocio',  precio: 2500,  descripcion: 'Pago único. Revisamos tu negocio y te damos la insignia ✓ de verificado. Se paga por transferencia bancaria o SINPE una sola vez.' },
  { nombre: 'Destaque por 7 días',      precio: 1500,  descripcion: 'Tu negocio aparece primero en búsquedas durante 7 días.' },
  { nombre: 'Pack de 10 fotos extra',   precio: 990,   descripcion: 'Agregá hasta 10 fotos adicionales a cualquier producto.' },
]

function formatColones(n) {
  return '₡' + n.toLocaleString('es-CR')
}

export default function Membresias({ onVolver, onNavegar }) {
  const [modalSinpe, setModalSinpe]   = useState(null)
  const [modalVerif, setModalVerif]   = useState(false)

  return (
    <div className="legal-page" style={{ maxWidth: '900px' }}>

      {/* Modal SINPE */}
      {modalSinpe && (
        <div className="modal-overlay">
          <div className="modal-card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📱</div>
            <h3 style={{ fontFamily: 'Playfair Display, serif', marginBottom: '.5rem' }}>
              Pagar con SINPE Móvil
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '1.25rem' }}>
              Plan <strong>{modalSinpe}</strong>
            </p>
            <div style={{ background: 'var(--cream)', borderRadius: '12px', padding: '1rem', marginBottom: '1.25rem' }}>
              <p style={{ fontSize: '12px', color: 'var(--muted)', marginBottom: '4px' }}>Enviá al número</p>
              <p style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--mint-dark)', letterSpacing: '2px' }}>
                8888-0000
              </p>
              <p style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '8px' }}>
                En el concepto escribí tu correo registrado
              </p>
            </div>
            <div style={{ background: '#fef3c7', borderRadius: '10px', padding: '10px 14px', fontSize: '12px', color: '#92400e', marginBottom: '1.25rem', textAlign: 'left' }}>
              ⚠️ Una vez realizado el pago, enviá el comprobante a <strong>hola@encuentraemprendedor.cr</strong> para activar tu plan en un plazo de 24 horas hábiles.
            </div>
            <button className="btn-primary" style={{ width: '100%' }} onClick={() => setModalSinpe(null)}>
              Entendido
            </button>
          </div>
        </div>
      )}

      {/* Modal verificación */}
      {modalVerif && (
        <div className="modal-overlay">
          <div className="modal-card">
            <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
              <div style={{ fontSize: '2.5rem' }}>✅</div>
              <h3 style={{ fontFamily: 'Playfair Display, serif', margin: '.5rem 0 .25rem' }}>
                Verificación de negocio
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--muted)' }}>Pago único · {formatColones(2500)}</p>
            </div>

            <div style={{ background: 'var(--cream)', borderRadius: '12px', padding: '1rem', marginBottom: '1rem' }}>
              <p style={{ fontSize: '13px', fontWeight: 800, marginBottom: '8px' }}>¿Cómo funciona?</p>
              <ol style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <li style={{ fontSize: '13px', color: '#555' }}>Realizá el pago por SINPE al <strong>8888-0000</strong> o por transferencia bancaria</li>
                <li style={{ fontSize: '13px', color: '#555' }}>Enviá el comprobante + nombre de tu negocio a <strong>hola@encuentraemprendedor.cr</strong></li>
                <li style={{ fontSize: '13px', color: '#555' }}>Revisamos tu negocio en un plazo de 2-3 días hábiles</li>
                <li style={{ fontSize: '13px', color: '#555' }}>Si cumple los requisitos, recibís la insignia ✓ en tu perfil</li>
              </ol>
            </div>

            <div style={{ background: '#fef3c7', borderRadius: '10px', padding: '10px 14px', fontSize: '12px', color: '#92400e', marginBottom: '1.25rem' }}>
              ⚠️ La verificación no es automática. Nos reservamos el derecho de rechazar negocios que no cumplan con nuestros términos. En caso de rechazo, el pago no es reembolsable.
            </div>

            <div className="btn-row">
              <button className="btn-secondary" onClick={() => setModalVerif(false)}>Cerrar</button>
              <button className="btn-primary" onClick={() => { setModalVerif(false); setModalSinpe('Verificación') }}>
                Pagar {formatColones(2500)}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="legal-header">
        <button className="btn-volver" onClick={onVolver}>{'← Volver'}</button>
        <div className="legal-hero">
          <span style={{ fontSize: '2.5rem' }}>🚀</span>
          <h1>Planes y membresías</h1>
          <p>Empezá gratis y crecé cuando estés listo</p>
        </div>
      </div>

      {/* Planes */}
      <div className="planes-grid">
        {PLANES.map(plan => (
          <div
            key={plan.id}
            className={`plan-card ${plan.id === 'emprendedor' ? 'plan-card--destacado' : ''}`}
          >
            {plan.badge && (
              <div className="plan-badge">{plan.badge}</div>
            )}

            <div className={`plan-header plan-header--${plan.color}`}>
              <p className="plan-nombre">{plan.nombre}</p>
              <div className="plan-precio">
                {plan.precio === 0
                  ? <span className="plan-monto">Gratis</span>
                  : <>
                      <span className="plan-monto">{formatColones(plan.precio)}</span>
                      <span className="plan-periodo">{plan.periodo}</span>
                    </>
                }
              </div>
              <p className="plan-desc">{plan.descripcion}</p>
            </div>

            <div className="plan-funciones">
              {plan.funciones.map((f, i) => (
                <div key={i} className="plan-funcion">
                  <span className={`plan-check ${f.incluido ? 'plan-check--si' : 'plan-check--no'}`}>
                    {f.incluido ? '✓' : '✕'}
                  </span>
                  <span style={{ fontSize: '13px', color: f.incluido ? 'var(--text)' : 'var(--muted)', textDecoration: f.incluido ? 'none' : 'none' }}>
                    {f.texto}
                  </span>
                </div>
              ))}
            </div>

            <div style={{ padding: '0 1.25rem 1.25rem' }}>
              {plan.id === 'gratis'
                ? <button className="btn-secondary" style={{ width: '100%' }} onClick={() => onNavegar('registro')}>
                    {plan.cta}
                  </button>
                : <button className="btn-primary" style={{ width: '100%' }} onClick={() => setModalSinpe(plan.nombre)}>
                    {plan.cta}
                  </button>
              }
            </div>
          </div>
        ))}
      </div>

      {/* Extras */}
      <div style={{ marginTop: '3rem' }}>
        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.4rem', marginBottom: '.5rem', textAlign: 'center' }}>
          Pagos únicos
        </h2>
        <p style={{ fontSize: '13px', color: 'var(--muted)', textAlign: 'center', marginBottom: '1.5rem' }}>
          Funciones que pagás una sola vez, sin suscripción
        </p>
        <div className="extras-grid">
          {EXTRAS.map((e, i) => (
            <div key={i} className="extra-card">
              <div className="extra-info">
                <p className="extra-nombre">{e.nombre}</p>
                <p className="extra-desc">{e.descripcion}</p>
              </div>
              <div className="extra-precio-wrap">
                <p className="extra-precio">{formatColones(e.precio)}</p>
                <button
                  className="btn-primary"
                  style={{ fontSize: '12px', padding: '6px 16px' }}
                  onClick={() => e.nombre.includes('Verificación') ? setModalVerif(true) : setModalSinpe(e.nombre)}
                >
                  Adquirir
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Nota legal */}
      <div className="legal-aviso" style={{ marginTop: '2rem' }}>
        💡 <strong>Importante:</strong> Los pagos se procesan manualmente. Una vez realizado el pago enviá tu comprobante a <strong>hola@encuentraemprendedor.cr</strong>. La activación puede tardar hasta 24 horas hábiles. No se realizan reembolsos salvo en casos donde el servicio no haya sido activado.
      </div>

    </div>
  )
}