import { useEffect } from 'react';
import { useSave } from '../context/SaveContext';

export const useSaveData = (saveHandler: () => void) => {
  const { registerSaveHandler, unregisterSaveHandler } = useSave();

  useEffect(() => {
    registerSaveHandler(saveHandler);
    return () => unregisterSaveHandler(saveHandler);
  }, [saveHandler, registerSaveHandler, unregisterSaveHandler]);
};