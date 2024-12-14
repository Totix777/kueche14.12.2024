export type FrequencyTab = 'daily' | 'weekly' | 'biweekly' | 'monthly';

export interface CleaningTask {
  id: string;
  area: string;
  task: string;
  frequency: FrequencyTab;
  completed?: boolean;
  completedBy?: string;
  completedAt?: Timestamp;
  date?: string;
}

export interface FoodEntry {
  id: string;
  name: string;
  temperature: number;
  time: string;
  date: string;
  checkedBy?: string;
}

export interface OrderItem {
  articleNumber: string;
  description: string;
  unit: string;
  orderUnit: string;
  quantity: number;
}

export interface TemperatureEntry {
  id: string;
  location: string;
  temperature: number | null;
  time: string;
  date: string;
  minTemp: number;
  maxTemp: number;
  checkedBy?: string;
}