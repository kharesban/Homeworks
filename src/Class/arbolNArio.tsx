
import Node from "./Node";
import type { Archivo } from "./archivo";
import type { Carpeta } from "./carpeta";

export class ArbolNArio {
    raiz: Node<Archivo | Carpeta> | null;

    constructor(raizInicial: Node<Archivo | Carpeta> | null = null) {
        this.raiz = raizInicial;
    }

    insertar(valor: Archivo | Carpeta, padreId: string | null = null): boolean {
        const nuevoNodo = new Node<Archivo | Carpeta>(valor);
        
        if (!this.raiz) {
            this.raiz = nuevoNodo;
            return true;
        }

        if (padreId === null) {
            this.raiz.agregarHijo(nuevoNodo);
            return true;
        }

        const nodoPadre = this.buscarNodo(padreId, this.raiz);
        if (nodoPadre && nodoPadre.valor.tipo === 'carpeta') {
            nodoPadre.agregarHijo(nuevoNodo);
            return true;
        }
        
        return false;
    }

    buscarNodo(nombre: string, nodo: Node<Archivo | Carpeta> | null): Node<Archivo | Carpeta> | null {
        if (!nodo) return null;
        if (nodo.valor.nombre === nombre) return nodo;
        
        for (const hijo of nodo.hijos) {
            const encontrado = this.buscarNodo(nombre, hijo);
            if (encontrado) return encontrado;
        }
        return null;
    }

    convertirAD3(nodo: Node<Archivo | Carpeta> | null): any {
        if (!nodo) return null;
        
        const nombreMostrar = nodo.valor.nombre === 'root' 
            ? 'root' 
            : `[${nodo.valor.tipo === 'carpeta' ? 'C' : 'A'}] ${nodo.valor.nombre}`;
        
        const nodoD3 = {
            name: nombreMostrar,
            children: [] as any[]
        };
        
        for (const hijo of nodo.hijos) {
            const hijoD3 = this.convertirAD3(hijo);
            if (hijoD3) {
                nodoD3.children.push(hijoD3);
            }
        }
        
        return nodoD3;
    }

    obtenerArbolD3(): any {
        if (!this.raiz) return null;
        return this.convertirAD3(this.raiz);
    }

    obtenerCarpetas(nodo: Node<Archivo | Carpeta> | null = this.raiz, nivel: number = 0): { nombre: string; id: string }[] {
        if (!nodo) return [];
        
        let carpetas: { nombre: string; id: string }[] = [];
        
        if (nodo.valor.tipo === 'carpeta' && nodo.valor.nombre !== 'root') {
            carpetas.push({ 
                nombre: "  ".repeat(nivel) + nodo.valor.nombre,
                id: nodo.valor.nombre 
            });
        }
        
        for (const hijo of nodo.hijos) {
            carpetas = [...carpetas, ...this.obtenerCarpetas(hijo, nivel + 1)];
        }
        
        return carpetas;
    }

    visualizar(nodo: Node<Archivo | Carpeta> | null = this.raiz, prefijo: string = "", esUltimo: boolean = true): string {
        if (!nodo) return "";
        
        let resultado = "";
        
        if (prefijo === "") {
            resultado += `${nodo.valor.nombre}\n`;
        } else {
            const conector = esUltimo ? "└── " : "├── ";
            resultado += `${prefijo}${conector}${nodo.valor.nombre}\n`;
        }
        
        const nuevosPrefijos = prefijo + (esUltimo ? "    " : "│   ");
        for (let i = 0; i < nodo.hijos.length; i++) {
            const hijo = nodo.hijos[i];
            const esUltimoHijo = i === nodo.hijos.length - 1;
            resultado += this.visualizar(hijo, nuevosPrefijos, esUltimoHijo);
        }
        
        return resultado;
    }
}