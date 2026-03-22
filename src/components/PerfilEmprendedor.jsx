// src/components/PerfilEmprendedor.jsx
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { EMPRENDEDORES } from '../data/emprendedores'

function calcularPrecio(original, descuento) {
    return Math.round(original * (1 - descuento / 100))
}

function formatColones(n) {
    return '₡' + n.toLocaleString('es-CR')
}

function TabProductos({ productos }) {
    return (
        <div className="tab-grid">
            {productos.map(p => (
                <div key={p.id} className={`producto-card ${!p.disponible ? 'producto-card--agotado' : ''}`}>
                    <div className="producto-emoji">{p.emoji}</div>
                    <p className="producto-nombre">{p.nombre}</p>
                    <p className="producto-precio">{formatColones(p.precio)}</p>
                    <button className="btn-pedir" disabled={!p.disponible}>
                        {p.disponible ? 'Pedir' : 'Agotado'}
                    </button>
                </div>
            ))}
        </div>
    )
}

function TabOfertas({ ofertas }) {
    return (
        <div className="tab-grid">
            {ofertas.map(o => (
                <div key={o.id} className="oferta-card">
                    <div className="oferta-img oferta-img--mint">
                        <span>{o.emoji}</span>
                        <span className="badge-descuento">-{o.descuento}%</span>
                    </div>
                    <div className="oferta-body">
                        <p className="oferta-titulo">{o.nombre}</p>
                        <div className="oferta-footer">
                            <div className="oferta-precios">
                                <span className="precio-nuevo">
                                    {formatColones(calcularPrecio(o.original, o.descuento))}
                                </span>
                                <span className="precio-viejo">{formatColones(o.original)}</span>
                            </div>
                            <button className="btn-pedir">Pedir</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

function TabReseñas({ reseñas, estrellas, total }) {
    return (
        <div className="reseñas-wrap">
            <div className="reseñas-resumen">
                <p className="reseñas-numero">{estrellas}</p>
                <p className="reseñas-estrellas">{'★'.repeat(Math.round(estrellas))}</p>
                <p className="reseñas-total">{total} reseñas</p>
            </div>
            <div className="reseñas-lista">
                {reseñas.map(r => (
                    <div key={r.id} className="reseña-item">
                        <div className="reseña-header">
                            <div className="reseña-avatar">{r.nombre.charAt(0)}</div>
                            <div>
                                <p className="reseña-nombre">{r.nombre}</p>
                                <p className="reseña-estrellas">{'★'.repeat(r.estrellas)}</p>
                            </div>
                            <span className="reseña-fecha">{r.fecha}</span>
                        </div>
                        <p className="reseña-comentario">{r.comentario}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

function TabChat({ negocio, avatar }) {
    const [mensajes, setMensajes] = useState([
        { id: 1, de: 'negocio', texto: `¡Hola! Soy ${negocio}. ¿En qué te puedo ayudar? 😊` }
    ])
    const [texto, setTexto] = useState('')

    const enviar = () => {
        if (!texto.trim()) return
        const nuevoMensaje = { id: Date.now(), de: 'cliente', texto }
        setMensajes(prev => [...prev, nuevoMensaje])
        setTexto('')
        setTimeout(() => {
            setMensajes(prev => [...prev, {
                id: Date.now() + 1,
                de: 'negocio',
                texto: '¡Gracias por tu mensaje! Te respondo en breve 🌱'
            }])
        }, 1000)
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            enviar()
        }
    }

    return (
        <div className="chat-wrap">
            <div className="chat-header">
                <div className="chat-avatar">{avatar}</div>
                <div>
                    <p className="chat-nombre">{negocio}</p>
                    <p className="chat-estado">🟢 En línea</p>
                </div>
            </div>
            <div className="chat-mensajes">
                {mensajes.map(m => (
                    <div
                        key={m.id}
                        className={`chat-burbuja ${m.de === 'cliente' ? 'chat-burbuja--cliente' : 'chat-burbuja--negocio'}`}
                    >
                        {m.texto}
                    </div>
                ))}
            </div>
            <div className="chat-input">
                <input
                    type="text"
                    placeholder="Escribí tu mensaje..."
                    value={texto}
                    onChange={e => setTexto(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <button className="btn-enviar" onClick={enviar}>{'➤'}</button>
            </div>
        </div>
    )
}

export default function PerfilEmprendedor({ onVolver }) {
    const { id } = useParams()
    const [tabActiva, setTabActiva] = useState('productos')

    // Buscá el emprendedor por id de la URL
    const perfil = EMPRENDEDORES.find(e => e.id === Number(id))

    // Si no existe mostrá un mensaje
    if (!perfil) {
        return (
            <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
                <p style={{ fontSize: '2rem' }}>😕</p>
                <h2>Emprendedor no encontrado</h2>
                <button className="btn-primary" onClick={onVolver}>
                    {'← Volver'}
                </button>
            </div>
        )
    }

    const TABS = [
        { id: 'productos', label: '📦 Productos' },
        { id: 'ofertas', label: '🔥 Ofertas' },
        { id: 'reseñas', label: '⭐ Reseñas' },
        { id: 'chat', label: '💬 Chat' },
    ]

    return (
        <div className="perfil-publico">

            <div className="perfil-hero">
                <button className="btn-volver" onClick={onVolver}>{'← Volver'}</button>

                <div className="perfil-hero-content">
                    <div className="perfil-hero-avatar">{perfil.avatar}</div>
                    <div className="perfil-hero-info">
                        <h1 className="perfil-hero-nombre">{perfil.nombre}</h1>
                        <p className="perfil-hero-negocio">{perfil.negocio}</p>
                        <div className="perfil-hero-meta">
                            <span>🗂️ {perfil.sector}</span>
                            <span>📍 {perfil.provincia}</span>
                            <span>⭐ {perfil.estrellas} ({perfil.reseñas} reseñas)</span>
                        </div>
                        <div className="perfil-hero-tags">
                            {perfil.tags.map((t, i) => (
                                <span key={i} className="tag">{t}</span>
                            ))}
                        </div>
                    </div>
                </div>

                <p className="perfil-hero-desc">{perfil.descripcion}</p>

                < div className="perfil-hero-btns">
                    <a
                        className="btn-whatsapp"
                        href={`https://wa.me/${perfil.whatsapp}`}
                        target="_blank"
                        rel="noreferrer"
                    >
                        💬 WhatsApp
                    </a>
                    <button className="btn-primary" onClick={() => setTabActiva('chat')}>
                        Chat en la app
                    </button>
                </div>

                <div className="perfil-redes">
                    {perfil.instagram && <span className="red-chip">📸 {perfil.instagram}</span>}
                    {perfil.facebook && <span className="red-chip">👍 {perfil.facebook}</span>}
                    {perfil.tiktok && <span className="red-chip">🎵 {perfil.tiktok}</span>}
                </div>
            </div>

            <div className="perfil-tabs">
                {TABS.map(t => (
                    <button
                        key={t.id}
                        className={`perfil-tab ${tabActiva === t.id ? 'perfil-tab--activo' : ''}`}
                        onClick={() => setTabActiva(t.id)}
                    >
                        {t.label}
                    </button>
                ))}
            </div>

            <div className="perfil-contenido">
                {tabActiva === 'productos' && <TabProductos productos={perfil.productos} />}
                {tabActiva === 'ofertas' && <TabOfertas ofertas={perfil.ofertas} />}
                {tabActiva === 'reseñas' && <TabReseñas reseñas={perfil.reseñas_lista} estrellas={perfil.estrellas} total={perfil.reseñas} />}
                {tabActiva === 'chat' && <TabChat negocio={perfil.negocio} avatar={perfil.avatar} />}
            </div>

        </div >
    )
}