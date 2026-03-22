// src/App.jsx
import { useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Sectores from './components/Sectores'
import OfertasDelDia from './components/OfertasDelDia'
import Emprendedores from './components/Emprendedores'
import SobreNosotros from './components/SobreNosotros'
import Footer from './components/Footer'
import Registro from './components/Registro'
import Login from './components/Login'
import Dashboard from './components/dashboard/Dashboard'
import PerfilEmprendedor from './components/PerfilEmprendedor'

export default function App() {
  const navigate                          = useNavigate()
  const [usuarioActivo, setUsuarioActivo] = useState(null)
  const [busqueda, setBusqueda]           = useState('')

  const handleNavegar = (destino) => {
    if (destino === 'registro')  { navigate('/registro'); return }
    if (destino === 'dashboard') { navigate('/login');    return }
    if (destino === 'login')     { navigate('/login');    return }
    navigate('/')
    setTimeout(() => {
      const el = document.getElementById(destino)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }, 50)
  }

  const handleEntrar = (usuario) => {
    setUsuarioActivo(usuario)
    navigate('/dashboard')
    window.scrollTo({ top: 0 })
  }

  const handleSalir = () => {
    setUsuarioActivo(null)
    navigate('/')
  }

  return (
    <Routes>

      <Route path="/" element={
        <>
          <Navbar seccionActiva="inicio" onNavegar={handleNavegar} />
          <div id="inicio">
            <Hero busqueda={busqueda} onBuscar={setBusqueda} onNavegar={handleNavegar} />
          </div>
          <div id="sectores"><Sectores /></div>
          <div id="ofertas"><OfertasDelDia busqueda={busqueda} /></div>
          <div id="emprendedores"><Emprendedores busqueda={busqueda} /></div>
          <div id="sobre-nosotros"><SobreNosotros /></div>
          <Footer onNavegar={handleNavegar} />
        </>
      } />

      <Route path="/login" element={
        <>
          <Navbar seccionActiva="" onNavegar={handleNavegar} />
          <Login
            onEntrar={handleEntrar}
            onVolver={() => navigate('/')}
            onRegistro={() => navigate('/registro')}
          />
        </>
      } />

      <Route path="/registro" element={
        <>
          <Navbar seccionActiva="" onNavegar={handleNavegar} />
          <Registro onVolver={() => navigate('/')} />
        </>
      } />

      <Route path="/dashboard" element={
        usuarioActivo
          ? <>
              <Navbar seccionActiva="" onNavegar={handleNavegar} />
              <Dashboard usuario={usuarioActivo} onSalir={handleSalir} />
            </>
          : <RedirigirLogin onIr={() => navigate('/login')} />
      } />

      <Route path="/emprendedor/:id" element={
        <>
          <Navbar seccionActiva="" onNavegar={handleNavegar} />
          <PerfilEmprendedor onVolver={() => navigate('/')} />
        </>
      } />

      <Route path="*" element={<PaginaNoEncontrada onVolver={() => navigate('/')} />} />

    </Routes>
  )
}

function RedirigirLogin({ onIr }) {
  return (
    <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
      <p style={{ fontSize: '2rem', marginBottom: '1rem' }}>🔒</p>
      <h2 style={{ fontFamily: 'Playfair Display, serif', marginBottom: '.5rem' }}>
        Acceso restringido
      </h2>
      <p style={{ color: 'var(--muted)', marginBottom: '1.5rem', fontSize: '14px' }}>
        Necesitás iniciar sesión para acceder al panel.
      </p>
      <button className="btn-primary" onClick={onIr}>Ir al login</button>
    </div>
  )
}

function PaginaNoEncontrada({ onVolver }) {
  return (
    <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
      <p style={{ fontSize: '3rem', marginBottom: '1rem' }}>🌱</p>
      <h2 style={{ fontFamily: 'Playfair Display, serif', marginBottom: '.5rem' }}>
        Página no encontrada
      </h2>
      <p style={{ color: 'var(--muted)', marginBottom: '1.5rem', fontSize: '14px' }}>
        La página que buscás no existe.
      </p>
      <button className="btn-primary" onClick={onVolver}>Volver al inicio</button>
    </div>
  )
}