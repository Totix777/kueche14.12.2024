import { format } from 'date-fns';

export const getCurrentDate = (): string => {
  return format(new Date(), 'yyyy-MM-dd');
};

export const formatDisplayDate = (date: string): string => {
  return format(new Date(date), 'dd.MM.yyyy');
};