import type { Persona } from "./Persona";

class Queues{
    items: Persona[]
    constructor(){
        this.items = []

    }
        enqueue(item:Persona) {
        this.items.push(item);
    }

    dequeue() {
        return this.items.length > 0 ? this.items.shift() : null;
    }

    peek() {
        return this.items.length > 0 ? this.items[0] : null;
    }

    size() {
        return this.items.length;
    }

    isEmpty() {
        return this.items.length === 0;
    }

    print() {
        this.items.forEach(item => {
            console.log(item);
        });
    }
}
export default Queues