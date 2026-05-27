import type { Cancion } from '../Interface/Canciones';
import '../style/VCanciones.scss';

interface TarjetaCancionProps {
  cancion: Cancion;
  onReproducir?: (cancion: Cancion) => void;
  tamanio?: 'pequeno' | 'mediano' | 'grande';
}

export const TarjetaCancion = ({ cancion, onReproducir, tamanio = 'mediano' }: TarjetaCancionProps) => {
  return (
    <div className={`tarjeta-cancion tarjeta-cancion--${tamanio}`}>
      <div className="tarjeta-cancion__info">
        <h3 className="tarjeta-cancion__titulo">{cancion.titulo}</h3>
        <p className="tarjeta-cancion__artista">{cancion.artista}</p>
        <div className="tarjeta-cancion__estadisticas">
          <span className="popularidad">{cancion.popularidad.toLocaleString()}</span>
        </div>
      </div>
      {onReproducir && (
        <button className="tarjeta-cancion__reproducir" onClick={() => onReproducir(cancion)}>
          ▶
        </button>
      )}
    </div>
  );
};