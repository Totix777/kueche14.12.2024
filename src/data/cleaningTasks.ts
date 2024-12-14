import { CleaningTask } from '../types';

export const cleaningTasks: CleaningTask[] = [
  // Tägliche Aufgaben
  {
    id: 'sw1',
    area: 'Speisenwägen Raum',
    task: 'Speisewagen Am Schloßpark reinigen',
    frequency: 'daily'
  },
  {
    id: 'sw2',
    area: 'Speisenwägen Raum',
    task: 'Speisewagen Am Ebertpark reinigen',
    frequency: 'daily'
  },
  {
    id: 'sw3',
    area: 'Speisenwägen Raum',
    task: 'Speisewagen Am Rheinufer reinigen',
    frequency: 'daily'
  },
  {
    id: 'sw4',
    area: 'Speisenwägen Raum',
    task: 'Speisewagen An den Seen reinigen',
    frequency: 'daily'
  },
  {
    id: 'sw5',
    area: 'Speisenwägen Raum',
    task: 'Boden reinigen',
    frequency: 'daily'
  },
  {
    id: 'sk1',
    area: 'Spülküche',
    task: 'Spülmaschine reinigen',
    frequency: 'daily'
  },
  {
    id: 'sk2',
    area: 'Spülküche',
    task: 'Spülbecken reinigen',
    frequency: 'daily'
  },
  {
    id: 'sk3',
    area: 'Spülküche',
    task: 'Boden reinigen',
    frequency: 'daily'
  },
  {
    id: 'sk4',
    area: 'Spülküche',
    task: 'Abfluss reinigen',
    frequency: 'daily'
  },
  {
    id: 'k1',
    area: 'Küche',
    task: 'Kühlschrank Temperatur kontrollieren',
    frequency: 'daily'
  },
  {
    id: 'k3',
    area: 'Küche',
    task: 'Boden reinigen',
    frequency: 'daily'
  },
  {
    id: 'k4',
    area: 'Küche',
    task: 'Abfluss reinigen',
    frequency: 'daily'
  },
  {
    id: 'k5',
    area: 'Küche',
    task: 'Oberflächen reinigen',
    frequency: 'daily'
  },

  // Wöchentliche Aufgaben
  {
    id: 't2',
    area: 'Trockenlager',
    task: 'Boden reinigen',
    frequency: 'weekly'
  },

  // Monatliche Aufgaben
  {
    id: 'k2',
    area: 'Küche',
    task: 'Kühlschrank intern reinigen',
    frequency: 'monthly'
  },
  {
    id: 't1',
    area: 'Trockenlager',
    task: 'Regale reinigen',
    frequency: 'monthly'
  },
  {
    id: 'kb1',
    area: 'Küchenbedarf Lager',
    task: 'Kontrolle durchführen',
    frequency: 'monthly'
  }
];