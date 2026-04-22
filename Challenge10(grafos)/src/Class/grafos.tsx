import type { Persona } from "./Persona"
import type { Ciudad } from "./Ciudad"
class Grafo{
    personas:Persona[]
    ciudades:Ciudad[]
    nodes:string[]
    adjList: {[key:string]:string[]}
    

    constructor(){
        this.personas = []
        this.ciudades =[]
        this.nodes = []
        this.adjList = {}
    }
    
    addCiudad(ciudad: Ciudad) {
      this.ciudades.push(ciudad);
      this.nodes.push(ciudad.id);
      this.adjList[ciudad.id] = [];
  }


  addPersona(persona: Persona) {

    this.personas.push(persona);
    this.nodes.push(persona.id);
    this.adjList[persona.id] = [];

    this.addEdge(persona.id, persona.ciudad); 
  }
  
  addEdge(node1: string, node2: string) {
      this.adjList[node1].push(node2);
      this.adjList[node2].push(node1);
  }

  searchNode(node: string): string | undefined {
    if (!this.nodes.length) return;
    return this.nodes.find(n => n === node);
  }

  printAdjacency(node: string): void {
    if (this.adjList[node]) {
      console.log(this.adjList[node]);
  }
}

  printGraph(): void {
    console.log(this.adjList);
  }


personasPorCiudad(nombreCiudad: string): Persona[] {
  const ciudad = this.ciudades.find(
    c => c.nombreC.toUpperCase() === nombreCiudad.toUpperCase()
  );

  if (!ciudad) return [];

  return this.personas.filter(p => p.ciudad === ciudad.id);
}



}
export default Grafo