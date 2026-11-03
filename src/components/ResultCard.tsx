import React from 'react';
import { LevelBadge } from './LevelBadge';
import type { ReadingSummary } from '../utils/health';

interface ResultCardProps {
  reading: ReadingSummary;
}

export function ResultCard({ reading }: ResultCardProps) {
  const Icon = reading.icon;
  return (
    <article className="flex flex-col rounded-2xl bg-white p-8 shadow-card ring-1 ring-line">
      <div className="flex items-center gap-4">
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-dark">
          <Icon className="h-7 w-7" aria-hidden="true" />
        </span>
        <h2 className="min-w-0 text-card font-semibold text-ink">{reading.name}</h2>
      </div>
      <div className="mt-6">
        <LevelBadge level={reading.level} />
      </div>
      <p className="mt-3 text-[48px] font-bold leading-[56px] tracking-tight text-ink">
        {reading.display}
        {reading.unit !== 'BMI' &&
        <span className="ml-2 text-[22px] font-medium tracking-normal text-ink-muted">{reading.unit}</span>
        }
      </p>
      <div className="mt-auto pt-6">
        <p className="border-t border-line pt-5 text-body text-ink-muted">
          Reference: <span className="font-medium text-ink">{reading.reference}</span>
        </p>
      </div>
    </article>);

}