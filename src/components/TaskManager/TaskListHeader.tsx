import React from 'react';
import { TableCell, TableHead, TableRow } from '@mui/material';

interface TaskListHeaderProps {
  area: string;
}

export const TaskListHeader: React.FC<TaskListHeaderProps> = ({ area }) => (
  <TableHead>
    <TableRow sx={{ bgcolor: 'primary.main' }}>
      <TableCell 
        colSpan={2} 
        sx={{ 
          color: 'primary.contrastText',
          fontWeight: 'bold',
          fontSize: '1.1rem',
          py: 1.5
        }}
      >
        {area}
      </TableCell>
    </TableRow>
    <TableRow>
      <TableCell sx={{ fontWeight: 'bold' }}>Aufgabe</TableCell>
      <TableCell align="center" sx={{ width: '100px', fontWeight: 'bold' }}>Erledigt</TableCell>
    </TableRow>
  </TableHead>
);