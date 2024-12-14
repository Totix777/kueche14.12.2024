import { collection, doc, getDocs, setDoc, query, where, Timestamp } from 'firebase/firestore';
import { db } from '../config/firebase';
import { CleaningTask, TemperatureEntry } from '../types';

// Collections
const TASKS_COLLECTION = 'tasks';
const TEMPERATURES_COLLECTION = 'temperatures';

// Tasks
export const saveTasks = async (tasks: CleaningTask[]): Promise<void> => {
  try {
    const date = new Date().toISOString().split('T')[0];
    await setDoc(doc(db, TASKS_COLLECTION, date), {
      tasks,
      timestamp: Timestamp.now()
    });
  } catch (error) {
    console.error('Error saving tasks:', error);
    throw error;
  }
};

export const loadTasks = async (date?: string): Promise<CleaningTask[]> => {
  try {
    const tasksRef = collection(db, TASKS_COLLECTION);
    let q;
    
    if (date) {
      q = query(tasksRef, where('date', '==', date));
    } else {
      q = query(tasksRef);
    }

    const querySnapshot = await getDocs(q);
    const latestDoc = querySnapshot.docs
      .sort((a, b) => b.data().timestamp.seconds - a.data().timestamp.seconds)[0];

    return latestDoc ? latestDoc.data().tasks : [];
  } catch (error) {
    console.error('Error loading tasks:', error);
    return [];
  }
};

// Temperatures
export const saveTemperatures = async (temperatures: TemperatureEntry[]): Promise<void> => {
  try {
    const date = new Date().toISOString().split('T')[0];
    await setDoc(doc(db, TEMPERATURES_COLLECTION, date), {
      temperatures,
      timestamp: Timestamp.now()
    });
  } catch (error) {
    console.error('Error saving temperatures:', error);
    throw error;
  }
};

export const loadTemperatures = async (date?: string): Promise<TemperatureEntry[]> => {
  try {
    const tempsRef = collection(db, TEMPERATURES_COLLECTION);
    let q;
    
    if (date) {
      q = query(tempsRef, where('date', '==', date));
    } else {
      q = query(tempsRef);
    }

    const querySnapshot = await getDocs(q);
    const latestDoc = querySnapshot.docs
      .sort((a, b) => b.data().timestamp.seconds - a.data().timestamp.seconds)[0];

    return latestDoc ? latestDoc.data().temperatures : [];
  } catch (error) {
    console.error('Error loading temperatures:', error);
    return [];
  }
};