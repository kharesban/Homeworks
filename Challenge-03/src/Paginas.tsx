export class PaginasW {

    nombre:string;
    url:string;
    
    constructor(nombre:string,url:string){
        this.nombre = nombre;
        this.url = url;
    }

    toString(){
        return `${this.url}\n ${this.nombre} `
    }
}