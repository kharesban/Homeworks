import type { Medico } from "./Medico";

export class NodeM {
    value: Medico;
    next: NodeM | null;

    constructor(value: Medico) {
        this.value = value;
        this.next = null;
    }
}