import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { cleaningTasks } from '../data/cleaningTasks';
import { CleaningTask } from '../types';
import { format } from 'date-fns';
import { 
  Box, 
  FormControl, 
  InputLabel, 
  MenuItem, 
  Select,
  Typography 
} from '@mui/material';

const TaskManager = () => {
  const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [tasks, setTasks] = useState<CleaningTask[]>(cleaningTasks);

  const columns = [
    { field: 'area', headerName: 'Bereich', width: 200 },
    { field: 'task', headerName: 'Aufgabe', width: 300 },
    { field: 'frequency', headerName: 'Häufigkeit', width: 130 },
    {
      field: 'completed',
      headerName: 'Erledigt',
      width: 130,
      type: 'boolean',
      editable: true,
    }
  ];

  const handleTaskComplete = (params: any) => {
    const updatedTasks = tasks.map(task => 
      task.id === params.id ? { ...task, completed: params.value } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <Box sx={{ height: 600, width: '100%' }}>
      <Typography variant="h5" gutterBottom>
        Tägliche Aufgaben
      </Typography>
      <FormControl sx={{ mb: 2, minWidth: 200 }}>
        <InputLabel>Datum</InputLabel>
        <Select
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        >
          {[...Array(7)].map((_, i) => {
            const date = new Date();
            date.setDate(date.getDate() + i);
            const formattedDate = format(date, 'yyyy-MM-dd');
            return (
              <MenuItem key={formattedDate} value={formattedDate}>
                {format(date, 'dd.MM.yyyy')}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <DataGrid
        rows={tasks}
        columns={columns}
        onCellEditCommit={handleTaskComplete}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}

export default TaskManager;