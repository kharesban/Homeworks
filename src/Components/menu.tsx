import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Tree from "react-d3-tree";
import { AuthContext } from "./MyContext";
import { ArbolNArio } from "../Class/arbolNArio";
import Node from "../Class/Node";
import type { Archivo } from "../Class/archivo";
import type { Carpeta } from "../Class/carpeta";
import "../style/menu.css";

function Menu(){

    const { user } = useContext(AuthContext) as { user: { email: string } | null };
    const [arbol, setArbol] = useState<ArbolNArio>(new ArbolNArio());
    const [nombreItem, setNombreItem] = useState("");
    const [tipoItem, setTipoItem] = useState<"archivo" | "carpeta">("archivo");
    const [carpetaPadre, setCarpetaPadre] = useState<string>("");
    const [carpetasDisponibles, setCarpetasDisponibles] = useState<{ nombre: string; id: string }[]>([]);
    const [treeData, setTreeData] = useState<any>(null);

    useEffect(() => {
        const raiz = new Node<Archivo | Carpeta>({

            nombre: "root",
            tipo: "carpeta",
            padreId: null
        });
        const nuevoArbol = new ArbolNArio(raiz);
        setArbol(nuevoArbol);
    }, []);

    useEffect(() =>{

        if (arbol.raiz) {
            const d3Data = arbol.obtenerArbolD3();
            setTreeData(d3Data);
            const carpetas = arbol.obtenerCarpetas(arbol.raiz);
            setCarpetasDisponibles(carpetas);
        }
    }, [arbol]);

    const Crear = () => {

        if (!nombreItem.trim()) {
            alert("Por favor ingresa un nombre");
            return;
        }

        let padreId = null;
        if (carpetaPadre && carpetaPadre !== "root") {
            padreId = carpetaPadre;
        }

        if (tipoItem === "archivo"){
            const nuevoArchivo: Archivo = {
                nombre: nombreItem,
                tipo: "archivo",
                padreId: padreId
            };

            const insertado = arbol.insertar(nuevoArchivo, padreId);
            if (insertado){

                alert(`Archivo "${nombreItem}" creado correctamente`);
                setNombreItem("");
                setArbol(new ArbolNArio(arbol.raiz));

            } else{

                alert("Error: No se pudo crear el archivo");
            }
        } else{

            const nuevaCarpeta: Carpeta = {
                nombre: nombreItem,
                tipo: "carpeta",
                padreId: padreId
            };

            const insertado = arbol.insertar(nuevaCarpeta, padreId);
            if (insertado){
                alert(`Carpeta "${nombreItem}" creada correctamente`);
                setNombreItem("");
                setArbol(new ArbolNArio(arbol.raiz));
            } else {
                alert("Error: No se pudo crear la carpeta");
            }
        }
    };

    return (
        <div className="contenedor">
            <h1>Bienvenido {user?.email}</h1>
            <h2>Explorador de Archivos</h2>
            
            <div className="columnas">
                <div className="panel">
                    <div className="tarjeta">
                        <h3>Crear</h3>
                        
                        <input
                            type="text"
                            placeholder="Nombre"
                            value={nombreItem}
                            onChange={(e) => setNombreItem(e.target.value)}
                            className="input"
                        />

                        <select 
                            value={tipoItem} 
                            onChange={(e) => setTipoItem(e.target.value as "archivo" | "carpeta")}
                            className="input"
                        >
                            <option value="archivo">Archivo</option>
                            <option value="carpeta">Carpeta</option>
                        </select>

                        <select 
                            value={carpetaPadre} 
                            onChange={(e) => setCarpetaPadre(e.target.value)}
                            className="input"
                        >
                            <option value="root">Raíz</option>
                            {carpetasDisponibles.map((c) => (
                                <option key={c.id} value={c.id}>{c.nombre}</option>
                            ))}
                        </select>

                        <button onClick={Crear} className="btn-primario">
                            Crear {tipoItem === "archivo" ? "Archivo" : "Carpeta"}
                        </button>
                    </div>

                    <Link to="/">
                        <button className="btn-cerrar">Salir</button>
                    </Link>
                </div>

                <div className="visor">
                    <div className="tarjeta visor-tarjeta">
                        <h3>Árbol</h3>
                        <div className="arbol-contenedor">
                            {treeData ? (
                                <Tree
                                    data={treeData}
                                    orientation="horizontal"
                                    pathFunc="step"
                                    translate={{ x: 50, y: 200 }}
                                    nodeSize={{ x: 180, y: 60 }}
                                    separation={{ siblings: 1.2, nonSiblings: 1.5 }}
                                />
                            ) : (
                                <div className="arbol-vacio">Vacio</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Menu;