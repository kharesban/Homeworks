import { useState } from "react";
import type Stack from "./listado";
import type { Libro } from "./libro";

interface Props{
    pilas:Stack
}

function AgregarLibros({pilas}:Props){

    const [nombre,setNombre] = useState('');
    const [isbn,setIsbn] = useState('');
    const [autor,setAutor] = useState('');
    const [editorial,setEditorial] = useState('');

    const  ejecutar =() =>{

        const nuevoLibro: Libro = {
            nombre:nombre,
            isbn:Number(isbn),
            autor:autor,
            editorial:editorial
        };

        pilas.push(nuevoLibro);
        setNombre('');
        setIsbn('');
        setAutor('');
        setEditorial('');
        console.log(`EL libro a agregar es: ${nuevoLibro}`)
        pilas.print()


        alert("El libro se agrego exitosamente. ")

    }

        if (pilas.items.length === 0) {
            return <p>No hay libros en la pila</p>;
        }
    
        return (<>
        <input 
                type="text" 
                value={nombre}
                onChange={(e) => setNombre(e.target.value)} 
                placeholder="Ingresa el nombre del libro"
            />
            <input 
                type="number" 
                value={isbn}
                onChange={(e) => setIsbn(e.target.value)} 
                placeholder="Ingresa el isbn"
            />
            <input 
                type="text" 
                value={autor}
                onChange={(e) => setAutor(e.target.value)} 
                placeholder="Ingresa el nombre del autor"
            />
            <input 
                type="text" 
                value={editorial}
                onChange={(e) => setEditorial(e.target.value)} 
                placeholder="Ingresa el nombre de la editorial"
            />

            <button onClick={ejecutar}>agregar libro</button>

                <div>
                    <h2>Lista de Libros</h2>
                    {pilas.items.map((libro, index) => (
                        <div key={index}>
                            <h3>{libro.nombre}</h3>
                            <p>ISBN: {libro.isbn}</p>
                            <p>Autor: {libro.autor}</p>
                            <p>Editorial: {libro.editorial}</p>
                        </div>
                    ))}
                </div>
            </>
            );
        


} 
export default AgregarLibros