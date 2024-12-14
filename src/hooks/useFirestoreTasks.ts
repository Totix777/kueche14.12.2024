import { useEffect } from 'react';
import { useFirestoreCollection } from './useFirestoreCollection';
import { CleaningTask } from '../types';
import { COLLECTIONS } from '../services/firebase/collections';
import { cleaningTasks } from '../data/cleaningTasks';

export const useFirestoreTasks = () => {
  const currentDate = new Date().toISOString().split('T')[0];
  const { data: tasks, setData: setTasks, loading, error, refresh } = 
    useFirestoreCollection<CleaningTask>(COLLECTIONS.TASKS, currentDate, cleaningTasks);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { tasks, setTasks, loading, error };
};