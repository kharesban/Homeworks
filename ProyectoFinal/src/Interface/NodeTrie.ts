import type { Cancion } from './Canciones';

export interface NodoTrie {
  hijos: Map<string, NodoTrie>;
  esFinPalabra: boolean;
  cancion?: Cancion;
}