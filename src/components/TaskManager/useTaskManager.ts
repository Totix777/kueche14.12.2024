import { useState, useEffect } from 'react';
import { cleaningTasks } from '../../data/cleaningTasks';
import { filterTasksByFrequency } from '../../utils/taskUtils';
import { CleaningTask, FrequencyTab, GroupedTasks } from '../../types';

export const useTaskManager = (frequency: FrequencyTab) => {
  const [tasks, setTasks] = useState<CleaningTask[]>([]);
  const [groupedTasks, setGroupedTasks] = useState<GroupedTasks>({});

  useEffect(() => {
    const filteredTasks = filterTasksByFrequency(cleaningTasks, frequency);
    setTasks(filteredTasks);

    const grouped = filteredTasks.reduce((acc, task) => {
      if (!acc[task.area]) {
        acc[task.area] = [];
      }
      acc[task.area].push(task);
      return acc;
    }, {} as GroupedTasks);

    setGroupedTasks(grouped);
  }, [frequency]);

  const handleTaskComplete = (taskId: string, completed: boolean) => {
    const updatedTasks = tasks.map(task => 
      task.id === taskId ? { ...task, completed } : task
    );
    setTasks(updatedTasks);

    // Update grouped tasks
    const updatedGrouped = updatedTasks.reduce((acc, task) => {
      if (!acc[task.area]) {
        acc[task.area] = [];
      }
      acc[task.area].push(task);
      return acc;
    }, {} as GroupedTasks);
    
    setGroupedTasks(updatedGrouped);
  };

  return {
    tasks,
    groupedTasks,
    handleTaskComplete
  };
};