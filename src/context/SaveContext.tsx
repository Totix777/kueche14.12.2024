import React, { createContext, useContext, useState, useCallback } from 'react';
import { useFirestore } from '../hooks/useFirestore';
import { Snackbar, Alert } from '@mui/material';

interface SaveContextType {
  triggerSave: () => Promise<void>;
  registerSaveHandler: (handler: () => Promise<{ tasks?: any[], temperatures?: any[] }>) => void;
  unregisterSaveHandler: (handler: () => Promise<{ tasks?: any[], temperatures?: any[] }>) => void;
}

const SaveContext = createContext<SaveContextType | null>(null);

export const SaveProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [saveHandlers] = useState<Set<() => Promise<{ tasks?: any[], temperatures?: any[] }>>>(new Set());
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
    open: false,
    message: '',
    severity: 'success'
  });
  
  const { saveTasks, saveTemperatures } = useFirestore();

  const triggerSave = useCallback(async () => {
    try {
      const results = await Promise.all(Array.from(saveHandlers).map(handler => handler()));
      
      const date = new Date().toISOString().split('T')[0];
      
      for (const result of results) {
        if (result.tasks) {
          await saveTasks(result.tasks, date);
        }
        if (result.temperatures) {
          await saveTemperatures(result.temperatures, date);
        }
      }

      setSnackbar({
        open: true,
        message: 'Erfolgreich gespeichert',
        severity: 'success'
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Fehler beim Speichern',
        severity: 'error'
      });
    }
  }, [saveHandlers, saveTasks, saveTemperatures]);

  const registerSaveHandler = useCallback((handler: () => Promise<{ tasks?: any[], temperatures?: any[] }>) => {
    saveHandlers.add(handler);
  }, [saveHandlers]);

  const unregisterSaveHandler = useCallback((handler: () => Promise<{ tasks?: any[], temperatures?: any[] }>) => {
    saveHandlers.delete(handler);
  }, [saveHandlers]);

  return (
    <SaveContext.Provider value={{ triggerSave, registerSaveHandler, unregisterSaveHandler }}>
      {children}
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={3000} 
        onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
      >
        <Alert severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </SaveContext.Provider>
  );
};

export const useSave = () => {
  const context = useContext(SaveContext);
  if (!context) {
    throw new Error('useSave must be used within a SaveProvider');
  }
  return context;
};