import { useEffect, useState } from "react";
import type { Persona } from "./Persona";
import Queues from "./QuequeP";

const mocksPersonas: Persona[] = [
    {nombre:"John Galvis", montoRetiro:50000,fechaRetiro: new Date('2026-03-18')}
]



export interface Props{
    cola: Queues
}

function generarFecha():Date{
    const hoy = new Date();
    
    const dia = Math.floor((Math.random()* 7));
    const hora = Math.floor((Math.random()* 24));
    const minutos = Math.floor((Math.random()* 60));

    const nuevaFecha = new Date(
        hoy.getFullYear(),hoy.getMonth(),(hoy.getDate()+dia),hora,minutos
    )
    return nuevaFecha;

}


function agregarPersonas({cola}:Props){
    const [nombre,setNombre] = useState('');
    const [montoRetiro,setMontoRetiro] = useState('');
    const [personas, setPersonas] = useState<Persona[]>([]);

     useEffect(() => {
           if (cola.size() === 0) {
            mocksPersonas.forEach(p => cola.enqueue(p));
        }
            setPersonas([...cola.items]);
           
    }, []); 

     
    const ejecutarA =()=>{
        
        const nuevaPersona:Persona ={
            nombre:nombre,
            montoRetiro:Number(montoRetiro),
            fechaRetiro: generarFecha()
        }
        if(nombre === "nequi"){
            
            alert("nequi se volvio a caer, no puedes retirar. Intenta otro dia")
            setNombre('')
            setMontoRetiro('')
            return

        }else{
            cola.enqueue(nuevaPersona)
            setPersonas([...cola.items])
            setNombre('');
            setMontoRetiro('');
        }


    }
    const personasOrdenadas =[...personas].sort(
        (a,b) =>a.fechaRetiro.getTime() - b.fechaRetiro.getTime()
    )

    return(<>
     <div>
                <input placeholder="Ingrese el Nombre" value={nombre} 
                    onChange={(e) => setNombre(e.target.value)}
                />
                <input placeholder="Ingrese el monto a retirar" value={montoRetiro} 
                    onChange={(e) => setMontoRetiro(e.target.value)}
                />
                <button onClick={ejecutarA}>Agregar</button>
            </div>

             <div>
                {personasOrdenadas.map((p, index) => (
                    <div key={index}>
                        {p.nombre} - ${p.montoRetiro} - {p.fechaRetiro.toLocaleString()}
                    </div>
                ))}
            </div>
    
    </>)
    
    
}

export default agregarPersonas

