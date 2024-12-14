import { useState, useCallback } from 'react';
import { saveTasks, loadTasks } from '../services/firebase/tasks';
import { saveTemperatures, loadTemperatures } from '../services/firebase/temperatures';
import { CleaningTask, TemperatureEntry } from '../types';

export const useFirestore = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const handleSaveTasks = useCallback(async (tasks: CleaningTask[], date: string) => {
    setLoading(true);
    setError(null);
    try {
      await saveTasks(tasks, date);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleLoadTasks = useCallback(async (date: string) => {
    setLoading(true);
    setError(null);
    try {
      const tasks = await loadTasks(date);
      return tasks;
    } catch (err) {
      setError(err as Error);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSaveTemperatures = useCallback(async (temperatures: TemperatureEntry[], date: string) => {
    setLoading(true);
    setError(null);
    try {
      await saveTemperatures(temperatures, date);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleLoadTemperatures = useCallback(async (date: string) => {
    setLoading(true);
    setError(null);
    try {
      const temperatures = await loadTemperatures(date);
      return temperatures;
    } catch (err) {
      setError(err as Error);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    saveTasks: handleSaveTasks,
    loadTasks: handleLoadTasks,
    saveTemperatures: handleSaveTemperatures,
    loadTemperatures: handleLoadTemperatures
  };
};