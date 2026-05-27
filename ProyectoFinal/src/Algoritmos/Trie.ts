import type { NodoTrie } from '../Interface/NodeTrie';
import type { Cancion } from '../Interface/Canciones';

export class Trie {

  private raiz: NodoTrie;

  constructor() {
    this.raiz = this.crearNodo();
  }

  private crearNodo(): NodoTrie {
    return {

      hijos: new Map<string, NodoTrie>(),
      esFinPalabra: false,
      cancion: undefined,
    };
  }

  insertar(cancion: Cancion): void {

    const titulo = cancion.titulo.toLowerCase();
    let actual = this.raiz;

    for (const letra of titulo) {
      
      if (!actual.hijos.has(letra)) {
        actual.hijos.set(letra, this.crearNodo());
      }
      actual = actual.hijos.get(letra)!;
    }

    actual.esFinPalabra = true;
    actual.cancion = cancion;
  }

  buscar(titulo: string): Cancion | null {
    const tituloLower = titulo.toLowerCase();
    let actual = this.raiz;

    for (const letra of tituloLower) {
      if (!actual.hijos.has(letra)) {
        return null;
      }
      actual = actual.hijos.get(letra)!;
    }

    return actual.esFinPalabra && actual.cancion ? actual.cancion : null;
  }

  obtenerSugerencias(prefijo: string, limite: number = 5): Cancion[] {
    const prefijoLower = prefijo.toLowerCase();
    let actual = this.raiz;

    for (const letra of prefijoLower) {
      if (!actual.hijos.has(letra)) {
        return [];
      }
      actual = actual.hijos.get(letra)!;
    }

    const sugerencias: Cancion[] = [];
    this.coleccionarSugerencias(actual, sugerencias, limite);
    return sugerencias;
  }

  private coleccionarSugerencias(
    nodo: NodoTrie,
    sugerencias: Cancion[],
    limite: number
  ): void {
    if (sugerencias.length >= limite) return;

    if (nodo.esFinPalabra && nodo.cancion) {
      sugerencias.push(nodo.cancion);
    }

    for (const [_, hijo] of nodo.hijos) {
      this.coleccionarSugerencias(hijo, sugerencias, limite);
      if (sugerencias.length >= limite) break;
    }
  }

  obtenerTodasLasCanciones(): Cancion[] {
    const canciones: Cancion[] = [];
    this.recorrerTodas(this.raiz, canciones);
    return canciones;
  }

  private recorrerTodas(nodo: NodoTrie, canciones: Cancion[]): void {
    if (nodo.esFinPalabra && nodo.cancion) {
      canciones.push(nodo.cancion);
    }
    for (const [_, hijo] of nodo.hijos) {
      this.recorrerTodas(hijo, canciones);
    }
  }
}