import React, { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Typography,
  CircularProgress,
  Alert,
  Snackbar
} from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { format } from 'date-fns';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import { 
  downloadCSV, 
  tasksToCSV, 
  temperaturesToCSV,
  foodLogToCSV 
} from '../utils/csvUtils';
import { 
  CleaningTask, 
  TemperatureEntry,
  FoodEntry 
} from '../types';

const ExportData = () => {
  const [open, setOpen] = useState(false);
  const [startDate, setStartDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [endDate, setEndDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [dataType, setDataType] = useState<'tasks' | 'temperatures' | 'foodLog'>('tasks');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleExport = async () => {
    try {
      setLoading(true);
      setError(null);

      const collectionRef = collection(db, dataType);
      const q = query(
        collectionRef,
        where('date', '>=', startDate),
        where('date', '<=', endDate)
      );

      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id.split('_')[1]
      }));

      if (data.length === 0) {
        setError('Keine Daten für den ausgewählten Zeitraum gefunden.');
        return;
      }

      let csvContent: string;
      let filename: string;

      switch (dataType) {
        case 'tasks':
          csvContent = tasksToCSV(data as CleaningTask[]);
          filename = `Aufgaben_${startDate}_bis_${endDate}.csv`;
          break;
        case 'temperatures':
          csvContent = temperaturesToCSV(data as TemperatureEntry[]);
          filename = `Temperaturen_${startDate}_bis_${endDate}.csv`;
          break;
        case 'foodLog':
          csvContent = foodLogToCSV(data as FoodEntry[]);
          filename = `Lebensmittel_${startDate}_bis_${endDate}.csv`;
          break;
        default:
          throw new Error('Ungültiger Datentyp');
      }

      downloadCSV(csvContent, filename);
      setOpen(false);
    } catch (error) {
      console.error('Error exporting data:', error);
      setError('Fehler beim Exportieren der Daten.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        variant="outlined"
        startIcon={<FileDownloadIcon />}
        onClick={() => setOpen(true)}
        sx={{ position: 'fixed', bottom: 20, left: 20 }}
      >
        Daten Exportieren
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Daten Exportieren</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 2, minWidth: 300 }}>
            <FormControl fullWidth>
              <InputLabel>Datentyp</InputLabel>
              <Select
                value={dataType}
                label="Datentyp"
                onChange={(e) => setDataType(e.target.value as typeof dataType)}
              >
                <MenuItem value="tasks">Aufgaben</MenuItem>
                <MenuItem value="temperatures">Temperaturen</MenuItem>
                <MenuItem value="foodLog">Lebensmittel Temperaturprotokoll</MenuItem>
              </Select>
            </FormControl>

            <Typography variant="subtitle2" gutterBottom>
              Zeitraum auswählen:
            </Typography>

            <TextField
              label="Von"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />

            <TextField
              label="Bis"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} disabled={loading}>
            Abbrechen
          </Button>
          <Button 
            onClick={handleExport} 
            variant="contained"
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : null}
          >
            {loading ? 'Exportiere...' : 'Exportieren'}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar 
        open={!!error} 
        autoHideDuration={6000} 
        onClose={() => setError(null)}
      >
        <Alert severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ExportData;