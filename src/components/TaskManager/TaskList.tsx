import React from 'react';
import { Box, Typography } from '@mui/material';
import TaskGroup from './TaskGroup';
import { useTaskManager } from './hooks/useTaskManager';
import { TaskListProps } from './types';
import { formatDisplayDate } from '../../utils/dateUtils';

const TaskList: React.FC<TaskListProps> = ({ frequency, date }) => {
  const { groupedTasks, handleTaskComplete } = useTaskManager(frequency);

  return (
    <Box>
      <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
        Aufgaben für {formatDisplayDate(date)}
      </Typography>
      
      {Object.entries(groupedTasks).map(([area, areaTasks]) => (
        <TaskGroup
          key={area}
          area={area}
          tasks={areaTasks}
          onTaskComplete={handleTaskComplete}
        />
      ))}
    </Box>
  );
};

export default TaskList;