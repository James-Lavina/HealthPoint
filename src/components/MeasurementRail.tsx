import React from 'react';
import { CheckCircle2Icon } from 'lucide-react';
import { measurements } from '../data/measurements';
import type { MeasurementId, MeasurementStatus } from '../types/session';

interface MeasurementRailProps {
  activeId: MeasurementId;
  statuses: Record<MeasurementId, MeasurementStatus>;
  locked: boolean;
  onSelect: (id: MeasurementId) => void;
}

const statusText: Record<MeasurementStatus, string> = {
  not_started: 'Not Started',
  measuring: 'Measuring',
  completed: 'Completed'
};

export function MeasurementRail({ activeId, statuses, locked, onSelect }: MeasurementRailProps) {
  return (
    <nav aria-label="All measurements" className="rounded-2xl bg-white p-4 shadow-card ring-1 ring-line">
      <ul className="space-y-1">
        {measurements.map(({ id, name, icon: Icon }) => {
          const active = id === activeId;
          const status = statuses[id];
          return (
            <li key={id}>
              <button
                type="button"
                disabled={locked && !active}
                onClick={() => onSelect(id)}
                aria-current={active ? 'step' : undefined}
                className={`flex min-h-[72px] w-full items-center gap-4 rounded-xl px-4 py-3 text-left transition-colors duration-150 ease-out focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/40 disabled:cursor-not-allowed disabled:opacity-50 ${
                active ? 'bg-brand-50' : 'hover:bg-canvas'}`
                }>
                
                <span
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${
                  status === 'completed' ?
                  'bg-success-light text-success-dark' :
                  active ?
                  'bg-brand text-white' :
                  'bg-canvas text-ink-muted'}`
                  }>
                  
                  {status === 'completed' && !active ?
                  <CheckCircle2Icon className="h-6 w-6" aria-hidden="true" /> :

                  <Icon className="h-6 w-6" aria-hidden="true" />
                  }
                </span>
                <span className="min-w-0">
                  <span className={`block text-body font-semibold ${active ? 'text-brand-deep' : 'text-ink'}`}>
                    {name}
                  </span>
                  <span
                    className={`block text-[15px] font-medium ${
                    status === 'completed' ?
                    'text-success-dark' :
                    status === 'measuring' ?
                    'text-info-dark' :
                    'text-ink-muted'}`
                    }>
                    
                    {statusText[status]}
                  </span>
                </span>
              </button>
            </li>);

        })}
      </ul>
    </nav>);

}