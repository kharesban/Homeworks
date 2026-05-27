import type { Cancion} from '../Interface/Canciones';
import type { Recomendacion } from '../Interface/Recomendaciones';

export class Grafo {
  private listaAdyacencia: Map<string, string[]>;
  private canciones: Map<string, Cancion>;

  constructor() {
    this.listaAdyacencia = new Map<string, string[]>();
    this.canciones = new Map<string, Cancion>();
  }

  agregarCancion(cancion: Cancion): void {
    this.agregarNodo(cancion.id, cancion);
  }

  private agregarNodo(nodoId: string, cancion?: Cancion): void {
    if (!this.listaAdyacencia.has(nodoId)) {
      this.listaAdyacencia.set(nodoId, []);
    }
    if (cancion && !this.canciones.has(nodoId)) {
      this.canciones.set(nodoId, cancion);
    }
  }

  agregarArista(nodo1: string, nodo2: string): void {
    this.agregarNodo(nodo1);
    this.agregarNodo(nodo2);
    
    this.listaAdyacencia.get(nodo1)?.push(nodo2);
    this.listaAdyacencia.get(nodo2)?.push(nodo1);
  }

  obtenerConexiones(nodoId: string): string[] {
    return this.listaAdyacencia.get(nodoId) || [];
  }

  obtenerCancion(cancionId: string): Cancion | undefined {
    return this.canciones.get(cancionId);
  }

  obtenerTodasLasCanciones(): Cancion[] {
    return Array.from(this.canciones.values());
  }

  obtenerCancionesRelacionadas(cancionId: string, limite: number = 5): Recomendacion[] {
    const conexiones = this.obtenerConexiones(cancionId);
    const recomendaciones: Recomendacion[] = [];

    for (let i = 0; i < Math.min(conexiones.length, limite); i++) {
      const cancion = this.canciones.get(conexiones[i]);
      if (cancion) {
        recomendaciones.push({
          cancion,
          puntajeSimilitud: 1,
        });
      }
    }

    return recomendaciones;
  }

  recomendarPorSimilitud(cancionId: string, profundidad: number = 2, limite: number = 5): Recomendacion[] {
    if (!this.listaAdyacencia.has(cancionId)) {
      return [];
    }

    const puntajes = new Map<string, number>();
    const visitados = new Set<string>();

    this.dfsRecolectar(cancionId, cancionId, 0, profundidad, puntajes, visitados);

    const recomendaciones: Recomendacion[] = [];
    for (const [id, puntaje] of puntajes) {
      if (id !== cancionId) {
        const cancion = this.canciones.get(id);
        if (cancion) {
          recomendaciones.push({ cancion, puntajeSimilitud: puntaje });
        }
      }
    }

    recomendaciones.sort((a, b) => b.puntajeSimilitud - a.puntajeSimilitud);
    return recomendaciones.slice(0, limite);
  }

  private dfsRecolectar(
    actualId: string,
    origenId: string,
    profundidadActual: number,
    profundidadMaxima: number,
    puntajes: Map<string, number>,
    visitados: Set<string>
  ): void {
    if (profundidadActual > profundidadMaxima) return;
    if (visitados.has(actualId) && profundidadActual > 0) return;

    if (profundidadActual > 0) {
      const puntajeActual = puntajes.get(actualId) || 0;

      puntajes.set(actualId, puntajeActual + (profundidadMaxima - profundidadActual + 1));
    }

    visitados.add(actualId);
    const vecinos = this.listaAdyacencia.get(actualId);

    if (vecinos) {
      for (const vecinoId of vecinos) {
        if (vecinoId !== origenId || profundidadActual < profundidadMaxima) {
          this.dfsRecolectar(vecinoId, origenId, profundidadActual + 1, profundidadMaxima, puntajes, visitados);
        }
      }
    }
  }

  estanConectadas(cancionId1: string, cancionId2: string): boolean {
    if (!this.listaAdyacencia.has(cancionId1) || !this.listaAdyacencia.has(cancionId2)) {
      return false;
    }

    const visitados = new Set<string>();
    const cola = [cancionId1];
    visitados.add(cancionId1);

    while (cola.length > 0) {
      const actual = cola.shift()!;
      if (actual === cancionId2) return true;

      const vecinos = this.listaAdyacencia.get(actual);
      if (vecinos) {
        for (const vecinoId of vecinos) {
          if (!visitados.has(vecinoId)) {
            visitados.add(vecinoId);
            cola.push(vecinoId);
          }
        }
      }
    }
    return false;
  }

  imprimir(): Map<string, string[]> {
    return new Map(this.listaAdyacencia);
  }
}