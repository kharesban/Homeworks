import { NodeComite } from "./NodeC";
import type { MiembroComite } from "./MiembroComite";

export class CircularDoubleListComite {
    head: NodeComite | null;
    tail: NodeComite | null;
    current: NodeComite | null;  
    length: number;

    constructor() {
        this.head = null;
        this.tail = null;
        this.current = null;
        this.length = 0;
    }

    append(value: MiembroComite) {
        const newNode = new NodeComite(value);

        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
            this.current = newNode;
            newNode.next = newNode;
            newNode.prev = newNode;
        } else {
            this.tail!.next = newNode;
            newNode.prev = this.tail;
            newNode.next = this.head;
            this.head!.prev = newNode;
            this.tail = newNode;
        }

        this.length++;
    }
    siguienteM() {
        if (this.current) {
            this.current = this.current.next;
        }
        return this.current?.value;
    }


    anteriorM() {
        if (this.current) {
            this.current = this.current.prev;
        }
        return this.current?.value;
    }

    getActualM() {
        return this.current?.value;
    }
}