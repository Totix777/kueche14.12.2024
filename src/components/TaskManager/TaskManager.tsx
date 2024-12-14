import React from 'react';
import { Box } from '@mui/material';
import TaskList from './TaskList';
import ColdStorageControl from '../ColdStorageControl/ColdStorageControl';
import { FrequencyTab } from '../../types';
import { getCurrentDate } from '../../utils/dateUtils';

interface TaskManagerProps {
  frequency: FrequencyTab;
}

const TaskManager: React.FC<TaskManagerProps> = ({ frequency }) => {
  const currentDate = getCurrentDate();

  return (
    <Box sx={{ height: '100%', width: '100%', pb: 8 }}>
      <TaskList 
        frequency={frequency}
        date={currentDate}
      />
      
      {frequency === 'daily' && (
        <Box sx={{ mt: 4 }}>
          <ColdStorageControl />
        </Box>
      )}
    </Box>
  );
};

export default TaskManager;