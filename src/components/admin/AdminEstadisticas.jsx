// src/components/admin/AdminEstadisticas.jsx

const STATS = [
  { icono: '🌱', label: 'Emprendedores activos',    valor: 3,  color: 'mint'     },
  { icono: '👤', label: 'Clientes registrados',     valor: 2,  color: 'sky'      },
  { icono: '📦', label: 'Pedidos este mes',         valor: 12, color: 'peach'    },
  { icono: '💳', label: 'Membresías activas',       valor: 2,  color: 'lavender' },
  { icono: '✅', label: 'Verificaciones pendientes', valor: 2, color: 'amber'    },
  { icono: '⭐', label: 'Reseñas totales',          valor: 7,  color: 'mint'     },
]

const ACTIVIDAD = [
  { texto: '🌱 Nuevo emprendedor registrado: Verde Vivo CR',   tiempo: 'hace 2 horas' },
  { texto: '💳 Pago membresía Emprendedor: Marcos Solano',     tiempo: 'hace 5 horas' },
  { texto: '✅ Verificación solicitada: Dulces de Lucía',      tiempo: 'hace 1 día'   },
  { texto: '👤 Nuevo cliente registrado: Ana Mora',            tiempo: 'hace 1 día'   },
  { texto: '📦 Pedido completado #PC-001',                     tiempo: 'hace 2 días'  },
]

export default function AdminEstadisticas() {
  return (
    <div className="dash-seccion" style={{ maxWidth: '100%' }}>
      <h2 className="dash-titulo">Estadísticas generales</h2>

      <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))' }}>
        {STATS.map((s, i) => (
          <div key={i} className={`stat-card stat-card--${s.color}`}>
            <span className="stat-icono">{s.icono}</span>
            <p className="stat-valor">{s.valor}</p>
            <p className="stat-label">{s.label}</p>
          </div>
        ))}
      </div>

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