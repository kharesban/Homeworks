import { useState } from "react";

import { DobleLinked } from "./DobleLinkedL";
import { NodeD } from "./NodeD";

interface Props{
    web:DobleLinked;
}

export function MostrarPag({ web }: Props) {
    const [nodoActual, setNodoActual] = useState<NodeD | null>(web.head || null);

    return (
        <div>
            <h2>{nodoActual?.value.nombre || "Sin página"}</h2>

             <iframe
                src ={nodoActual?.value.url || ""}
                title={nodoActual?.value.nombre || "Página web"}
                 width="100%"
                height="300px"
                style = {{ border: "1px solid #ccc", borderRadius: "8px" }}
            />
            
            <button 
                onClick={() => nodoActual?.prev && setNodoActual(nodoActual.prev)}
                disabled={!nodoActual?.prev}
            >
                ⬅ Anterior
            </button>
            
            <button 
                onClick={() => nodoActual?.next && setNodoActual(nodoActual.next)}
                disabled={!nodoActual?.next}
            >
                Siguiente ➡
            </button>
        </div>
    );
}