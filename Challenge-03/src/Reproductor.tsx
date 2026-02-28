import { useState } from "react";
import type { LinkedListM } from "./LinkedListM";
import type { Cancion } from "./Cancion";

interface Props{
   playlist?:LinkedListM
}

export function MostrarCancion({ playlist }: Props) {
    const [posicionActual, setPosicionActual] = useState<number>(0);
    const [cancionActual, setCancionActual] = useState<Cancion | null>(() => {
        // pregunto si existe una playlist y si hay un head para ver si hay ua primera cacion
        return playlist?.head ? playlist.head.value : null;
    });

      const nextCancion = () => {
        if (!playlist?.head) return; //preguntamos si existe una playlist y es diferente a null (!)

        
        let nuevaPosicion = posicionActual + 1;

        // Si llegó al final (tail), volver a la primera (head)
        if (nuevaPosicion >= playlist.length) {
            nuevaPosicion = 0;
        }

        // Obtener la canción en la nueva posición
        let current = playlist.head;
        let contador = 0;

        while (contador < nuevaPosicion && current) {
            current = current.next!;
            contador++;
        }

        if (current) {
            setCancionActual(current.value);
            setPosicionActual(nuevaPosicion);
        }
    };

     return (
        <div>
            <h2>{cancionActual?.nombre || "Sin canción"}</h2>
            <p>{cancionActual?.artista || ""}</p>
            <button onClick={nextCancion}>Siguiente</button>
        </div>
     );
}
