import type { Paciente } from "./Pacientes";


export class NodeP{

    value: Paciente 
    next: NodeP | null;

    constructor(value:Paciente){
    this.value= value;
    this.next = null ;
    }
    
}