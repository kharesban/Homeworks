import { useEffect } from 'react';
import { useMaxHeap } from '../Hooks/UseMaxHeap';
import type { Cancion } from '../Interface/Canciones';
import '../style/tablaR.scss';

interface TablaRankingProps {
  canciones: Cancion[];
  onCancionClick?: (cancion: Cancion) => void;
}

export const TablaRanking = ({ canciones, onCancionClick }: TablaRankingProps) => {
  const { topCanciones, actualizarRanking } = useMaxHeap();

  useEffect(() => {
    if (canciones.length > 0) {
      actualizarRanking(canciones);
    }
  }, [canciones, actualizarRanking]);

  const obtenerIconoRanking = (index: number) => {
    switch (index) {
      case 0:
        return 'Top 1';
      case 1:
        return 'Top 2';
      case 2:
        return 'Top 3';
      default:
        return `${index + 1}`;
    }
  };

  const obtenerClaseTop = (index: number): string => {
    switch (index) {
      case 0:
        return 'top-1';
      case 1:
        return 'top-2';
      case 2:
        return 'top-3';
      default:
        return '';
    }
  };

  if (topCanciones.length === 0) {
    return (
      <div className="tabla-ranking-container">
        <h2 className="ranking-titulo">🏆 Top Canciones Más Escuchadas</h2>
        <p className="sin-canciones">Cargando canciones...</p>
      </div>
    );
  }

  return (
    <div className="tabla-ranking-container">
      <h2 className="ranking-titulo">🏆 Top Canciones Más Escuchadas</h2>
      <div className="tabla-ranking">
        <div className="ranking-header">
          <span className="rank">#</span>
          <span className="titulo">Canción</span>
          <span className="artista">Artista</span>
          <span className="popularidad">Reproducciones</span>
        </div>
        {topCanciones.map((cancion, index) => {
          const claseTop = obtenerClaseTop(index);
          console.log(`Canción ${index + 1}: ${cancion.titulo} -> Clase: ${claseTop}`);
          return (
            <div
              key={cancion.id}
              className={`ranking-fila ${claseTop}`}
              onClick={() => onCancionClick?.(cancion)}
              style={{ cursor: onCancionClick ? 'pointer' : 'default' }}
            >
              <span className="rank">{obtenerIconoRanking(index)}</span>
              <span className="titulo">{cancion.titulo}</span>
              <span className="artista">{cancion.artista}</span>
              <span className="popularidad">
                <span className="fire-icon">🔥</span>
                {cancion.popularidad.toLocaleString()}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};