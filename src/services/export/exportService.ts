import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { CleaningTask, TemperatureEntry, FoodEntry } from '../../types';

export type ExportDataType = 'tasks' | 'temperatures' | 'foodLog';

interface ExportResult {
  data: any[];
  error?: string;
}

export const fetchExportData = async (
  dataType: ExportDataType,
  startDate: string,
  endDate: string
): Promise<ExportResult> => {
  try {
    const collectionRef = collection(db, dataType);
    const q = query(
      collectionRef,
      where('date', '>=', startDate),
      where('date', '<=', endDate)
    );

    const snapshot = await getDocs(q);
    const data = snapshot.docs.map(doc => {
      const docData = doc.data();
      return {
        ...docData,
        id: doc.id.split('_')[1],
        date: docData.date || doc.id.split('_')[0]
      };
    });

    return { data };
  } catch (error) {
    console.error('Error fetching export data:', error);
    return {
      data: [],
      error: 'Fehler beim Laden der Daten.'
    };
  }
}