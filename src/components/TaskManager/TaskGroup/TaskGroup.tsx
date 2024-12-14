import React from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableContainer
} from '@mui/material';
import { TaskListHeader } from './TaskListHeader';
import TaskRow from './TaskRow';
import { TaskGroupProps } from '../types';

const TaskGroup: React.FC<TaskGroupProps> = ({ area, tasks, onTaskComplete }) => {
  return (
    <Paper sx={{ mb: 3, overflow: 'hidden' }}>
      <TableContainer>
        <Table size="small">
          <TaskListHeader area={area} />
          <TableBody>
            {tasks.map((task) => (
              <TaskRow
                key={task.id}
                task={task}
                onComplete={onTaskComplete}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default TaskGroup;