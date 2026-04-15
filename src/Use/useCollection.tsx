import { useState } from "react";
import { db } from "../firebase/config";
import {
  collection, query, where, getDocs, getDoc,
  addDoc, updateDoc, deleteDoc,
  doc, serverTimestamp,
} from "firebase/firestore";

interface User {
  email: string;
  password: string;
}

const useCollection = (table: string) => {
    const [results, setResults] = useState<any[]>([]);
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const getAll = async (filters: any[] = []) => {
    setIsPending(true);
    setError(null);

    try {

        let q: any = query(collection(db, table));

        for (const [field, op, value] of filters) {
            q = query(q, where(field, op, value));
      }

      const snapshot = await getDocs(q);
      const docs = snapshot.docs.map((d: any) => ({ id: d.id, ...d.data() }));

      setResults(docs);
      setIsPending(false);
      return docs;
    } catch (err: any) {
        setError(err.message);
        setIsPending(false);
        return [];
    }
  };

  const getById = async (id: string) => {

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
    } catch (err: any) {

        setError(err.message);
        setIsPending(false);
        return null;
    }
  };

  const add = async (data: User) => {

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
    } catch (err: any) {
        setError(err.message);
        setIsPending(false);
        return null;
    }
  };

  const update = async (id: string, data: Partial<User>) => {

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
    } catch (err: any) {
        setError(err.message);
        setIsPending(false);
        return false;
    }
  };

  const remove = async (id: string) => {
        setIsPending(true);
        setError(null);

    try {
      const docRef = doc(db, table, id);
      await deleteDoc(docRef);
      
      setResults((prev) => prev.filter((item) => item.id !== id));
      setIsPending(false);
      return true;
    } catch (err: any) {
        setError(err.message);
        setIsPending(false);
        return false;
    }
  };

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