import { saveCollection, loadCollection } from './base';
import { COLLECTIONS } from './collections';
import { SalesEntry } from '../../types';

export const saveSales = async (sales: SalesEntry[], date: string) => {
  try {
    await saveCollection(COLLECTIONS.SALES, sales, date);
  } catch (error) {
    console.error('Error saving sales:', error);
    throw error;
  }
};

export const loadSales = async (startDate: string, endDate: string) => {
  try {
    const sales = await loadCollection<SalesEntry>(COLLECTIONS.SALES, startDate);
    return sales.filter(sale => 
      sale.date >= startDate && 
      sale.date <= endDate
    );
  } catch (error) {
    console.error('Error loading sales:', error);
    return [];
  }
};