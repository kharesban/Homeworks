import { useEffect, useState } from "react";
import type { CircularDoubleListComite } from "./DobleCircular";
import type { MiembroComite } from "./MiembroComite";

interface Props {
    comite: CircularDoubleListComite;
}

export function VerComite({ comite }: Props) {
    const [miembroActual, setMiembroActual] = useState<MiembroComite | null>(null);

    useEffect(() => {
        if (comite.head) {
            setMiembroActual(comite.getActualM() || comite.head.value);
        }
    }, []);

    const siguiente = () => {
        const miembro = comite.siguienteM();
        setMiembroActual(miembro || null);
    };

    const anterior = () => {
        const miembro = comite.anteriorM();
        setMiembroActual(miembro || null);
    };

        return (
        <div>
            <h2>👥 Comité Administrativo</h2>
            <h1>{miembroActual?.nombre}</h1>
            <button onClick={anterior}>Anterior</button>
            <button onClick={siguiente}>Siguiente</button>
        </div>
    );

}