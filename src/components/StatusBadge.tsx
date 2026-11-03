import React from 'react';
import { CheckCircle2Icon, CircleDashedIcon } from 'lucide-react';
import type { MeasurementStatus } from '../types/session';

interface StatusBadgeProps {
  status: MeasurementStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  if (status === 'completed') {
    return (
      <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-success-light px-3 py-1.5 text-[15px] font-semibold text-success-dark">
        <CheckCircle2Icon className="h-4 w-4" aria-hidden="true" />
        Completed
      </span>);

  }
  if (status === 'measuring') {
    return (
      <span className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-info-light px-3 py-1.5 text-[15px] font-semibold text-info-dark">
        <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-info opacity-60" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-info" />
        </span>
        Measuring
      </span>);

  }
  return (
    <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-canvas px-3 py-1.5 text-[15px] font-semibold text-ink-muted ring-1 ring-inset ring-line">
      <CircleDashedIcon className="h-4 w-4" aria-hidden="true" />
      Not Started
    </span>);

}