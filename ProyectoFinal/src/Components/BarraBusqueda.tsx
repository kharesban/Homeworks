import { useState, useEffect, useRef } from 'react';
import { useTrie } from '../Hooks/UseTrie';
import type { Cancion } from '../Interface/Canciones';
import '../style/barraBusqueda.scss';

interface BarraBusquedaProps {
  onSeleccionarCancion: (cancion: Cancion) => void;
  onInsertarCancion?: (cancion: Cancion) => void;
  placeholder?: string;
}

export const BarraBusqueda = ({ 
  onSeleccionarCancion, 
  onInsertarCancion, 
  placeholder = "Buscar canción..." 
}: BarraBusquedaProps) => {
  const [consulta, setConsulta] = useState('');
  const [mostrarSugerencias, setMostrarSugerencias] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [nuevaCancion, setNuevaCancion] = useState({
    titulo: '',
    artista: '',
    popularidad: 0
  });
  
  const { sugerencias, obtenerSugerencias, buscarCancion, insertarCancion, listaCanciones } = useTrie();
  const inputRef = useRef<HTMLInputElement>(null);
  const sugerenciasRef = useRef<HTMLDivElement>(null);

  const mostrarListaCanciones = () => {
    console.log(" Canciones en el sistema:", listaCanciones);
  };

  useEffect(() => {
    mostrarListaCanciones();
  }, [listaCanciones]);

  useEffect(() => {
    if (consulta.length > 0) {
      obtenerSugerencias(consulta, 5);
      setMostrarSugerencias(true);
    } else {
      setMostrarSugerencias(false);
    }
  }, [consulta, obtenerSugerencias]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sugerenciasRef.current &&
        !sugerenciasRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setMostrarSugerencias(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleBuscar = () => {
    if (consulta.trim() === "") {
      alert("Por favor escribe el nombre de una canción");
      return;
    }
    
    const cancion = buscarCancion(consulta);
    
    if (cancion) {
      alert(`Canción encontrada:\n\nTítulo: ${cancion.titulo}\nArtista: ${cancion.artista}\n Popularidad: ${cancion.popularidad}`);
      onSeleccionarCancion(cancion);
    } else {
      alert(` No se encontró la canción: "${consulta}"`);
    }
    setMostrarSugerencias(false);
  };

  const handleSugerenciaClick = (cancion: Cancion) => {
    setConsulta(cancion.titulo);
    onSeleccionarCancion(cancion);
    setMostrarSugerencias(false);
  };

  const handleInsertarCancion = () => {
    if (!nuevaCancion.titulo || !nuevaCancion.artista) {
      alert("Por favor completa todos los campos");
      return;
    }

    const nueva: Cancion = {
      id: Date.now().toString(),
      titulo: nuevaCancion.titulo,
      artista: nuevaCancion.artista,
      popularidad: nuevaCancion.popularidad || 0,
    };
    insertarCancion(nueva);
    
    if (onInsertarCancion) {
      onInsertarCancion(nueva);
    }

    setNuevaCancion({ titulo: '', artista: '', popularidad: 0 });
    setMostrarModal(false);
    alert(`Canción "${nueva.titulo}" insertada correctamente`);
    
    setTimeout(() => {
      console.log("Lista actualizada:", listaCanciones);
    }, 100);
  };

  return (
    <div className="barra-busqueda-container">
      <div className="busqueda-input-wrapper">
        <input
          ref={inputRef}
          type="text"
          value={consulta}
          onChange={(e) => setConsulta(e.target.value)}
          placeholder={placeholder}
          className="busqueda-input"
        />
        <button onClick={handleBuscar} className="busqueda-button">
          Buscar
        </button>
        <button onClick={() => setMostrarModal(true)} className="agregar-button">
          Nueva Cancion
        </button>
      </div>

      {mostrarSugerencias && sugerencias.length > 0 && (
        <div ref={sugerenciasRef} className="sugerencias-dropdown">
          {sugerencias.map((cancion) => (
            <div
              key={cancion.id}
              className="sugerencia-item"
              onClick={() => handleSugerenciaClick(cancion)}
            >
              <span className="sugerencia-titulo">{cancion.titulo}</span>
              <span className="sugerencia-artista">{cancion.artista}</span>
              <span className="sugerencia-popularidad">{cancion.popularidad}</span>
            </div>
          ))}
        </div>
      )}

      {mostrarModal && (
        <div className="modal-overlay" onClick={() => setMostrarModal(false)}>
          <div className="modal-contenido" onClick={(e) => e.stopPropagation()}>
            <h3>Insertar Nueva Canción</h3>
            <div className="modal-campo">
              <label>Título:</label>
              <input
                type="text"
                value={nuevaCancion.titulo}
                onChange={(e) => setNuevaCancion({ ...nuevaCancion, titulo: e.target.value })}
                placeholder="Ej: Bohemian Rhapsody"
              />
            </div>
            <div className="modal-campo">
              <label>Artista:</label>
              <input
                type="text"
                value={nuevaCancion.artista}
                onChange={(e) => setNuevaCancion({ ...nuevaCancion, artista: e.target.value })}
                placeholder="Ej: Queen"
              />
            </div>
            <div className="modal-campo">
              <label>Popularidad inicial:</label>
              <input
                type="number"
                value={nuevaCancion.popularidad}
                onChange={(e) => setNuevaCancion({ ...nuevaCancion, popularidad: parseInt(e.target.value) || 0 })}
                placeholder="Ej: 10000"
              />
            </div>
            <div className="modal-botones">
              <button onClick={handleInsertarCancion} className="insertar-btn">Insertar</button>
              <button onClick={() => setMostrarModal(false)} className="cancelar-btn"> Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};