import { Node } from "./Node";
import { Cancion } from "./Cancion";

export class LinkedListM{
    head: Node | null;
    tail: Node | null;
    length: number;

     constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    append(value:Cancion){
        const newNode = new Node(value);

        if (!this.head) {
            this.head = newNode;
        } else {
            this.tail!.next = newNode;
        }

        this.tail = newNode;
        this.length++;
    }
     print() {
        let current = this.head;
        let result = "";
        while (current) {
            result += current.value.nombre + " -> ";
            current = current.next;
        }
        console.log(result + "null");
    }
}