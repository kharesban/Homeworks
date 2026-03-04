import type { Medico } from "./Medico";
import { NodeM } from "./NodeMed";

export class ListCircuMed {
  head: NodeM | null;
  tail: NodeM | null;
  length: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  append(value: Medico) {
    const newNode = new NodeM(value);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
      this.tail.next = this.head; 
      this.length++;
      return;
    }

    this.tail!.next = newNode;
    this.tail = newNode;
    this.tail.next = this.head; 
    this.length++;
  }

remove(value: Medico) {
  if (!this.head){
    return;
  } 
  
  if (this.head.value === value) {

    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = this.head.next;
      this.tail!.next = this.head; 
    }
    this.length--;
    return;
  }

  let current = this.head;
  
  while (current.next && current.next.value !== value) {

    if (current.next === this.head){
         return current = current.next;
    }
         
  }
  
  if (current.next) {

    if (current.next === this.tail) {
        this.tail = current;
    }

    current.next = current.next.next;
    if (this.tail) this.tail.next = this.head;
    this.length--;
  }
}
}
