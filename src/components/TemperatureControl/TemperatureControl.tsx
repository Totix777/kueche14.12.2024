import React from 'react';
import {
  Box,
  Paper,
  Typography,
  CircularProgress
} from '@mui/material';
import { formatDisplayDate } from '../../utils/dateUtils';
import { useTemperatureControl } from './hooks/useTemperatureControl';
import TemperatureTable from './TemperatureTable';

interface TemperatureControlProps {
  date: string;
}

const TemperatureControl: React.FC<TemperatureControlProps> = ({ date }) => {
  const { 
    temperatures, 
    handleTemperatureChange, 
    isTemperatureInRange, 
    loading 
  } = useTemperatureControl(date);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight={200}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Paper sx={{ p: 2, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Temperaturkontrolle Kühlhäuser - {formatDisplayDate(date)}
      </Typography>
      <TemperatureTable
        temperatures={temperatures}
        onTemperatureChange={handleTemperatureChange}
        isTemperatureInRange={isTemperatureInRange}
      />
    </Paper>
  );
};

export default TemperatureControl;