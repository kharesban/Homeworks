import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { LinkedListM } from './LinkedListM.tsx'
import { Cancion } from './Cancion.tsx'
import { MostrarCancion } from './Reproductor.tsx';
const playlist = new LinkedListM();

const misCanciones = [
    {id: 1, nombre: "Bohemian Rhapsody", artista: "Queen"},
    {id: 2, nombre: "EnDaño", artista: "3AM"},
    {id: 3, nombre: "Turista", artista: "Bad Bunny"},
    {id: 4, nombre: "El triste", artista: "Jose Jose"},
    {id: 5, nombre: "The driver", artista: "Maneskin"}
];

for (const cancionData of misCanciones) {
    const cancion = new Cancion(cancionData.id, cancionData.nombre, cancionData.artista);
    playlist.append(cancion);
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App/>
    <MostrarCancion playlist={playlist}/>
  </StrictMode>,
)
