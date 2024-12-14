import { useState, useCallback } from 'react';
import { saveCollection, loadCollection } from '../services/firebase/base';

export const useFirestoreCollection = <T extends { id: string }>(
  collectionName: string,
  date: string,
  defaultData: T[]
) => {
  const [data, setLocalData] = useState<T[]>(defaultData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const fetchedData = await loadCollection<T>(collectionName, date);
      setLocalData(fetchedData.length > 0 ? fetchedData : defaultData);
    } catch (err) {
      console.error(`Error loading ${collectionName}:`, err);
      setError(err instanceof Error ? err : new Error(`Failed to load ${collectionName}`));
      setLocalData(defaultData);
    } finally {
      setLoading(false);
    }
  }, [collectionName, date, defaultData]);

  const setData = async (newData: T[]) => {
    try {
      setLoading(true);
      await saveCollection(collectionName, newData, date);
      setLocalData(newData);
    } catch (err) {
      console.error(`Error saving ${collectionName}:`, err);
      setError(err instanceof Error ? err : new Error(`Failed to save ${collectionName}`));
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    setData,
    loading,
    error,
    refresh: fetchData
  };
};