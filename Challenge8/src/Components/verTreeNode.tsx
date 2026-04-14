// Components/TreeVisualization.tsx
import { useEffect, useRef, useState } from 'react';
import Tree from 'react-d3-tree';
import { Node } from '../Class/Node';
import './verTree.css';

interface TreeProps {
    raiz: Node | null;
}
const convertirAD3Format = (nodo: Node | null): any => {
    if (!nodo) return null;
    
    return {
        name: nodo.valor.toString(),
        children: [
            convertirAD3Format(nodo.izquierda),
            convertirAD3Format(nodo.derecha)
        ].filter(hijo => hijo !== null)
    };
};

const VerTree = ({raiz}: TreeProps) => {
    const [dimensiones, setDimensiones] = useState({ ancho: 800, alto: 500 });
    const contenedorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (contenedorRef.current) {
            setDimensiones({
                ancho: contenedorRef.current.clientWidth,
                alto: 500
            });
        }
    }, []);

    const datosArbol = raiz ? convertirAD3Format(raiz) : null;

    if (!datosArbol) {
        return <div>No hay árbol para mostrar</div>;
    }

    return (
        <div 
            ref={contenedorRef} 
            className="tree-visualization-container"
        >
            <Tree
                data={datosArbol}
                orientation="vertical"
                pathFunc="step"
                translate={{ x: dimensiones.ancho / 2, y: 50 }}
                nodeSize={{ x: 120, y: 100 }}
                separation={{ siblings: 1.5, nonSiblings: 1.5 }}
                renderCustomNodeElement={({ nodeDatum, toggleNode }) => (
                    <g>
                        <circle 
                            r={25} 
                            className="custom-node-circle"
                            fill="#58a6ff" 
                            stroke="#2E7D32" 
                            strokeWidth={2}
                            onClick={toggleNode}
                        />
                        <text 
                            className="custom-node-text"
                            fill="white" 
                            fontSize="16" 
                            fontWeight="bold" 
                            textAnchor="middle" 
                            dy=".35em"
                        >
                            {nodeDatum.name}
                        </text>
                    </g>
                )}
            />
        </div>
    );
};

export default VerTree;