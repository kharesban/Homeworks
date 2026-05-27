import { useState, useCallback } from 'react';
import { Grafo } from '../Algoritmos/Grafo';
import type { Cancion } from '../Interface/Canciones';
import type { Recomendacion } from '../Interface/Recomendaciones';

export const useGrafo = () => {
  const [grafo, setGrafo] = useState<Grafo>(new Grafo());
  const [recomendaciones, setRecomendaciones] = useState<Recomendacion[]>([]);

  const agregarCancion = useCallback((cancion: Cancion) => {
    grafo.agregarCancion(cancion);
    setGrafo(new Grafo());
    setGrafo(grafo);
  }, [grafo]);

  const agregarRelacion = useCallback((cancionId1: string, cancionId2: string) => {
    grafo.agregarArista(cancionId1, cancionId2);
    setGrafo(new Grafo());
    setGrafo(grafo);
  }, [grafo]);

  const obtenerRelacionadas = useCallback((cancionId: string, limite: number = 5) => {
    const relacionadas = grafo.obtenerCancionesRelacionadas(cancionId, limite);
    setRecomendaciones(relacionadas);
    return relacionadas;
  }, [grafo]);

  const obtenerRecomendacionesProfundas = useCallback((cancionId: string, profundidad: number = 2, limite: number = 5) => {
    const recs = grafo.recomendarPorSimilitud(cancionId, profundidad, limite);
    setRecomendaciones(recs);
    return recs;
  }, [grafo]);

  const inicializarConCanciones = useCallback((canciones: Cancion[], relaciones: [string, string][]) => {
    const nuevoGrafo = new Grafo();
    canciones.forEach((cancion) => nuevoGrafo.agregarCancion(cancion));
    relaciones.forEach(([id1, id2]) => {
      nuevoGrafo.agregarArista(id1, id2);
    });
    setGrafo(nuevoGrafo);
  }, []);

  return {
    grafo,
    recomendaciones,
    agregarCancion,
    agregarRelacion,
    obtenerRelacionadas,
    obtenerRecomendacionesProfundas,
    inicializarConCanciones,
  };
};