import React from 'react';
import { TableRow, TableCell, TextField, Alert } from '@mui/material';
import { TemperatureEntry } from '../../types';

interface TemperatureRowProps {
  entry: TemperatureEntry;
  onTemperatureChange: (id: string, value: string) => void;
  isInRange: (entry: TemperatureEntry) => boolean;
}

const TemperatureRow: React.FC<TemperatureRowProps> = ({ 
  entry, 
  onTemperatureChange, 
  isInRange 
}) => {
  const isValid = isInRange(entry);

  return (
    <TableRow key={entry.id}>
      <TableCell>{entry.location}</TableCell>
      <TableCell>{`${entry.minTemp}°C bis ${entry.maxTemp}°C`}</TableCell>
      <TableCell>
        <TextField
          size="small"
          type="number"
          value={entry.temperature ?? ''}
          onChange={(e) => onTemperatureChange(entry.id, e.target.value)}
          inputProps={{ 
            step: "0.1",
            style: { 
              color: entry.temperature !== null && !isValid ? 'red' : 'inherit'
            }
          }}
        />
      </TableCell>
      <TableCell>{entry.time}</TableCell>
      <TableCell>
        {entry.temperature !== null && (
          <Alert 
            severity={isValid ? "success" : "error"} 
            sx={{ py: 0 }}
          >
            {isValid ? "OK" : "Prüfen!"}
          </Alert>
        )}
      </TableCell>
    </TableRow>
  );
};

export default TemperatureRow;