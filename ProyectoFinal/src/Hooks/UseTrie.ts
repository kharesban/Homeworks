import { useState, useCallback } from 'react';
import type { Cancion } from '../Interface/Canciones';

export const useTrie = () => {
  const [cancionesMap, setCancionesMap] = useState<Map<string, Cancion>>(new Map());
  const [sugerencias, setSugerencias] = useState<Cancion[]>([]);
  const [listaCanciones, setListaCanciones] = useState<Cancion[]>([]);

  const insertarCancion = useCallback((cancion: Cancion) => {
    const clave = cancion.titulo.toLowerCase();
    setCancionesMap(prev => {
      const nuevo = new Map(prev);
      nuevo.set(clave, cancion);
      return nuevo;
    });
    setListaCanciones(prev => [...prev, cancion]);
  }, []);

  const buscarCancion = useCallback((titulo: string): Cancion | null => {
    const clave = titulo.toLowerCase();

    const resultado = cancionesMap.get(clave) || null;
    return resultado;
  }, [cancionesMap]);

  const obtenerSugerencias = useCallback((prefijo: string, limite: number = 5) => {
    const prefijoLower = prefijo.toLowerCase();
    const resultados: Cancion[] = [];
    
    for (const [clave, cancion] of cancionesMap) {
      if (clave.startsWith(prefijoLower) && resultados.length < limite) {
        resultados.push(cancion);
      }
    }
    
    setSugerencias(resultados);
    return resultados;
  }, [cancionesMap]);

  const insertarMultiplesCanciones = useCallback((canciones: Cancion[]) => {
    const nuevoMap = new Map();
    canciones.forEach((cancion) => {
      console.log("  - Insertando:", cancion.titulo);
      nuevoMap.set(cancion.titulo.toLowerCase(), cancion);
    });
    setCancionesMap(nuevoMap);
    setListaCanciones([...canciones]);
  }, []);

  return {
    sugerencias,
    listaCanciones,
    insertarCancion,
    buscarCancion,
    obtenerSugerencias,
    insertarMultiplesCanciones,
  };
};