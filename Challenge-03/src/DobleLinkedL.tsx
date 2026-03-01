import { PaginasW } from "./Paginas";
import { NodeD } from "./NodeD";

export class DobleLinked{
    head: NodeD | null;
    tail: NodeD | null;
    length: number;

    constructor(){
        this.head = null;
        this.tail= null;
        this.length = 0;
    }
     append(value:PaginasW){
            const newNode = new NodeD(value);
    
            if (!this.head) {
                this.head = newNode;
                this.tail = newNode;
                this.length++;
                return;
            } 
             this.tail!.next = newNode;
             newNode.prev = this.tail;
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