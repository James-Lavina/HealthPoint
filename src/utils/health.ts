import { GaugeIcon, type LucideIcon } from 'lucide-react';
import { measurements } from '../data/measurements';
import type { MeasurementId, MeasurementStatus, ReadingLevel } from '../types/session';

export interface ReadingSummary {
  id: MeasurementId | 'bmi';
  name: string;
  icon: LucideIcon;
  display: string;
  unit: string;
  level: ReadingLevel;
  reference: string;
  explanation: string;
}

export const levelMeta: Record<
  ReadingLevel,
  {label: string;badge: string;dot: string;legend: string;}> =
{
  normal: {
    label: 'Within range',
    badge: 'bg-success-light text-success-dark',
    dot: 'bg-success',
    legend: 'Within the reference range'
  },
  attention: {
    label: 'Needs attention',
    badge: 'bg-warning-light text-warning-dark',
    dot: 'bg-warning',
    legend: 'Close to the edge of the range'
  },
  outside: {
    label: 'Outside range',
    badge: 'bg-danger-light text-danger-dark',
    dot: 'bg-danger',
    legend: 'Outside the reference range'
  },
  recorded: {
    label: 'Recorded',
    badge: 'bg-info-light text-info-dark',
    dot: 'bg-info',
    legend: 'Recorded, no range applies'
  }
};

export function classifyReading(id: MeasurementId, values: number[]): ReadingLevel {
  switch (id) {
    case 'bloodPressure':{
        const [sys, dia] = values;
        if (sys <= 120 && dia <= 80 && sys >= 90 && dia >= 60) return 'normal';
        if (sys <= 139 && dia <= 89 && sys >= 85) return 'attention';
        return 'outside';
      }
    case 'heartRate':{
        const [bpm] = values;
        if (bpm >= 60 && bpm <= 100) return 'normal';
        if (bpm >= 50 && bpm <= 120) return 'attention';
        return 'outside';
      }
    case 'temperature':{
        const [t] = values;
        if (t >= 36.1 && t <= 37.2) return 'normal';
        if (t >= 35.5 && t <= 37.9) return 'attention';
        return 'outside';
      }
    default:
      return 'recorded';
  }
}

export function computeBmi(heightCm: number, weightKg: number): number {
  const m = heightCm / 100;
  return Math.round(weightKg / (m * m) * 10) / 10;
}

export function classifyBmi(bmi: number): ReadingLevel {
  if (bmi >= 18.5 && bmi < 25) return 'normal';
  if (bmi >= 17 && bmi < 18.5 || bmi >= 25 && bmi < 30) return 'attention';
  return 'outside';
}

export function bmiCategory(bmi: number): string {
  if (bmi < 18.5) return 'Below healthy range';
  if (bmi < 25) return 'Healthy range';
  if (bmi < 30) return 'Above healthy range';
  return 'Well above healthy range';
}

const explanations: Record<MeasurementId | 'bmi', Partial<Record<ReadingLevel, string>>> = {
  bloodPressure: {
    normal:
    'Your blood pressure is within the commonly used reference range. It shows how strongly blood pushes against your artery walls.',
    attention:
    'Slightly above the reference range. Try re-measuring after resting for 5 minutes and mention it at your next check-up.',
    outside:
    'Outside the reference range. Please rest and measure again, and consider speaking with a health professional.'
  },
  heartRate: {
    normal: 'Your resting heart rate is within the usual range for adults of 60 to 100 beats per minute.',
    attention: 'Slightly outside the usual resting range. Activity, caffeine, or stress can affect this.',
    outside: 'Outside the usual resting range. Consider re-measuring and speaking with a health professional.'
  },
  temperature: {
    normal: 'Your body temperature is within the typical range for a healthy adult.',
    attention: 'Slightly outside the typical range. Recent activity or the room temperature can affect this.',
    outside: 'Outside the typical range. If you feel unwell, please speak with a health professional.'
  },
  height: {
    recorded: 'Your height is used together with your weight to calculate your BMI.'
  },
  weight: {
    recorded: 'Your weight is used together with your height to calculate your BMI.'
  },
  bmi: {
    normal:
    'A BMI between 18.5 and 24.9 is within the commonly used healthy range for adults. BMI is a general guide and does not measure body fat directly.',
    attention:
    'Your BMI is slightly outside the healthy range of 18.5 to 24.9. BMI is a general guide and does not measure body fat directly.',
    outside:
    'Your BMI is outside the healthy range of 18.5 to 24.9. A health professional can help you understand what this means for you.'
  }
};

export function explainReading(id: MeasurementId | 'bmi', level: ReadingLevel): string {
  return explanations[id][level] ?? '';
}

type StatusMap = Record<MeasurementId, MeasurementStatus>;

export function getSkipped(statuses: StatusMap) {
  return measurements.filter((m) => statuses[m.id] !== 'completed');
}

export function buildReadings(statuses: StatusMap): ReadingSummary[] {
  const readings: ReadingSummary[] = measurements.filter((m) => statuses[m.id] === 'completed').map((m) => {
    const level = classifyReading(m.id, m.sampleValues);
    return {
      id: m.id,
      name: m.name,
      icon: m.icon,
      display: m.sampleDisplay,
      unit: m.unit,
      level,
      reference: m.reference,
      explanation: explainReading(m.id, level)
    };
  });
  const bmi = getSessionBmi(statuses);
  if (bmi === null) return readings;
  const bmiLevel = classifyBmi(bmi);
  readings.push({
    id: 'bmi',
    name: 'Body Mass Index',
    icon: GaugeIcon,
    display: bmi.toFixed(1),
    unit: 'BMI',
    level: bmiLevel,
    reference: '18.5–24.9 healthy range',
    explanation: explainReading('bmi', bmiLevel)
  });
  return readings;
}

export function getSessionBmi(statuses: StatusMap): number | null {
  if (statuses.height !== 'completed' || statuses.weight !== 'completed') return null;
  const height = measurements.find((m) => m.id === 'height')?.sampleValues[0] ?? 0;
  const weight = measurements.find((m) => m.id === 'weight')?.sampleValues[0] ?? 0;
  return computeBmi(height, weight);
}