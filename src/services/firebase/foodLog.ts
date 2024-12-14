import { saveCollection, loadCollection } from './base';
import { COLLECTIONS } from './collections';
import { FoodEntry } from '../../types';

export const saveFoodLog = async (entries: FoodEntry[], date: string) => {
  try {
    await saveCollection(COLLECTIONS.FOOD_LOG, entries, date);
  } catch (error) {
    console.error('Error saving food log:', error);
    throw error;
  }
};

export const loadFoodLog = async (date: string) => {
  try {
    return await loadCollection<FoodEntry>(COLLECTIONS.FOOD_LOG, date);
  } catch (error) {
    console.error('Error loading food log:', error);
    return [];
  }
};