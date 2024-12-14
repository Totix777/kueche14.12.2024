import { useState, useEffect, useCallback } from 'react';
import { temperatureRanges } from '../../../data/temperatureRanges';
import { TemperatureEntry } from '../../../types';
import { useFirestoreTemperatures } from '../../../hooks';
import { useSave } from '../../../context/SaveContext';
import { Timestamp } from 'firebase/firestore';

export const useColdStorage = () => {
  const date = new Date().toISOString().split('T')[0];
  const { temperatures: savedTemps, setTemperatures, loading } = useFirestoreTemperatures(date);
  const [localTemperatures, setLocalTemperatures] = useState<TemperatureEntry[]>([]);
  const { registerSaveHandler, unregisterSaveHandler } = useSave();

  const resetTemperatures = useCallback(() => {
    setLocalTemperatures(prev => prev.map(temp => ({
      ...temp,
      temperature: null,
      time: ''
    })));
  }, []);

  // Initialize temperatures
  useEffect(() => {
    if (!loading) {
      const initialTemps = temperatureRanges.map(range => {
        const savedTemp = savedTemps.find(t => t.location === range.location);
        return savedTemp || {
          id: `temp-${Date.now()}-${range.location}`,
          location: range.location,
          temperature: null,
          time: '',
          date,
          minTemp: range.minTemp,
          maxTemp: range.maxTemp
        };
      });
      setLocalTemperatures(initialTemps);
    }
  }, [loading, savedTemps, date]);

  // Register save handler
  useEffect(() => {
    const handleSave = async () => {
      const tempsToSave = localTemperatures.map(temp => ({
        ...temp,
        timestamp: Timestamp.now()
      }));
      await setTemperatures(tempsToSave);
      return { temperatures: tempsToSave };
    };

    registerSaveHandler(handleSave);
    return () => unregisterSaveHandler(handleSave);
  }, [localTemperatures, setTemperatures, registerSaveHandler, unregisterSaveHandler]);

  const handleTemperatureChange = (id: string, value: string) => {
    const temp = value === '' ? null : parseFloat(value);
    
    setLocalTemperatures(prev => prev.map(entry => 
      entry.id === id ? {
        ...entry,
        temperature: temp,
        time: temp !== null ? new Date().toLocaleTimeString('de-DE') : ''
      } : entry
    ));
  };

  const isTemperatureInRange = (entry: TemperatureEntry) => {
    if (entry.temperature === null) return true;
    return entry.temperature >= entry.minTemp && entry.temperature <= entry.maxTemp;
  };

  return {
    temperatures: localTemperatures,
    handleTemperatureChange,
    isTemperatureInRange,
    resetTemperatures,
    loading
  };
};