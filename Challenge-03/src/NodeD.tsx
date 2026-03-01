import { PaginasW } from "./Paginas";

export class NodeD{

    value: PaginasW;
    next:NodeD | null;
    prev: NodeD | null;

    constructor(pagina:PaginasW){
    this.value = pagina;
    this.next = null;
    this.prev = null
}

}
