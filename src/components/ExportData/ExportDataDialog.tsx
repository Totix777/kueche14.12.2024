import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Stack,
  Typography,
  CircularProgress
} from '@mui/material';
import { ExportDataType } from '../../services/export/exportService';

interface ExportDataDialogProps {
  open: boolean;
  onClose: () => void;
  onExport: () => void;
  loading: boolean;
  startDate: string;
  endDate: string;
  dataType: ExportDataType;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
  onDataTypeChange: (type: ExportDataType) => void;
}

const ExportDataDialog: React.FC<ExportDataDialogProps> = ({
  open,
  onClose,
  onExport,
  loading,
  startDate,
  endDate,
  dataType,
  onStartDateChange,
  onEndDateChange,
  onDataTypeChange,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Daten Exportieren</DialogTitle>
      <DialogContent>
        <Stack spacing={3} sx={{ mt: 2, minWidth: 300 }}>
          <FormControl fullWidth>
            <InputLabel>Datentyp</InputLabel>
            <Select
              value={dataType}
              label="Datentyp"
              onChange={(e) => onDataTypeChange(e.target.value as ExportDataType)}
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
            onChange={(e) => onStartDateChange(e.target.value)}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            label="Bis"
            type="date"
            value={endDate}
            onChange={(e) => onEndDateChange(e.target.value)}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Abbrechen
        </Button>
        <Button 
          onClick={onExport} 
          variant="contained"
          disabled={loading}
          startIcon={loading ? <CircularProgress size={20} /> : null}
        >
          {loading ? 'Exportiere...' : 'Exportieren'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};