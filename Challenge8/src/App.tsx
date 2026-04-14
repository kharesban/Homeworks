
import { useState,useEffect } from 'react';
import './App.css'
import { ArbolBinario } from './Class/ArbolBinario'
import { Node } from './Class/Node'
import {arbol} from './Components/data'
import VerTree from './Components/verTreeNode';


export const App = () => {
    const [miArbol] = useState(() => {
        const raizNode = Node.fromObject(arbol);
        return new ArbolBinario(raizNode);
    });

      useEffect(() => {

        console.log("Preorden:");
        miArbol.preorden();
        
        console.log("\nInorden:");
        miArbol.inorden();
        
        console.log("\nPostorden:");
        miArbol.postorden();
    }, []);
    
    const [valorBuscar, setValorBuscar] = useState<string>('');
    const [resultadoBusqueda, setResultadoBusqueda] = useState<string>('');


    const BuscarV = () => {
        const valor = parseInt(valorBuscar);
        if (isNaN(valor)) {
            setResultadoBusqueda(' ingrese un número válido');
            return;
        }
        
        const encontrado = miArbol.buscar(valor);
        if (encontrado) {
            setResultadoBusqueda(`El valor ${valor}  se encuentra en el árbol`);
        } else {
            setResultadoBusqueda(` El valor ${valor} NO se encuentra en el árbol`);
        }
    };

    return (
        <div className="app-container">
            <h1>Árbol Binario</h1>
 
            <div className="search-section">
                <h2> Buscar valor</h2>
                <div className="input-group">
                    <input
                        type="number"
                        value={valorBuscar}
                        onChange={(e) => setValorBuscar(e.target.value)}
                        placeholder="Ingrese un número"
                    />
                    <button onClick={BuscarV}>Buscar</button>
                </div>
                {resultadoBusqueda && (
                    <div className={`result ${resultadoBusqueda.includes('SÍ') ? 'success' : 'error'}`}>
                        {resultadoBusqueda}
                    </div>
                )}
            </div>

            <div className="visualization-section">
                <h2>Visualización del Árbol</h2>
                <VerTree raiz={miArbol.raiz} />
            </div>
        </div>
    );
};