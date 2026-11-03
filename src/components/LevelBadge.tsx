import React from 'react';
import { AlertTriangleIcon, CheckCircle2Icon, InfoIcon, OctagonAlertIcon } from 'lucide-react';
import { levelMeta } from '../utils/health';
import type { ReadingLevel } from '../types/session';

interface LevelBadgeProps {
  level: ReadingLevel;
  size?: 'md' | 'sm';
}

const icons = {
  normal: CheckCircle2Icon,
  attention: AlertTriangleIcon,
  outside: OctagonAlertIcon,
  recorded: InfoIcon
};

export function LevelBadge({ level, size = 'md' }: LevelBadgeProps) {
  const Icon = icons[level];
  const meta = levelMeta[level];
  const sizing = size === 'md' ? 'px-3 py-1.5 text-[15px]' : 'px-2.5 py-1 text-sm';
  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full font-semibold ${meta.badge} ${sizing}`}>
      
      <Icon className="h-4 w-4" aria-hidden="true" />
      {meta.label}
    </span>);

}