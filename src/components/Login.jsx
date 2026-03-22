
import { useState } from 'react'

// Usuarios simulados — aquí vivían los registros
const USUARIOS = [
    {
        id: 1,
        nombre: 'Lucía Ramírez',
        negocio: 'Dulces de Lucía',
        email: 'lucia@correo.com',
        password: '12345678',
        avatar: '👩‍🍳',
    },
    {
        id: 2,
        nombre: 'Marcos Solano',
        negocio: 'TecnoSolano',
        email: 'marcos@correo.com',
        password: '12345678',
        avatar: '🧑‍🔧',
    },
]

export default function Login({ onEntrar, onVolver, onRegistro }) {
    const [form, setForm] = useState({ email: '', password: '' })
    const [errores, setErrores] = useState({})
    const [intento, setIntento] = useState(false)

    const handleLogin = () => {
        const e = {}
        if (!form.email.includes('@')) e.email = 'Ingresá un correo válido'
        if (form.password.length < 6) e.password = 'Mínimo 6 caracteres'

        if (Object.keys(e).length > 0) {
            setErrores(e)
            return
        }

        // Buscar usuario
        const usuario = USUARIOS.find(
            u => u.email === form.email && u.password === form.password
        )

        if (usuario) {
            setErrores({})
            onEntrar(usuario)
        } else {
            setIntento(true)
            setErrores({ general: 'Correo o contraseña incorrectos' })
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleLogin()
    }

    return (
        <div className="login-wrap">
            <div className={`login-card ${intento ? 'login-card--error' : ''}`}>

                <div className="login-logo">
                    <img src="/logo.png" alt="Logo" className="logo-img" />
                </div>

                <h2 className="login-titulo">Bienvenido/a de vuelta</h2>
                <p className="login-subtitulo">Ingresá a tu panel de emprendedor</p>

                {/* Error general */}
                {errores.general && (
                    <div className="login-error-box">
                        ⚠️ {errores.general}
                    </div>
                )}

                <div className="campo">
                    <label>Correo electrónico</label>
                    <input
                        type="email"
                        placeholder="tu@correo.com"
                        value={form.email}
                        onChange={e => {
                            setForm(p => ({ ...p, email: e.target.value }))
                            setIntento(false)
                            setErrores({})
                        }}
                        onKeyDown={handleKeyDown}
                    />
                    {errores.email && <span className="campo-error">{errores.email}</span>}
                </div>

                <div className="campo">
                    <label>Contraseña</label>
                    <input
                        type="password"
                        placeholder="Tu contraseña"
                        value={form.password}
                        onChange={e => {
                            setForm(p => ({ ...p, password: e.target.value }))
                            setIntento(false)
                            setErrores({})
                        }}
                        onKeyDown={handleKeyDown}
                    />
                    {errores.password && <span className="campo-error">{errores.password}</span>}
                </div>

                <button className="btn-primary" style={{ width: '100%' }} onClick={handleLogin}>
                    Entrar al panel
                </button>

                <div className="login-footer">
                    <p>¿No tenés cuenta?{' '}
                        <span className="login-link" onClick={onRegistro}>
                            Registrá tu negocio
                        </span>
                    </p>
                    <span className="login-link" onClick={onVolver}>
                        ← Volver al inicio
                    </span>
                </div>

                {/* Hint de usuarios de prueba */}
                <div className="login-hint">
                    <p>🧪 Usuarios de prueba:</p>
                    {USUARIOS.map(u => (
                        <p key={u.id}
                            className="login-hint-user"
                            onClick={() => setForm({ email: u.email, password: u.password })}
                        >
                            {u.avatar} {u.email} · {u.password}
                        </p>
                    ))}
                </div>

            </div>
        </div>
    )
}