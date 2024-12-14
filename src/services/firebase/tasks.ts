import { saveCollection, loadCollection } from './base';
import { COLLECTIONS } from './collections';
import { CleaningTask } from '../../types';

export const saveTasks = (tasks: CleaningTask[], date: string) => 
  saveCollection(COLLECTIONS.TASKS, tasks, date);

export const loadTasks = (date: string) => 
  loadCollection<CleaningTask>(COLLECTIONS.TASKS, date);