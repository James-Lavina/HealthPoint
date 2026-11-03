import React from 'react';
import { ClockIcon, PlayIcon, RotateCcwIcon } from 'lucide-react';
import { Button } from './Button';
import { StatusBadge } from './StatusBadge';
import type { MeasurementDefinition } from '../data/measurements';
import type { MeasurementStatus } from '../types/session';

interface MeasurementCardProps {
  def: MeasurementDefinition;
  status: MeasurementStatus;
  isNext: boolean;
  onStart: () => void;
}

export function MeasurementCard({ def, status, isNext, onStart }: MeasurementCardProps) {
  const Icon = def.icon;
  const completed = status === 'completed';

  return (
    <article
      aria-label={`${def.name}, ${completed ? 'completed' : 'not started'}`}
      className={`flex min-w-0 flex-col rounded-2xl bg-white p-6 shadow-card min-[1800px]:row-span-4 min-[1800px]:grid min-[1800px]:[grid-template-rows:subgrid] ${
      isNext ? 'ring-2 ring-brand' : 'ring-1 ring-line'}`
      }>
      
      <div className="flex items-start justify-between gap-3">
        <span
          className={`flex h-16 w-16 items-center justify-center rounded-xl ${
          completed ? 'bg-success-light text-success-dark' : 'bg-brand-50 text-brand-dark'}`
          }>
          
          <Icon className="h-8 w-8" aria-hidden="true" />
        </span>
        <StatusBadge status={status} />
      </div>

      <div className="pt-6">
        <h2 className="text-card font-semibold text-ink">{def.name}</h2>
        <p className="mt-2 text-body text-ink-muted">{def.instruction}</p>
      </div>

      <div className="mt-6 border-t border-line pt-5">
        {completed ?
        <div>
            <p className="text-[15px] font-medium text-ink-muted">Your reading</p>
            <p className="mt-1 text-[36px] font-bold leading-[44px] tracking-tight text-ink">
              {def.sampleDisplay}{' '}
              <span className="text-[18px] font-medium tracking-normal text-ink-muted">{def.unit}</span>
            </p>
          </div> :

        <p className="flex items-center gap-2 text-body text-ink-muted">
            <ClockIcon className="h-5 w-5" aria-hidden="true" />
            {def.durationLabel}
          </p>
        }
      </div>

      <div className="mt-auto pt-6 min-[1800px]:mt-0">
        <Button
          fullWidth
          variant={completed ? 'outline' : 'primary'}
          icon={completed ? RotateCcwIcon : PlayIcon}
          onClick={onStart}
          aria-label={`${completed ? 'Measure again' : 'Start measurement'}: ${def.name}`}>
          
          {completed ? 'Measure Again' : 'Start Measurement'}
        </Button>
      </div>
    </article>);

}