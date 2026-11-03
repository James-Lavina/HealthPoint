import React from 'react';
import { levelMeta } from '../utils/health';
import type { ReadingLevel } from '../types/session';

const shown: ReadingLevel[] = ['normal', 'attention', 'outside'];

export function LevelLegend() {
  return (
    <ul className="flex flex-wrap items-center gap-x-6 gap-y-2" aria-label="Colour guide">
      {shown.map((level) =>
      <li key={level} className="flex items-center gap-2 text-body text-ink-muted">
          <span className={`h-3.5 w-3.5 rounded-full ${levelMeta[level].dot}`} aria-hidden="true" />
          <span>
            <span className="font-semibold text-ink">{levelMeta[level].label}</span>
          </span>
        </li>
      )}
    </ul>);

}