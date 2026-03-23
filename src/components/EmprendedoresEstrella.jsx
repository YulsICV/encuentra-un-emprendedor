import { useNavigate } from 'react-router-dom'
import { EMPRENDEDORES } from '../data/emprendedores'

export default function EmprendedoresEstrella() {
    const navigate = useNavigate()
    const estrellas = EMPRENDEDORES.filter(e => e.estrella)

    if (estrellas.length === 0) return null

    // Duplicamos varias veces para que la cinta sea continua sin saltos
    const cinta = [...estrellas, ...estrellas, ...estrellas, ...estrellas]

    return (
        <section className="ee-section">

            {/* Encabezado */}
            <div className="ee-header">
                <div className="ee-badge-titulo">
                    <span>⭐</span>
                    <h2 className="ee-titulo">Emprendedores Estrella</h2>
                    <span>⭐</span>
                </div>
            </div>

            {/* Cinta infinita */}
            <div className="ee-cinta-wrap">
                {/* Degradados en los bordes para efecto fade */}
                <div className="ee-fade ee-fade--izq" />
                <div className="ee-fade ee-fade--der" />

                <div className="ee-cinta">
                    {cinta.map((emp, i) => (
                        <button
                            key={`${emp.id}-${i}`}
                            className="ee-card"
                            onClick={() => navigate(`/emprendedor/${emp.id}`)}
                            aria-label={`Ver perfil de ${emp.nombre}`}
                        >
                            <div className="ee-card-avatar">{emp.avatar}</div>
                            <div className="ee-card-info">
                                <p className="ee-card-nombre">{emp.nombre}</p>
                                <p className="ee-card-negocio">{emp.negocio}</p>
                                <div className="ee-card-meta">
                                    <span className="ee-card-sector">{emp.sector}</span>
                                    <span className="ee-card-estrellas">
                                        ★ {emp.estrellas.toFixed(1)}
                                    </span>
                                </div>
                            </div>
                            <span className="ee-card-insignia">⭐</span>
                        </button>
                    ))}
                </div>
            </div>
        </section>
    )
}