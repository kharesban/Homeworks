import { useEffect, useState } from "react";
import { LinkedList } from "./linkedList";
import type { Paciente } from "./Pacientes";
import { NodeP } from "./NodeP";
import { DoubleLinkedList } from "./DobleLListH";
import { NodeH } from "./NodeH";

interface Props {
    losPacientes: LinkedList
    historial: DoubleLinkedList

}

export function MostrarPacientes({ losPacientes, historial }: Props) {
    const [pacienteActual, setPaciente] = useState<Paciente | null>(null);
    const [nodoActual, setNodoActual] = useState<NodeP | null>(null);
    const [nodoHistorial, setNodoHistorial] = useState<NodeH | null>(null);

    useEffect(() => {
        if (losPacientes && losPacientes.head && !nodoActual) {
            setNodoActual(losPacientes.head);
            setPaciente(losPacientes.head.value);
        }

 
         if (historial.tail && !nodoHistorial) {
            setNodoHistorial(historial.tail);
        }

    }, [losPacientes, nodoActual]);

    const nextPaciente = () => {
        if (nodoActual?.next) {
            setNodoActual(nodoActual.next);
            setPaciente(nodoActual.next.value);
        } else {
            setNodoActual(null);
            setPaciente(null);
        }
    };

    const atenderPaciente = () => {
        if (!pacienteActual) {
            return;
        }
         const pacienteOriginal = pacienteActual;
          const pacienteConMedico = {
            id: pacienteActual.id,
            nombre: pacienteActual.nombre
        };

        losPacientes.remove(pacienteOriginal);
        historial.append(pacienteConMedico);
        

         setNodoHistorial(historial.tail);

        nextPaciente()

        if (losPacientes.head === null) {
            alert(" Todos los pacientes han sido atendidos. Fin de jornada >:)");
        }

    };


      const historialAnt = () => {
        if (nodoHistorial?.prev) {
            setNodoHistorial(nodoHistorial.prev);
        }
    };

    const historialSig = () => {
        if (nodoHistorial?.next) {
            setNodoHistorial(nodoHistorial.next);
        }
    };


    return (
        <>
            <h2>SURA</h2>
            <h3>Sala de Espera</h3>
            <h4>Pasar a consultorio {pacienteActual?.nombre} con id {pacienteActual?.id}</h4>
            <button onClick={atenderPaciente}>Siguiente Paciente</button>
            
            <div>
                <h3>Historial</h3>
                <button onClick={historialAnt}>Anterior</button>
                <button onClick={historialSig}>Siguiente</button>
                
                    <h2>{nodoHistorial?.value.nombre} id:{nodoHistorial?.value.id}</h2>
                    
            </div>
        </>
    );
}