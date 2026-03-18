import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AgregarLibros from './verLibros.tsx'
import './index.css'
import App from './App.tsx'
import Stack from './listado.tsx'
import type { Libro } from './libro.tsx'


function cargarMocks(pila: Stack) {
    const librosMock: Libro[] = [
        {
            nombre: "El principito",
            isbn: 9788478887194,
            autor: "Antoine de Saint-Exupéry",
            editorial: "Salamandra"
        },
        {
            nombre: "1984",
            isbn: 9780451524935,
            autor: "George Orwell",
            editorial: "Secker & Warburg"
        },
        {
            nombre: "Don Quijote de la Mancha",
            isbn: 9788420412146,
            autor: "Miguel de Cervantes",
            editorial: "Alfaguara"
        }
    ];

    librosMock.forEach(libro => {
        pila.push(libro);
    });

    pila.print();
}
    
const pila = new Stack();
cargarMocks(pila);



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <AgregarLibros pilas={pila}/>
  </StrictMode>,
)
