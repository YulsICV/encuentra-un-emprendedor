// src/components/legal/CentroAyuda.jsx

const FAQS = [
  {
    categoria: '🛒 Pedidos',
    preguntas: [
      {
        q: '¿Cómo hago un pedido?',
        a: 'Explorá los emprendedores, entrá a su perfil, seleccioná el producto y hacé clic en "Pedir". Si no tenés cuenta te pedimos registrarte rápido — solo nombre, correo y teléfono.'
      },
      {
        q: '¿Puedo cancelar un pedido?',
        a: 'Podés cancelar un pedido mientras esté en estado "Pendiente". Una vez confirmado por el emprendedor, debés contactarlo directamente para coordinarlo.'
      },
      {
        q: '¿Cómo sé el estado de mi pedido?',
        a: 'Entrá a tu cuenta y en "Mis pedidos" verás el estado actualizado: Pendiente → Confirmado → En preparación → En camino → Entregado.'
      },
      {
        q: '¿La plataforma garantiza la entrega?',
        a: 'Encuentra un Emprendedor es una plataforma intermediaria. Los pedidos se coordinan directamente entre vos y el emprendedor. Te recomendamos revisar las reseñas antes de comprar.'
      },
    ]
  },
  {
    categoria: '🌱 Para emprendedores',
    preguntas: [
      {
        q: '¿Cuánto cuesta registrarme?',
       a: 'El registro es completamente gratuito. Con el plan gratis podés publicar hasta 5 productos y 1 oferta del día. Para funciones avanzadas como aparecer primero en búsquedas, estadísticas o la insignia de verificado, contamos con planes de membresía desde ₡4.990/mes.'
      },
      {
        q: '¿Cómo publico una oferta del día?',
        a: 'Entrá a tu panel, seleccioná "Ofertas" y hacé clic en "+ Nueva oferta". Indicá el producto, precio original y porcentaje de descuento.'
      },
      {
        q: '¿Cómo recibo los pagos?',
        a: 'Los pagos se coordinan directamente con tus clientes según los métodos que configurés en tu perfil (SINPE, tarjeta, efectivo, etc.). La plataforma no procesa pagos.'
      },
      {
        q: '¿Puedo tener más de un negocio?',
        a: 'Por ahora cada cuenta está asociada a un negocio. Si tenés varios emprendimientos, podés crear una cuenta separada para cada uno.'
      },
    ]
  },
  {
    categoria: '👤 Cuenta y datos',
    preguntas: [
      {
        q: '¿Cómo cambio mis datos?',
        a: 'Entrá a tu cuenta, seleccioná "Mis datos" y editá la información que necesitás. Los cambios se guardan inmediatamente.'
      },
      {
        q: '¿Olvidé mi contraseña, qué hago?',
        a: 'Por ahora contactanos por correo a hola@encuentraemprendedor.cr y te ayudamos a recuperar el acceso.'
      },
      {
        q: '¿Puedo eliminar mi cuenta?',
        a: 'Sí. Escribinos a hola@encuentraemprendedor.cr solicitando la eliminación y lo procesamos en un plazo de 5 días hábiles.'
      },
    ]
  },
  {
    categoria: '📞 Contacto',
    preguntas: [
      {
        q: '¿Cómo contacto al soporte?',
        a: 'Podés escribirnos a hola@encuentraemprendedor.cr o por WhatsApp al +506 8888-0000. Atendemos lunes a viernes de 8am a 6pm.'
      },
      {
        q: '¿Qué hago si tengo un problema con un emprendedor?',
        a: 'Primero intentá resolverlo directamente con el emprendedor. Si no lográs una solución, escribinos y revisamos el caso.'
      },
    ]
  },
]

export default function CentroAyuda({ onVolver }) {
  const [abierto, setAbierto] = useState(null)

  const togglePregunta = (key) => {
    setAbierto(prev => prev === key ? null : key)
  }

  return (
    <div className="legal-page">
      <div className="legal-header">
        <button className="btn-volver" onClick={onVolver}>{'← Volver'}</button>
        <div className="legal-hero">
          <span style={{ fontSize: '2.5rem' }}>🤝</span>
          <h1>Centro de ayuda</h1>
          <p>Encontrá respuestas a las preguntas más frecuentes</p>
        </div>
      </div>

      <div className="legal-contenido">
        {FAQS.map((cat, ci) => (
          <div key={ci} className="faq-categoria">
            <h2 className="faq-categoria-titulo">{cat.categoria}</h2>
            {cat.preguntas.map((faq, pi) => {
              const key = `${ci}-${pi}`
              return (
                <div
                  key={pi}
                  className={`faq-item ${abierto === key ? 'faq-item--abierto' : ''}`}
                >
                  <button
                    className="faq-pregunta"
                    onClick={() => togglePregunta(key)}
                  >
                    <span>{faq.q}</span>
                    <span className="faq-icono">{abierto === key ? '−' : '+'}</span>
                  </button>
                  {abierto === key && (
                    <p className="faq-respuesta">{faq.a}</p>
                  )}
                </div>
              )
            })}
          </div>
        ))}

        {/* Contacto */}
        <div className="ayuda-contacto">
          <h3>¿No encontraste lo que buscabas?</h3>
          <p>Escribinos y te ayudamos personalmente</p>
          <div className="ayuda-contacto-btns">
            <a href="mailto:hola@encuentraemprendedor.cr" className="btn-primary">
              📧 Escribir al soporte
            </a>
            <a href="https://wa.me/50688880000" target="_blank" rel="noreferrer" className="btn-whatsapp">
              💬 WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

import { useState } from 'react'