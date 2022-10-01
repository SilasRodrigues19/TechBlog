import { useState, useEffect } from 'react';
import { db } from '../services/firebase';
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  where,
} from 'firebase/firestore';

export const useFetchDocuments = (docCollection, search = null, uid = null) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  // deal with memory leak
  const [cancelled, setCancelled] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      if (cancelled) return;

      setLoading(true);

      const collectionRef = await collection(db, docCollection);

      try {
        let q;

        if (search) {
          q = await query(
            collectionRef,
            where('tagsArray', 'array-contains-any', [search]),
            orderBy('createdAt', 'desc')
          );
        } else {
          q = await query(collectionRef, orderBy('createdAt', 'desc'));
        }

        await onSnapshot(q, (querySnapshot) => {
          setDocuments(
            querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
          );
        });

        setLoading(false);
      } catch (error) {
        console.error(error);
        setError(error.message);

        setLoading(false);
      }
    };

    loadData();
  }, [docCollection, search, uid, cancelled]);

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return { documents, loading, error };
};
