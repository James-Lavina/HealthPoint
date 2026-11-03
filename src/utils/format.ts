import { format } from 'date-fns';
import type { Sex } from '../types/session';

export function formatLongDate(date: Date): string {
  return format(date, 'EEEE, d MMMM yyyy');
}

export function formatTime(date: Date): string {
  return format(date, 'h:mm a');
}

export const sexLabels: Record<Sex, string> = {
  female: 'Female',
  male: 'Male',
  unspecified: 'Prefer not to say'
};

export function formatSex(sex: Sex | null): string {
  return sex ? sexLabels[sex] : '—';
}