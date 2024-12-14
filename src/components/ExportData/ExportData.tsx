import React, { useState } from 'react';
import { Button, Snackbar, Alert } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { format } from 'date-fns';
import { downloadCSV, tasksToCSV, temperaturesToCSV, foodLogToCSV } from '../../utils/csvUtils';
import { ExportDataType, fetchExportData } from '../../services/export/exportService';
import ExportDataDialog from './ExportDataDialog';

const ExportData = () => {
  const [open, setOpen] = useState(false);
  const [startDate, setStartDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [endDate, setEndDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [dataType, setDataType] = useState<ExportDataType>('tasks');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleExport = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await fetchExportData(dataType, startDate, endDate);

      if (fetchError) {
        setError(fetchError);
        return;
      }

      if (data.length === 0) {
        setError('Keine Daten für den ausgewählten Zeitraum gefunden.');
        return;
      }

      let csvContent: string;
      let filename: string;

      switch (dataType) {
        case 'tasks':
          csvContent = tasksToCSV(data);
          filename = `Aufgaben_${startDate}_bis_${endDate}.csv`;
          break;
        case 'temperatures':
          csvContent = temperaturesToCSV(data);
          filename = `Temperaturen_${startDate}_bis_${endDate}.csv`;
          break;
        case 'foodLog':
          csvContent = foodLogToCSV(data);
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

      <ExportDataDialog
        open={open}
        onClose={() => setOpen(false)}
        onExport={handleExport}
        loading={loading}
        startDate={startDate}
        endDate={endDate}
        dataType={dataType}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
        onDataTypeChange={setDataType}
      />

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