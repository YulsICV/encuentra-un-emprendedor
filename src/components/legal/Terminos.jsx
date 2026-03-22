// src/components/legal/Terminos.jsx

export default function Terminos({ onVolver }) {
  return (
    <div className="legal-page">
      <div className="legal-header">
        <button className="btn-volver" onClick={onVolver}>{'← Volver'}</button>
        <div className="legal-hero">
          <span style={{ fontSize: '2.5rem' }}>📋</span>
          <h1>Términos y condiciones</h1>
          <p>Última actualización: marzo 2026</p>
        </div>
      </div>

      <div className="legal-contenido legal-texto">

        <div className="legal-seccion">
          <h2>1. Aceptación de los términos</h2>
          <p>Al acceder y usar la plataforma <strong>Encuentra un Emprendedor</strong>, aceptás cumplir con estos Términos y Condiciones. Si no estás de acuerdo, te pedimos que no uses la plataforma.</p>
        </div>

        <div className="legal-seccion">
          <h2>2. Descripción del servicio</h2>
          <p>Encuentra un Emprendedor es una <strong>plataforma intermediaria</strong> que conecta emprendedores con potenciales clientes en Costa Rica. La plataforma facilita el contacto y la comunicación entre las partes, pero <strong>no participa directamente en las transacciones comerciales</strong>.</p>
        </div>

        <div className="legal-seccion">
          <h2>3. Responsabilidad del emprendedor</h2>
          <p>Los emprendedores registrados son <strong>únicos responsables</strong> de:</p>
          <ul>
            <li>La veracidad de la información publicada en su perfil</li>
            <li>La calidad y entrega de sus productos o servicios</li>
            <li>El cumplimiento de las leyes comerciales y fiscales de Costa Rica</li>
            <li>La coordinación y recepción de pagos con sus clientes</li>
            <li>Cualquier disputa o inconveniente con sus clientes</li>
          </ul>
        </div>

        <div className="legal-seccion">
          <h2>4. Responsabilidad del cliente</h2>
          <p>Los clientes son responsables de:</p>
          <ul>
            <li>Verificar la información del emprendedor antes de realizar un pedido</li>
            <li>Revisar las reseñas y calificaciones disponibles</li>
            <li>Coordinar directamente con el emprendedor los detalles del pedido</li>
            <li>Proveer información veraz al registrarse</li>
          </ul>
        </div>

        <div className="legal-seccion">
          <h2>5. Limitación de responsabilidad de la plataforma</h2>
          <p>Encuentra un Emprendedor <strong>no se hace responsable</strong> por:</p>
          <ul>
            <li>La calidad, seguridad o legalidad de los productos o servicios ofrecidos</li>
            <li>El incumplimiento de pedidos por parte de emprendedores</li>
            <li>Pérdidas económicas derivadas de transacciones entre usuarios</li>
            <li>Disputas entre emprendedores y clientes</li>
            <li>Información falsa proporcionada por los usuarios</li>
          </ul>
        </div>

        <div className="legal-seccion">
          <h2>6. Pagos</h2>
          <p>La plataforma <strong>no procesa pagos</strong>. Todas las transacciones económicas se realizan directamente entre el emprendedor y el cliente, mediante los métodos acordados entre ellos (SINPE Móvil, efectivo, transferencia bancaria, etc.).</p>
        </div>

        <div className="legal-seccion">
          <h2>7. Conducta prohibida</h2>
          <p>Está prohibido:</p>
          <ul>
            <li>Publicar información falsa o engañosa</li>
            <li>Usar la plataforma para actividades ilegales</li>
            <li>Acosar o amenazar a otros usuarios</li>
            <li>Crear cuentas falsas o suplantar identidades</li>
            <li>Publicar contenido ofensivo, discriminatorio o inapropiado</li>
          </ul>
        </div>

        <div className="legal-seccion">
          <h2>8. Suspensión de cuentas</h2>
          <p>Nos reservamos el derecho de suspender o eliminar cuentas que violen estos términos, sin previo aviso y sin responsabilidad de nuestra parte.</p>
        </div>

        <div className="legal-seccion">
          <h2>9. Modificaciones</h2>
          <p>Podemos modificar estos términos en cualquier momento. Los cambios entrarán en vigor al ser publicados en la plataforma. El uso continuado implica la aceptación de los nuevos términos.</p>
        </div>

        <div className="legal-seccion">
          <h2>10. Contacto</h2>
          <p>Para consultas sobre estos términos: <strong>hola@encuentraemprendedor.cr</strong></p>
        </div>

      </div>
    </div>
  )
}