import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Button
} from '@mui/material';
import { useColdStorage } from './hooks/useColdStorage';
import TemperatureTable from './TemperatureTable';
import { useSave } from '../../context/SaveContext';
import SaveIcon from '@mui/icons-material/Save';

const ColdStorageControl = () => {
  const { 
    temperatures, 
    handleTemperatureChange, 
    isTemperatureInRange,
    resetTemperatures,
    loading 
  } = useColdStorage();
  const { triggerSave } = useSave();

  const handleSave = async () => {
    await triggerSave();
    resetTemperatures();
  };

  return (
    <Paper sx={{ p: 2, mb: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">
          Kühlhäuser Temperatur Kontrolle
        </Typography>
        <Button
          variant="contained"
          startIcon={<SaveIcon />}
          onClick={handleSave}
          size="small"
        >
          Speichern
        </Button>
      </Box>
      <TemperatureTable
        temperatures={temperatures}
        onTemperatureChange={handleTemperatureChange}
        isTemperatureInRange={isTemperatureInRange}
        loading={loading}
      />
    </Paper>
  );
};

export default ColdStorageControl;