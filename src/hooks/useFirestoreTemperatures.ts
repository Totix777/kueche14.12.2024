import { useEffect } from 'react';
import { useFirestoreCollection } from './useFirestoreCollection';
import { TemperatureEntry } from '../types';
import { COLLECTIONS } from '../services/firebase/collections';
import { temperatureRanges } from '../data/temperatureRanges';

export const useFirestoreTemperatures = (date: string) => {
  const defaultTemperatures = temperatureRanges.map(range => ({
    id: `temp-${Date.now()}-${range.location}`,
    location: range.location,
    temperature: null,
    time: '',
    date,
    minTemp: range.minTemp,
    maxTemp: range.maxTemp
  }));

  const { data: temperatures, setData: setTemperatures, loading, error, refresh } = 
    useFirestoreCollection<TemperatureEntry>(
      COLLECTIONS.TEMPERATURES,
      date,
      defaultTemperatures
    );

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { temperatures, setTemperatures, loading, error };
};