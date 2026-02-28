import { Cancion } from "./Cancion";


export class Node{

    value: Cancion;
    next:Node | null;

    constructor(cancion:Cancion){
    this.value = cancion;
    this.next = null;
}

}
