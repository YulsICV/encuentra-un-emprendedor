// src/components/legal/Privacidad.jsx

export default function Privacidad({ onVolver }) {
  return (
    <div className="legal-page">
      <div className="legal-header">
        <button className="btn-volver" onClick={onVolver}>{'← Volver'}</button>
        <div className="legal-hero">
          <span style={{ fontSize: '2.5rem' }}>🔒</span>
          <h1>Política de privacidad</h1>
          <p>Última actualización: marzo 2026</p>
        </div>
      </div>

      <div className="legal-contenido legal-texto">

        <div className="legal-aviso">
          ⚠️ <strong>Descargo de responsabilidad:</strong> Encuentra un Emprendedor actúa exclusivamente como plataforma intermediaria. No somos responsables de las transacciones, productos, servicios ni acuerdos entre emprendedores y clientes.
        </div>

        <div className="legal-seccion">
          <h2>1. Información que recopilamos</h2>
          <p>Recopilamos la siguiente información cuando te registrás:</p>
          <ul>
            <li><strong>Clientes:</strong> nombre, correo electrónico y número de teléfono</li>
            <li><strong>Emprendedores:</strong> nombre, correo, teléfono, nombre del negocio, sector, provincia y descripción</li>
          </ul>
        </div>

        <div className="legal-seccion">
          <h2>2. Cómo usamos tu información</h2>
          <p>Usamos tu información para:</p>
          <ul>
            <li>Crear y gestionar tu cuenta en la plataforma</li>
            <li>Facilitar la comunicación entre emprendedores y clientes</li>
            <li>Mostrarte información relevante de negocios locales</li>
            <li>Mejorar la experiencia de la plataforma</li>
          </ul>
        </div>

        <div className="legal-seccion">
          <h2>3. Compartir información</h2>
          <p><strong>No vendemos ni compartimos</strong> tu información personal con terceros con fines comerciales. La información de contacto de los emprendedores (teléfono, redes sociales) es pública porque ellos la eligieron publicar para ser contactados por clientes.</p>
        </div>

        <div className="legal-seccion">
          <h2>4. Seguridad de los datos</h2>
          <p>Implementamos medidas de seguridad para proteger tu información. Sin embargo, ningún sistema es 100% seguro. Te recomendamos usar contraseñas seguras y no compartir tus credenciales.</p>
        </div>

        <div className="legal-seccion">
          <h2>5. Tus derechos</h2>
          <p>Tenés derecho a:</p>
          <ul>
            <li>Acceder a tu información personal</li>
            <li>Corregir datos incorrectos</li>
            <li>Solicitar la eliminación de tu cuenta y datos</li>
            <li>Oponerte al uso de tu información</li>
          </ul>
          <p>Para ejercer estos derechos escribinos a <strong>hola@encuentraemprendedor.cr</strong></p>
        </div>

        <div className="legal-seccion">
          <h2>6. Cookies</h2>
          <p>La plataforma puede usar cookies para mejorar la experiencia de navegación. Podés configurar tu navegador para rechazarlas, aunque esto puede afectar algunas funcionalidades.</p>
        </div>

        <div className="legal-seccion">
          <h2>7. Descargo de responsabilidad completo</h2>
          <p>Encuentra un Emprendedor es una <strong>plataforma de conexión</strong>. En ningún caso seremos responsables por:</p>
          <ul>
            <li>Daños directos, indirectos o consecuentes derivados del uso de la plataforma</li>
            <li>Pérdidas económicas por transacciones entre usuarios</li>
            <li>Incumplimientos de emprendedores hacia sus clientes</li>
            <li>Calidad, seguridad o idoneidad de los productos o servicios</li>
            <li>Interrupciones del servicio por mantenimiento o causas técnicas</li>
          </ul>
          <p>El uso de la plataforma implica la aceptación de este descargo.</p>
        </div>

        <div className="legal-seccion">
          <h2>8. Ley aplicable</h2>
          <p>Esta política se rige por las leyes de la <strong>República de Costa Rica</strong>, incluyendo la Ley de Protección de la Persona frente al Tratamiento de sus Datos Personales (Ley 8968).</p>
        </div>

        <div className="legal-seccion">
          <h2>9. Contacto</h2>
          <p>Para consultas sobre privacidad: <strong>hola@encuentraemprendedor.cr</strong></p>
        </div>

      </div>
    </div>
  )
}