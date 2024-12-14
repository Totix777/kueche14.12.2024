import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Alert,
  CircularProgress,
  Box
} from '@mui/material';
import { TemperatureEntry } from '../../types';

interface TemperatureTableProps {
  temperatures: TemperatureEntry[];
  onTemperatureChange: (id: string, value: string) => void;
  isTemperatureInRange: (entry: TemperatureEntry) => boolean;
  loading: boolean;
}

const TemperatureTable: React.FC<TemperatureTableProps> = ({
  temperatures,
  onTemperatureChange,
  isTemperatureInRange,
  loading
}) => {
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" p={2}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <TableContainer>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Bereich</TableCell>
            <TableCell>Solltemperatur</TableCell>
            <TableCell>Temperatur (°C)</TableCell>
            <TableCell>Uhrzeit</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {temperatures.map((entry) => (
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
                      color: entry.temperature !== null && !isTemperatureInRange(entry) ? 'red' : 'inherit'
                    }
                  }}
                />
              </TableCell>
              <TableCell>{entry.time}</TableCell>
              <TableCell>
                {entry.temperature !== null && (
                  <Alert 
                    severity={isTemperatureInRange(entry) ? "success" : "error"} 
                    sx={{ py: 0 }}
                  >
                    {isTemperatureInRange(entry) ? "OK" : "Prüfen!"}
                  </Alert>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TemperatureTable;