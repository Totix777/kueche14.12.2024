import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import TemperatureRow from './TemperatureRow';
import { TemperatureEntry } from '../../types';

interface TemperatureTableProps {
  temperatures: TemperatureEntry[];
  onTemperatureChange: (id: string, value: string) => void;
  isTemperatureInRange: (entry: TemperatureEntry) => boolean;
}

const TemperatureTable: React.FC<TemperatureTableProps> = ({
  temperatures,
  onTemperatureChange,
  isTemperatureInRange
}) => {
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
            <TemperatureRow
              key={entry.id}
              entry={entry}
              onTemperatureChange={onTemperatureChange}
              isInRange={isTemperatureInRange}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TemperatureTable;