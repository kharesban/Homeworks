export class Node{

    valor:number;
    izquierda: Node | null;
    derecha: Node | null;
    constructor(valor: number

    ){
        this.valor = valor,
        this.izquierda = null,
        this.derecha = null
    }

    isLeaf():boolean{
        if(this.izquierda === null && this.derecha === null){
            return true;
        }else{
            return false;
        }
    }
    static fromObject(obj: any): Node | null {

        if (!obj) return null;
        
        const nodo = new Node(obj.valor);
        nodo.izquierda = Node.fromObject(obj.izquierda);
        nodo.derecha = Node.fromObject(obj.derecha);
        
        return nodo;
    }
}