class Node<T> {
    valor: T;
    hijos: Node<T>[];  

    constructor(valor: T) {
        this.valor = valor;
        this.hijos = [];
    }

    agregarHijo(node: Node<T>) {  
        this.hijos.push(node);
    }
}
export default Node;    