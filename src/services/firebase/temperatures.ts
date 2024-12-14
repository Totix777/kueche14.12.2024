import { saveCollection, loadCollection } from './base';
import { COLLECTIONS } from './collections';
import { TemperatureEntry } from '../../types';

export const saveTemperatures = (temperatures: TemperatureEntry[], date: string) => 
  saveCollection(COLLECTIONS.TEMPERATURES, temperatures, date);

export const loadTemperatures = (date: string) => 
  loadCollection<TemperatureEntry>(COLLECTIONS.TEMPERATURES, date);