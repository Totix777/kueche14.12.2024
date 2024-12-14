import { useState, useEffect } from 'react';
import { collection, query, where, getDocs, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../config/firebase';
import { FoodEntry } from '../types';

export const useFirestoreFoodLog = () => {
  const [entries, setEntries] = useState<FoodEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEntries = async () => {
      try {
        const today = new Date().toLocaleDateString('de-DE');
        const q = query(
          collection(db, 'foodLog'),
          where('date', '==', today)
        );
        
        const snapshot = await getDocs(q);
        const loadedEntries = snapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id
        })) as FoodEntry[];
        
        setEntries(loadedEntries);
      } catch (error) {
        console.error('Error loading food log:', error);
      } finally {
        setLoading(false);
      }
    };

    loadEntries();
  }, []);

  const addEntry = async (entry: Omit<FoodEntry, 'id'>) => {
    try {
      const docRef = await addDoc(collection(db, 'foodLog'), {
        ...entry,
        timestamp: Timestamp.now()
      });
      
      const newEntry = {
        ...entry,
        id: docRef.id
      };
      
      setEntries(prev => [...prev, newEntry]);
      return newEntry;
    } catch (error) {
      console.error('Error adding food log entry:', error);
      throw error;
    }
  };

  return {
    entries,
    addEntry,
    loading
  };
};