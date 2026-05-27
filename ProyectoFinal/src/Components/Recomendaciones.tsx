import { useEffect } from 'react';
import { useGrafo } from '../Hooks/UseGrafo';
import type { Cancion } from '../Interface/Canciones';
import '../style/recomendaciones.scss';

interface RecomendacionesProps {
  cancionActual: Cancion | null;
  todasLasCanciones: Cancion[];
  onSeleccionarCancion: (cancion: Cancion) => void;
}

export const Recomendaciones = ({ cancionActual, todasLasCanciones, onSeleccionarCancion }: RecomendacionesProps) => {
  const { recomendaciones, obtenerRecomendacionesProfundas, inicializarConCanciones } = useGrafo();

  useEffect(() => {
    if (todasLasCanciones.length > 0) {
      const relaciones: [string, string][] = [];

      for (let i = 0; i < todasLasCanciones.length; i++) {
        for (let j = i + 1; j < todasLasCanciones.length; j++) {
          const cancionA = todasLasCanciones[i];
          const cancionB = todasLasCanciones[j];

          if (cancionA.artista === cancionB.artista) {
            relaciones.push([cancionA.id, cancionB.id]);
          }
        }
      }

      inicializarConCanciones(todasLasCanciones, relaciones);
    }
  }, [todasLasCanciones, inicializarConCanciones]);

  useEffect(() => {
    if (cancionActual) {
      obtenerRecomendacionesProfundas(cancionActual.id, 2, 5);
    }
  }, [cancionActual, obtenerRecomendacionesProfundas]);

  if (!cancionActual) {
    return (
      <div className="recomendaciones-container">
        <h3>🎵 Canciones Relacionadas</h3>
        <p className="placeholder">Selecciona una canción para ver recomendaciones</p>
      </div>
    );
  }

  return (
    <div className="recomendaciones-container">
      <h3>Canciones Relacionadas</h3>
      <p className="basado-en">Basado en: {cancionActual.titulo} - {cancionActual.artista}</p>

      {recomendaciones.length === 0 && (
        <p className="sin-recomendaciones">No hay recomendaciones disponibles</p>
      )}

      <div className="recomendaciones-grid">
        {recomendaciones.map((rec) => (
          <div
            key={rec.cancion.id}
            className="recomendacion-tarjeta"
            onClick={() => onSeleccionarCancion(rec.cancion)}
          >
            <div className="tarjeta-contenido">
              <h4 className="cancion-titulo">{rec.cancion.titulo}</h4>
              <p className="cancion-artista">{rec.cancion.artista}</p>
              <div className="cancion-meta">
                <span className="popularidad-badge">
                    {rec.cancion.popularidad}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};