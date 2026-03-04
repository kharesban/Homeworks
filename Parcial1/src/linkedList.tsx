import { NodeP } from "./NodeP"
import type { Paciente } from "./Pacientes";

export class LinkedList{
    head: NodeP | null ;
    tail: NodeP | null ;
    length = 0;
    constructor(){
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    append(value:Paciente){
        const newNode = new NodeP(value);
        if (!this.head) {
            this.head = newNode;
        } else {
            this.tail!.next = newNode;
        }

        this.tail = newNode;
        this.length++
    }

    remove(value:Paciente, current = this.head) {
    if (!this.head) return null;

    if (this.head.value === value) {
        this.head = this.head.next;

        if (!this.head) {
            this.tail = null;
        }

        this.length--;
        return;
    }


    while (current?.next && current.next.value !== value) {
        current = current.next;
    }

    if (current?.next) {
        current.next = current.next.next;
        if (!current.next) this.tail = current;
        this.length--;
    }
}

    print(){

          let current = this.head;
        let result = "";
        while (current) {
            result += current.value.id + " -> ";
            current = current.next;
        }
        console.log(result + "null");
    }
}