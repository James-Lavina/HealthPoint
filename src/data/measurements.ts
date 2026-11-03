import {
  ActivityIcon,
  HeartPulseIcon,
  RulerIcon,
  ScaleIcon,
  ThermometerIcon,
  type LucideIcon } from
'lucide-react';
import type { MeasurementId } from '../types/session';

export interface MeasurementDefinition {
  id: MeasurementId;
  slug: string;
  name: string;
  unit: string;
  icon: LucideIcon;
  instruction: string;
  durationLabel: string;
  durationMs: number;
  steps: string[];
  positioning: string;
  phases: string[];
  sampleDisplay: string;
  sampleValues: number[];
  reference: string;
}

export const measurements: MeasurementDefinition[] = [
{
  id: 'bloodPressure',
  slug: 'blood-pressure',
  name: 'Blood Pressure',
  unit: 'mmHg',
  icon: ActivityIcon,
  instruction: 'Sit down, rest your arm in the cuff, and stay still.',
  durationLabel: 'About 1 minute',
  durationMs: 7000,
  steps: [
  'Sit on the chair and rest your back against it.',
  'Slide your left arm, palm facing up, into the cuff on the right of the screen.',
  'Rest your arm on the armrest so the cuff is level with your heart.',
  'Stay still and avoid talking while the cuff tightens.'],

  positioning: 'Feet flat on the floor, legs uncrossed, and your arm relaxed and supported.',
  phases: ['Inflating cuff', 'Reading your pressure', 'Releasing cuff'],
  sampleDisplay: '120/80',
  sampleValues: [120, 80],
  reference: 'At or below 120/80 mmHg'
},
{
  id: 'heartRate',
  slug: 'heart-rate',
  name: 'Heart Rate',
  unit: 'BPM',
  icon: HeartPulseIcon,
  instruction: 'Rest one fingertip lightly on the pulse sensor.',
  durationLabel: 'About 30 seconds',
  durationMs: 5000,
  steps: [
  'Place your index finger gently on the glowing pulse sensor.',
  'Rest your hand flat on the pad beside the sensor.',
  'Breathe normally and keep your hand still.'],

  positioning: 'A light touch works best. Pressing hard can affect the reading.',
  phases: ['Finding your pulse', 'Counting heartbeats', 'Confirming reading'],
  sampleDisplay: '75',
  sampleValues: [75],
  reference: '60–100 BPM at rest'
},
{
  id: 'temperature',
  slug: 'body-temperature',
  name: 'Body Temperature',
  unit: '°C',
  icon: ThermometerIcon,
  instruction: 'Face the forehead sensor above the screen.',
  durationLabel: 'About 10 seconds',
  durationMs: 4000,
  steps: [
  'Stand facing the screen, about one hand-width from the sensor.',
  'Move hair, hats, or glasses away from your forehead.',
  'Look straight at the sensor until you hear a beep.'],

  positioning: 'Keep your forehead 3–5 cm from the sensor at the top of the screen.',
  phases: ['Detecting forehead', 'Reading temperature'],
  sampleDisplay: '36.7',
  sampleValues: [36.7],
  reference: '36.1–37.2 °C'
},
{
  id: 'height',
  slug: 'height',
  name: 'Height',
  unit: 'cm',
  icon: RulerIcon,
  instruction: 'Remove your shoes and stand straight on the platform.',
  durationLabel: 'About 15 seconds',
  durationMs: 4500,
  steps: [
  'Remove your shoes and any hat.',
  'Step onto the platform with your back to the measuring column.',
  'Stand tall with heels together and look straight ahead.'],

  positioning: 'Your heels, back, and the back of your head should touch the column.',
  phases: ['Lowering head guide', 'Measuring height'],
  sampleDisplay: '170',
  sampleValues: [170],
  reference: 'Used to calculate BMI'
},
{
  id: 'weight',
  slug: 'weight',
  name: 'Weight',
  unit: 'kg',
  icon: ScaleIcon,
  instruction: 'Step onto the scale and stand still.',
  durationLabel: 'About 15 seconds',
  durationMs: 4500,
  steps: [
  'Put down bags, coats, and phones.',
  'Step onto the centre of the scale platform.',
  'Stand still with your arms relaxed at your sides.'],

  positioning: 'Keep both feet on the footprint markers and avoid leaning on the rails.',
  phases: ['Stabilising scale', 'Measuring weight'],
  sampleDisplay: '65',
  sampleValues: [65],
  reference: 'Used to calculate BMI'
}];