import { CleaningTask, FrequencyTab } from '../../types';

export interface TaskListProps {
  frequency: FrequencyTab;
  date: string;
}

export interface TaskGroupProps {
  area: string;
  tasks: CleaningTask[];
  onTaskComplete: (taskId: string, completed: boolean) => void;
}

export interface TaskRowProps {
  task: CleaningTask;
  onComplete: (taskId: string, completed: boolean) => void;
}

export interface GroupedTasks {
  [key: string]: CleaningTask[];
}