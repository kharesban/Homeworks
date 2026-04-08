import { useState } from "react";
import { db } from "./firebase/config";
import {
  collection, query, where, getDocs,getDoc,
  addDoc, updateDoc, deleteDoc,
  doc, serverTimestamp,
} from "firebase/firestore";

const useCollection = (table) => {
  const [results, setResults] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  // Obtener todos los documentos con filtros opcionales
  const getAll = async (filters = []) => {
    setIsPending(true);
    setError(null);

    try {
      let q = query(collection(db, table));

      // Aplicar filtros si existen
      for (const [field, op, value] of filters) {
        q = query(q, where(field, op, value));
      }

      const snapshot = await getDocs(q);
      const docs = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));

      setResults(docs);
      setIsPending(false);
      return docs;
    } catch (err) {
      setError(err.message);
      setIsPending(false);
      return [];
    }
  };

  // Obtener un documento por ID
  const getById = async (id) => {
    setIsPending(true);
    setError(null);

    try {
      const docRef = doc(db, table, id);
      const snapshot = await getDoc(docRef);
      
      if (snapshot.exists()) {
        const docData = { id: snapshot.id, ...snapshot.data() };
        setIsPending(false);
        return docData;
      } else {
        setError("Documento no encontrado");
        setIsPending(false);
        return null;
      }
    } catch (err) {
      setError(err.message);
      setIsPending(false);
      return null;
    }
  };

  // Agregar un nuevo documento
  const add = async (data) => {
    setIsPending(true);
    setError(null);

    try {
      const docRef = await addDoc(collection(db, table), {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      
      const newDoc = { id: docRef.id, ...data };
      setResults((prev) => [...prev, newDoc]);
      setIsPending(false);
      return newDoc;
    } catch (err) {
      setError(err.message);
      setIsPending(false);
      return null;
    }
  };

  // Actualizar un documento existente
  const update = async (id, data) => {
    setIsPending(true);
    setError(null);

    try {
      const docRef = doc(db, table, id);
      await updateDoc(docRef, {
        ...data,
        updatedAt: serverTimestamp(),
      });
      
      setIsPending(false);
      return true;
    } catch (err) {
      setError(err.message);
      setIsPending(false);
      return false;
    }
  };

  // Eliminar un documento
  const remove = async (id) => {
    setIsPending(true);
    setError(null);

    try {
      const docRef = doc(db, table, id);
      await deleteDoc(docRef);
      
      setResults((prev) => prev.filter((item) => item.id !== id));
      setIsPending(false);
      return true;
    } catch (err) {
      setError(err.message);
      setIsPending(false);
      return false;
    }
  };

  // Limpiar resultados
  const clearResults = () => {
    setResults([]);
    setError(null);
  };

  return {
    results,
    isPending,
    error,
    getAll,
    getById,
    add,
    update,
    remove,
    clearResults,
  };
};

export default useCollection;