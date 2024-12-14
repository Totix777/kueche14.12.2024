import React from 'react';
import { TableRow, TableCell, Tooltip } from '@mui/material';
import { StyledCheckbox } from './StyledCheckbox';
import { TaskRowProps } from './types';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';

const TaskRow: React.FC<TaskRowProps> = ({ task, onComplete }) => {
  const completionInfo = task.completed && task.completedBy ? (
    <Tooltip title={`Erledigt von ${task.completedBy} am ${
      task.completedAt ? format(task.completedAt.toDate(), 'dd.MM.yyyy HH:mm', { locale: de }) : ''
    }`}>
      <span>✓ {task.completedBy}</span>
    </Tooltip>
  ) : null;

  return (
    <TableRow 
      sx={{
        backgroundColor: task.completed ? 'rgba(76, 175, 80, 0.08)' : 'inherit',
        '&:hover': {
          backgroundColor: task.completed 
            ? 'rgba(76, 175, 80, 0.12)' 
            : 'rgba(0, 0, 0, 0.04)'
        }
      }}
    >
      <TableCell>{task.task}</TableCell>
      <TableCell align="center" sx={{ width: '150px' }}>
        <StyledCheckbox
          checked={task.completed || false}
          onChange={(e) => onComplete(task.id, e.target.checked)}
        />
        {completionInfo}
      </TableCell>
    </TableRow>
  );
};

export default TaskRow;