// src/Interfaces/Recomendacion.ts

import type { Cancion } from './Canciones';

export interface Recomendacion {
  cancion: Cancion;
  puntajeSimilitud: number;  
}