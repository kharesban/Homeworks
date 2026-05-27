// src/Hooks/UseMaxHeap.ts
import { useState, useCallback } from 'react';
import { MaxHeap } from '../Algoritmos/MaxHeap';
import type { Cancion } from '../Interface/Canciones';

export const useMaxHeap = () => {
  const [topCanciones, setTopCanciones] = useState<Cancion[]>([]);

  const actualizarRanking = useCallback((canciones: Cancion[]) => {
    if (!canciones || canciones.length === 0) return;
    
    const heap = new MaxHeap();
    heap.heapify(canciones);
    const top = heap.obtenerTopK(10);
    setTopCanciones(top);
  }, []);

  return {
    topCanciones,
    actualizarRanking,
  };
};