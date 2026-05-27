import { useEffect, useState } from 'react';
import { BarraBusqueda } from '../Components/BarraBusqueda';
import { TablaRanking } from '../Components/TablaR';
import { Recomendaciones } from '../Components/Recomendaciones';
import { useTrie } from '../Hooks/UseTrie';
import type { Cancion } from '../Interface/Canciones';
import '../style/dashboard.scss';


const cancionesIniciales: Cancion[] = [
  { id: '1', titulo: 'Bohemian Rhapsody', artista: 'Queen', popularidad: 1500000 },
  { id: '2', titulo: 'Bajo de la Piel', artista: 'MiloJ', popularidad: 250000 },
  { id: '3', titulo: 'Shape of You', artista: 'Ed Sheeran', popularidad: 30000 },
  { id: '4', titulo: 'Human Nature', artista: 'Michael Jackson', popularidad: 12000 },
  { id: '5', titulo: 'White Keys', artista: 'Dominic Fike', popularidad: 18000 },
  { id: '6', titulo: 'Bad Guy', artista: 'Billie Eilish', popularidad: 22000 },
  { id: '7', titulo: 'Rock With You', artista: 'Michael Jackson', popularidad: 20000 },
  { id: '8', titulo: 'Radio Ga Ga', artista: 'Queen', popularidad: 11000 },
  { id: '9', titulo: 'Olympo', artista: 'MiloJ', popularidad: 19000 },
  { id: '10', titulo: 'Confia', artista: 'Mayinbito', popularidad: 28000 },
];

export const DashboardPage = () => {
  const [canciones, setCanciones] = useState<Cancion[]>(cancionesIniciales);
  const [cancionActual, setCancionActual] = useState<Cancion | null>(null);
  const { insertarMultiplesCanciones, listaCanciones } = useTrie();

  useEffect(() => {
    insertarMultiplesCanciones(cancionesIniciales);
  }, []);

  useEffect(() => {
    console.log(" Canciones en el hook:", listaCanciones);
  }, [listaCanciones]);

  const incrementarPopularidad = (cancionId: string) => {
    setCanciones((prev) =>
      prev.map((cancion) =>
        cancion.id === cancionId ? { ...cancion, popularidad: cancion.popularidad + 1 } : cancion
      )
    );
  };

  const handleSeleccionarCancion = (cancion: Cancion) => {
    incrementarPopularidad(cancion.id);
    setCancionActual(cancion);
  };

  const handleInsertarCancion = (nuevaCancion: Cancion) => {
    setCanciones((prev) => [...prev, nuevaCancion]);
  };

  return (
    <div className="dashboard">
      <header className="dashboard__header">
        <h1>Spotify Educativo</h1>
        <p>Plataforma de música 100% UAO</p>
      </header>

      <main className="dashboard__main">
        <section className="dashboard__buscador">
          <h2>Buscador</h2>
          <BarraBusqueda 
            onSeleccionarCancion={handleSeleccionarCancion}
            onInsertarCancion={handleInsertarCancion}
          />
        </section>

        <section className="dashboard__contenido">
          <aside className="dashboard__ranking">
            <TablaRanking canciones={canciones} onCancionClick={handleSeleccionarCancion} />
          </aside>

          <aside className="dashboard__recomendaciones">
            <Recomendaciones 
              cancionActual={cancionActual}
              todasLasCanciones={canciones}
              onSeleccionarCancion={handleSeleccionarCancion}
            />
          </aside>
        </section>

        
      </main>
    </div>
  );
};