import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { LinkedListM } from './LinkedListM.tsx'
import { Cancion } from './Cancion.tsx'
import { MostrarCancion } from './Reproductor.tsx';
import { DobleLinked } from './DobleLinkedL.tsx'
import { PaginasW } from './Paginas.tsx'
import { MostrarPag } from './VerPagina.tsx'
const playlist = new LinkedListM();
const web = new DobleLinked();

const misCanciones = [
    {id: 1, nombre: "Bohemian Rhapsody", artista: "Queen"},
    {id: 2, nombre: "EnDaño", artista: "3AM"},
    {id: 3, nombre: "Turista", artista: "Bad Bunny"},
    {id: 4, nombre: "El triste", artista: "Jose Jose"},
    {id: 5, nombre: "The driver", artista: "Maneskin"},
    {id: 6, nombre: "Vida Facil", artista: "Neomai, Jeeiph"}
];


for (const cancionData of misCanciones) {
    const cancion = new Cancion(cancionData.id, cancionData.nombre, cancionData.artista);
    playlist.append(cancion);
}

const misWebs = [ 
    { nombre: "Wikipedia", url: "https://www.wikipedia.org" },
    { nombre: "Wikcionario", url: "https://es.wiktionary.org" },
    { nombre: "Wikilibros", url: "https://es.wikibooks.org" },
    { nombre: "Wikiquote", url: "https://es.wikiquote.org" },
    { nombre: "Wikisource", url: "https://es.wikisource.org" },
    { nombre: "Wikiversidad", url: "https://es.wikiversity.org" },
    { nombre: "Wikimedia", url: "https://www.wikimedia.org" },
    { nombre: "MediaWiki", url: "https://www.mediawiki.org" }
];

for (const Webs of misWebs) {
    const pagina = new PaginasW(Webs.nombre, Webs.url);
    web.append(pagina);
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App/>
    <MostrarCancion playlist={playlist}/>
    <MostrarPag web={web}/>
  </StrictMode>,
)
