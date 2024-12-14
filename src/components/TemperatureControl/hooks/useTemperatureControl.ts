import { useState, useEffect } from 'react';
import { temperatureRanges } from '../../../data/temperatureRanges';
import { TemperatureEntry } from '../../../types';
import { useFirestoreTemperatures } from '../../../hooks';
import { useSave } from '../../../context/SaveContext';

export const useTemperatureControl = (date: string) => {
  const { temperatures, setTemperatures, loading } = useFirestoreTemperatures(date);
  const [localTemperatures, setLocalTemperatures] = useState<TemperatureEntry[]>([]);
  const { registerSaveHandler, unregisterSaveHandler } = useSave();

  useEffect(() => {
    if (!loading && temperatures.length === 0) {
      const initialTemps = temperatureRanges.map(range => ({
        id: `temp-${Date.now()}-${range.location}`,
        location: range.location,
        temperature: null,
        time: '',
        date: date,
        minTemp: range.minTemp,
        maxTemp: range.maxTemp
      }));
      setLocalTemperatures(initialTemps);
    } else if (!loading) {
      setLocalTemperatures(temperatures);
    }
  }, [loading, temperatures, date]);

  useEffect(() => {
    const handleSave = async () => {
      await setTemperatures(localTemperatures);
      setLocalTemperatures(temps => temps.map(temp => ({
        ...temp,
        temperature: null,
        time: ''
      })));
      return { temperatures: localTemperatures };
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
        time: new Date().toLocaleTimeString()
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
    loading
  };
};