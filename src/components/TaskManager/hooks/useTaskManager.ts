import { useState, useEffect } from 'react';
import { cleaningTasks } from '../../../data/cleaningTasks';
import { filterTasksByFrequency } from '../../../utils/taskUtils';
import { CleaningTask, FrequencyTab, GroupedTasks } from '../../../types';
import { useFirestoreTasks } from '../../../hooks';
import { useSave } from '../../../context/SaveContext';
import { useAuth } from '../../../context/AuthContext';
import { Timestamp } from 'firebase/firestore';

export const useTaskManager = (frequency: FrequencyTab) => {
  const [groupedTasks, setGroupedTasks] = useState<GroupedTasks>({});
  const { tasks, setTasks, loading } = useFirestoreTasks();
  const { registerSaveHandler, unregisterSaveHandler } = useSave();
  const { currentUser } = useAuth();

  useEffect(() => {
    const filteredTasks = filterTasksByFrequency(tasks?.length ? tasks : cleaningTasks, frequency);
    const grouped = filteredTasks.reduce((acc, task) => {
      if (!acc[task.area]) {
        acc[task.area] = [];
      }
      acc[task.area].push(task);
      return acc;
    }, {} as GroupedTasks);

    setGroupedTasks(grouped);
  }, [frequency, tasks]);

  useEffect(() => {
    const handleSave = async () => {
      const allTasks = Object.values(groupedTasks).flat();
      if (allTasks.length > 0) {
        await setTasks(allTasks);
      }
      return { tasks: allTasks };
    };

    registerSaveHandler(handleSave);
    return () => unregisterSaveHandler(handleSave);
  }, [groupedTasks, setTasks, registerSaveHandler, unregisterSaveHandler]);

  const handleTaskComplete = (taskId: string, completed: boolean) => {
    const updatedGrouped = { ...groupedTasks };
    
    Object.keys(updatedGrouped).forEach(area => {
      updatedGrouped[area] = updatedGrouped[area].map(task =>
        task.id === taskId ? {
          ...task,
          completed,
          completedBy: completed ? currentUser : undefined,
          completedAt: completed ? Timestamp.now() : undefined
        } : task
      );
    });

    setGroupedTasks(updatedGrouped);
  };

  return {
    groupedTasks,
    handleTaskComplete,
    loading
  };
};