
const STATS = [
  { icono: '🛒', label: 'Pedidos este mes',  valor: 34,        color: 'mint'    },
  { icono: '👁️', label: 'Visitas al perfil', valor: 218,       color: 'sky'     },
  { icono: '💰', label: 'Ingresos del mes',  valor: '₡284,500', color: 'peach'  },
  { icono: '⭐', label: 'Calificación',      valor: '4.9 / 5',  color: 'lavender'},
]

const ACTIVIDAD = [
  { texto: '📦 Nuevo pedido de Ana Mora',        tiempo: 'hace 5 min'  },
  { texto: '⭐ Nueva reseña de 5 estrellas',      tiempo: 'hace 1 hora' },
  { texto: '👁️ 12 personas vieron tu perfil',    tiempo: 'hoy'         },
  { texto: '🔥 Tu oferta expira en 3 horas',      tiempo: 'hoy'         },
  { texto: '📦 Pedido #023 marcado como entregado', tiempo: 'ayer'      },
]

export default function DashResumen() {
  return (
    <div className="dash-seccion">
      <h2 className="dash-titulo">Resumen del mes</h2>

      {/* Tarjetas de stats */}
      <div className="stats-grid">
        {STATS.map((s, i) => (
          <div key={i} className={`stat-card stat-card--${s.color}`}>
            <span className="stat-icono">{s.icono}</span>
            <p className="stat-valor">{s.valor}</p>
            <p className="stat-label">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Actividad reciente */}
      <h3 className="dash-subtitulo">Actividad reciente</h3>
      <div className="actividad-lista">
        {ACTIVIDAD.map((a, i) => (
          <div key={i} className="actividad-item">
            <p className="actividad-texto">{a.texto}</p>
            <span className="actividad-tiempo">{a.tiempo}</span>
          </div>
        ))}
      </div>
    </div>
  )
}