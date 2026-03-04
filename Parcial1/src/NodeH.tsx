import type { Paciente } from "./Pacientes";

export class NodeH{
    value: Paciente
    next: NodeH | null;
    prev: NodeH | null;

    constructor(value: Paciente) {
        this.value = value;
        this.next = null;
        this.prev = null;
    }
}