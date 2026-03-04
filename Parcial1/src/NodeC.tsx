import type { MiembroComite } from "./MiembroComite";

export class NodeComite {
    value: MiembroComite;
    next: NodeComite | null;
    prev: NodeComite | null;

    constructor(value: MiembroComite) {
        this.value = value;
        this.next = null;
        this.prev = null;
    }
}