import { CleaningTask, FrequencyTab } from '../types';

export const filterTasksByFrequency = (tasks: CleaningTask[], frequency: FrequencyTab): CleaningTask[] => {
  return tasks.filter(task => task.frequency === frequency);
};