import { Node } from "./Node"

export class ArbolBinario{
    raiz: Node | null
    constructor(raizInicial: Node | null = null){
        this.raiz = raizInicial
    }

     insertar(valor: number) {
        const nuevoNodo = new Node(valor);
        if(!this.raiz){
            this.raiz = nuevoNodo;
            return;
        }

        let actual = this.raiz;
        while(true){
            if(valor < actual.valor){
                if(!actual.izquierda){
                    actual.izquierda = nuevoNodo;
                    return;
                }
                actual = actual.izquierda;
            }else{
                if(!actual.derecha){
                    actual.derecha = nuevoNodo;
                    return;
                }
                actual = actual.derecha
            }
        }
        
    }
     preorden(nodo: Node | null = this.raiz): void {
        if (!nodo) return;
        console.log(nodo.valor);
        this.preorden(nodo.izquierda);
        this.preorden(nodo.derecha);
    }
     inorden(nodo: Node | null = this.raiz): void {
        if (!nodo) return;
        this.inorden(nodo.izquierda);
        console.log(nodo.valor);
        this.inorden(nodo.derecha);
    }
     postorden(nodo: Node | null = this.raiz): void {
        if (!nodo) return;
        this.postorden(nodo.izquierda);
        this.postorden(nodo.derecha);
        console.log(nodo.valor);
    }
       buscar(valor: number, nodo: Node | null = this.raiz): boolean {
        if (!nodo) return false;
        if (valor === nodo.valor) return true;
        
        if (valor < nodo.valor) {
            return this.buscar(valor, nodo.izquierda);
        } else {
            return this.buscar(valor, nodo.derecha);
        }
    }
}