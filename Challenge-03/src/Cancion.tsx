export class Cancion{

    id:Number
    nombre:string;
    artista:string;

    constructor( id:Number, nombre:string,artista:string){
        
        this.id= id;
        this.nombre = nombre;
        this.artista = artista;
    }
    toString(){
        return `${this.nombre}-${this.artista}`
    }
}