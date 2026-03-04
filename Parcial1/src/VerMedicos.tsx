import { useEffect, useState } from "react";
import type { ListCircuMed } from "./ListCircularMed";
import type { Medico } from "./Medico";

interface Props {
  medicos: ListCircuMed;
  onMedicoChange?: (medico: Medico | null) => void;
}


export function VerMedicos({ medicos,onMedicoChange }: Props) {
  const [medicoActual, setMedicoActual] = useState<Medico | null>(null);



  useEffect(() => {
    if (medicos.head) {
        setMedicoActual(medicos.head.value);
    }
  }, []);


 useEffect(() => {
    if (onMedicoChange) {
      onMedicoChange(medicoActual);
    }
  }, [medicoActual]);

  useEffect(() => {
    const intervalo = setInterval(() => {
      if (medicos.head && medicoActual) {
        let current = medicos.head;
        
        for (let i = 0; i < medicos.length; i++) {
          if (current.value.nombre === medicoActual.nombre) {
            setMedicoActual(current.next!.value);
            break;
          }
          current = current.next!;
        }
      }
    }, 10000);

    return () => clearInterval(intervalo);
  }, [medicoActual]);


  return (
    <div>
      <h2> Médicos</h2>
        <div>
          <h1>{medicoActual?.nombre}</h1>
        </div>
    </div>
  );
}