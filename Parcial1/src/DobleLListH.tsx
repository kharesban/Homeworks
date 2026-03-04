    import { NodeH } from "./NodeH";
    import type { Paciente } from "./Pacientes";

    export class DoubleLinkedList {

        head: NodeH | null ;
        tail: NodeH | null ;
        length = 0;

        constructor(){
            this.head = null;
            this.tail = null;
            this.length = 0;
        }

        append(value: Paciente) {
            const newNode = new NodeH(value);

            if (!this.head) {
                this.head = newNode;
                this.tail = newNode;
                return;
            } 
                this.tail!.next = newNode;
                newNode.prev = this.tail;
                this.tail = newNode;
            

            this.length++;
        }

    }