import React, { useState } from 'react';
import { 
  Box,
  Button,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Alert,
  CircularProgress
} from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useFirestoreFoodLog } from '../hooks/useFirestoreFoodLog';

const FoodLogger = () => {
  const [newEntry, setNewEntry] = useState({ name: '', temperature: '' });
  const { currentUser } = useAuth();
  const { entries, addEntry, loading } = useFirestoreFoodLog();

  const handleAdd = async () => {
    const now = new Date();
    if (now.getHours() < 11) {
      alert('Einträge sind erst ab 11 Uhr möglich');
      return;
    }

    if (!newEntry.name || !newEntry.temperature) {
      alert('Bitte füllen Sie alle Felder aus');
      return;
    }

    try {
      await addEntry({
        name: newEntry.name,
        temperature: parseFloat(newEntry.temperature),
        time: now.toLocaleTimeString('de-DE'),
        date: now.toLocaleDateString('de-DE'),
        checkedBy: currentUser || '-'
      });

      setNewEntry({ name: '', temperature: '' });
    } catch (error) {
      alert('Fehler beim Speichern des Eintrags');
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight={200}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Lebensmittel Temperaturprotokoll
      </Typography>
      
      <Box sx={{ mb: 2 }}>
        <TextField
          label="Lebensmittel"
          value={newEntry.name}
          onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
          sx={{ mr: 2 }}
        />
        <TextField
          label="Temperatur (°C)"
          type="number"
          value={newEntry.temperature}
          onChange={(e) => setNewEntry({ ...newEntry, temperature: e.target.value })}
          sx={{ mr: 2 }}
          inputProps={{ step: "0.1" }}
        />
        <Button 
          variant="contained" 
          onClick={handleAdd}
          disabled={!newEntry.name || !newEntry.temperature}
        >
          Hinzufügen
        </Button>
      </Box>

      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Zeit</TableCell>
              <TableCell>Datum</TableCell>
              <TableCell>Lebensmittel</TableCell>
              <TableCell>Temperatur (°C)</TableCell>
              <TableCell>Kontrolliert von</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {entries.map((entry) => (
              <TableRow key={entry.id}>
                <TableCell>{entry.time}</TableCell>
                <TableCell>{entry.date}</TableCell>
                <TableCell>{entry.name}</TableCell>
                <TableCell>{entry.temperature}</TableCell>
                <TableCell>{entry.checkedBy}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

export default FoodLogger;