import React from 'react';
import { TableRow, TableCell, Checkbox } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { TaskRowProps } from '../types';

const TaskRow: React.FC<TaskRowProps> = ({ task, onComplete }) => {
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
      <TableCell align="center" sx={{ width: '100px' }}>
        <Checkbox
          checked={task.completed || false}
          onChange={(e) => onComplete(task.id, e.target.checked)}
          icon={<RadioButtonUncheckedIcon />}
          checkedIcon={<CheckCircleIcon sx={{ color: 'success.main' }} />}
          sx={{
            '&.Mui-checked': {
              color: 'success.main',
            }
          }}
        />
      </TableCell>
    </TableRow>
  );
};

export default TaskRow;