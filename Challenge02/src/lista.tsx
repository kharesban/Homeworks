import { useState } from 'react';

interface Estudiantes {
    nombre: string;
    celular: string;
}


function ListaEstudiantes({ estudiantes,onEliminar }: { 
    estudiantes: Estudiantes[], 
    onEliminar: (index: number) => void  }) {
         
    if (estudiantes.length === 0) {
        return <h3>No se encontraron alumnos 🤓</h3>;
    }
    
    return (
        <ul>
            {estudiantes.map((x,index) => (
                <li key={index}>({x.nombre}, {x.celular})  <button onClick={()=> onEliminar(index)}>X</button></li>
            ))}
        </ul>
    );
}

interface Props {
    onAgregar: (estudiante: Estudiantes) => void;
}

function AgregarE({ onAgregar }: Props) {
    const [nombre, setNombre] = useState('');
    const [celular, setCelular] = useState('');

    const CrearE = () => {
        const nuevoEstudiante: Estudiantes = {
            nombre: nombre,
            celular: celular
        };
        if(nombre.trim() !=="" && celular.trim() !==""){
             onAgregar(nuevoEstudiante); 
            setNombre('');
            setCelular('');
        }else{
             alert("Por favor completa todos los campos");
        }
        
       
    };

    return (
        <>
            <h2>Agregar Alumno</h2>
            <input
                type="text"
                placeholder="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
            />
            <input
                type="text"
                placeholder="Celular"
                value={celular}
                onChange={(e) => setCelular(e.target.value)}
            />
            <button onClick={CrearE}>Agregar</button>
        </>
    );
}


export function ListaInicial() {
    const [estudiantesN, setEstudiantes] = useState<Estudiantes[]>([
        { nombre: "Esteban Torres", celular: "3007775356" },
        { nombre: "John Galvis", celular: "3007775356" }
    ]);

    const agregarEstudiante = (nuevoEstudiante: Estudiantes) => {
        setEstudiantes([...estudiantesN, nuevoEstudiante]);
    };

    const eliminarEstudiante = (indexQuitar: number) =>{
        const estudiantesRestantes = estudiantesN.filter((_, indiceActual) => { // el _ le dice a typescript de que soy conciente que va un parametro pero no lo voy a usar
            
            if (indiceActual !== indexQuitar) {
                return true;  //estudiante queda en la lista
            } else {
                return false; // Este estudiante se va
            }
            });
        setEstudiantes(estudiantesRestantes);
    }

    return (
        <>
            <h2>Lista de alumnos</h2>
            <ListaEstudiantes estudiantes={estudiantesN}
            onEliminar={eliminarEstudiante} />
            <AgregarE onAgregar={agregarEstudiante} />
            
        </>
    );

}