import { CleaningTask, TemperatureEntry } from '../types';

const TASKS_STORAGE_KEY = 'kitchen-tasks';
const TEMPERATURES_STORAGE_KEY = 'kitchen-temperatures';

export const saveTasks = (tasks: CleaningTask[]): void => {
  try {
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error('Error saving tasks:', error);
  }
};

export const loadTasks = (): CleaningTask[] => {
  try {
    const saved = localStorage.getItem(TASKS_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error('Error loading tasks:', error);
    return [];
  }
};

export const saveTemperatures = (temperatures: TemperatureEntry[]): void => {
  try {
    localStorage.setItem(TEMPERATURES_STORAGE_KEY, JSON.stringify(temperatures));
  } catch (error) {
    console.error('Error saving temperatures:', error);
  }
};

export const loadTemperatures = (): TemperatureEntry[] => {
  try {
    const saved = localStorage.getItem(TEMPERATURES_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error('Error loading temperatures:', error);
    return [];
  }
};