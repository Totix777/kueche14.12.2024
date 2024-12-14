import { CleaningTask, TemperatureEntry, FoodEntry } from '../types';

const createCSV = (headers: string[], rows: string[][]) => {
  const csvContent = [headers, ...rows]
    .map(row => row.join(';'))
    .join('\n');
  return '\uFEFF' + csvContent; // Add BOM for Excel UTF-8 compatibility
};

export const downloadCSV = (content: string, filename: string) => {
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url); // Clean up
};

export const tasksToCSV = (tasks: CleaningTask[]) => {
  const headers = [
    'Datum',
    'Bereich',
    'Aufgabe',
    'Häufigkeit',
    'Status',
    'Erledigt von',
    'Erledigt am'
  ];

  const rows = tasks.map(task => [
    task.date || '',
    task.area,
    task.task,
    task.frequency,
    task.completed ? 'Erledigt' : 'Offen',
    task.completedBy || '',
    task.completedAt ? new Date(task.completedAt.seconds * 1000).toLocaleString('de-DE') : ''
  ]);

  return createCSV(headers, rows);
};

export const temperaturesToCSV = (temperatures: TemperatureEntry[]) => {
  const headers = [
    'Datum',
    'Uhrzeit',
    'Bereich',
    'Minimum Temperatur',
    'Maximum Temperatur',
    'Gemessene Temperatur',
    'Status',
    'Kontrolliert von'
  ];

  const rows = temperatures.map(temp => {
    const status = temp.temperature !== null 
      ? (temp.temperature >= temp.minTemp && temp.temperature <= temp.maxTemp 
        ? 'OK' 
        : 'Nicht im Bereich')
      : '';

    return [
      temp.date,
      temp.time,
      temp.location,
      temp.minTemp.toString(),
      temp.maxTemp.toString(),
      temp.temperature?.toString() || '',
      status,
      temp.checkedBy || ''
    ];
  });

  return createCSV(headers, rows);
};

export const foodLogToCSV = (entries: FoodEntry[]) => {
  const headers = [
    'Datum',
    'Uhrzeit',
    'Lebensmittel',
    'Temperatur',
    'Kontrolliert von'
  ];

  const rows = entries.map(entry => [
    entry.date,
    entry.time,
    entry.name,
    entry.temperature.toString(),
    entry.checkedBy || ''
  ]);

  return createCSV(headers, rows);
};