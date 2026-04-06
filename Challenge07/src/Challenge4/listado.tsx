import type {Libro} from './libro'

class Stack{
    items: Libro[]
    constructor(){
        this.items = [];
    }      
  
     push(items:Libro) {
        this.items.push(items);
    }

    pop() {
        return this.items.length > 0 ? this.items.pop() : null;
    }

    peek() {
        return this.items.length > 0 ? this.items[this.items.length -1 ] : null;
    }

    isEmpty() {
        return this.items.length === 0;
    }

    size() {
        return this.items.length;
    }

    print() {
        this.items.slice().reverse().forEach( item => {
            console.log(item);
        })
    }
}

export default Stack