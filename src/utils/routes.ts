import { measurements } from '../data/measurements';
import type { MeasurementId, ScreenId } from '../types/session';

export const screenPaths: Record<Exclude<ScreenId, 'instruction'>, string> = {
  welcome: '/',
  info: '/details',
  dashboard: '/measurements',
  results: '/results',
  summary: '/summary',
  print: '/print'
};

export function measurePath(id: MeasurementId): string {
  const def = measurements.find((m) => m.id === id);
  return `/measure/${def?.slug ?? ''}`;
}

export function parseLocation(pathname: string): {screen: ScreenId;activeId: MeasurementId | null;} {
  const path = pathname.replace(/\/+$/, '') || '/';
  if (path.startsWith('/measure/')) {
    const slug = path.slice('/measure/'.length);
    const def = measurements.find((m) => m.slug === slug);
    return def ? { screen: 'instruction', activeId: def.id } : { screen: 'dashboard', activeId: null };
  }
  const match = (Object.keys(screenPaths) as Array<keyof typeof screenPaths>).find(
    (key) => screenPaths[key] === path
  );
  return { screen: match ?? 'welcome', activeId: null };
}