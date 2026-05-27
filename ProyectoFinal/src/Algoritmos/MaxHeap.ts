import type { Cancion } from '../Interface/Canciones';

export class MaxHeap {
  private heap: Cancion[];

  constructor() {
    this.heap = [];
  }

  tamanio(): number {
    return this.heap.length;
  }

  private padre(indice: number): number {
    return Math.floor((indice - 1) / 2);
  }

  private hijoIzquierdo(indice: number): number {
    return 2 * indice + 1;
  }

  private hijoDerecho(indice: number): number {
    return 2 * indice + 2;
  }

  private intercambiar(i: number, j: number): void {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  insertar(cancion: Cancion): void {
    this.heap.push(cancion);
    this.flotar(this.heap.length - 1);
  }

  private flotar(indice: number): void {
    while (indice > 0) {
      const padreIdx = this.padre(indice);
      if (this.heap[padreIdx].popularidad >= this.heap[indice].popularidad) {
        break;
      }
      this.intercambiar(padreIdx, indice);
      indice = padreIdx;
    }
  }

  obtenerMaximo(): Cancion | null {
    return this.heap.length > 0 ? this.heap[0] : null;
  }

  eliminarMaximo(): Cancion | null {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop()!;

    const maximo = this.heap[0];
    this.heap[0] = this.heap.pop()!;
    this.hundir(0);
    return maximo;
  }

  private hundir(indice: number): void {
    let maxIndex = indice;
    const izquierda = this.hijoIzquierdo(indice);
    const derecha = this.hijoDerecho(indice);
    const tamanio = this.heap.length;

    if (izquierda < tamanio && this.heap[izquierda].popularidad > this.heap[maxIndex].popularidad) {
      maxIndex = izquierda;
    }

    if (derecha < tamanio && this.heap[derecha].popularidad > this.heap[maxIndex].popularidad) {
      maxIndex = derecha;
    }

    if (maxIndex !== indice) {
      this.intercambiar(indice, maxIndex);
      this.hundir(maxIndex);
    }
  }

  heapify(canciones: Cancion[]): void {
    this.heap = [...canciones];
    for (let i = Math.floor(this.heap.length / 2) - 1; i >= 0; i--) {
      this.hundir(i);
    }
  }

  obtenerTopK(k: number): Cancion[] {
    const heapOriginal = [...this.heap];
    const topK: Cancion[] = [];

    for (let i = 0; i < k && this.heap.length > 0; i++) {
      topK.push(this.eliminarMaximo()!);
    }

    this.heap = heapOriginal;
    return topK;
  }

  toArray(): Cancion[] {
    return [...this.heap];
  }
}