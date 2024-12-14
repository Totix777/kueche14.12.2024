import React, { useState } from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import TaskManager from '../TaskManager/TaskManager';
import { FrequencyTab } from '../../types';

const TaskFrequencyManager = () => {
  const [frequency, setFrequency] = useState<FrequencyTab>('daily');

  const handleChange = (_: React.SyntheticEvent, newValue: FrequencyTab) => {
    setFrequency(newValue);
  };

  return (
    <Box>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
        <Tabs 
          value={frequency} 
          onChange={handleChange}
        >
          <Tab label="Tägliche Aufgaben" value="daily" />
          <Tab label="Wöchentliche Aufgaben" value="weekly" />
          <Tab label="14-Tägige Aufgaben" value="biweekly" />
          <Tab label="Monatliche Aufgaben" value="monthly" />
        </Tabs>
      </Box>

      <TaskManager frequency={frequency} />
    </Box>
  );
};

export default TaskFrequencyManager;