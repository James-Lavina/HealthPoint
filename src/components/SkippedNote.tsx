import React from 'react';
import { CircleDashedIcon } from 'lucide-react';
import type { MeasurementDefinition } from '../data/measurements';

interface SkippedNoteProps {
  skipped: MeasurementDefinition[];
}

export function SkippedNote({ skipped }: SkippedNoteProps) {
  if (skipped.length === 0) return null;
  return (
    <p className="flex items-start gap-3 text-body text-ink-muted">
      <CircleDashedIcon className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
      <span>
        <span className="font-semibold text-ink">Not measured today:</span>{' '}
        {skipped.map((m) => m.name).join(', ')}.
      </span>
    </p>);

}