import React from 'react';

interface BmiScaleProps {
  bmi: number;
}

const MIN = 15;
const MAX = 35;
const segments = [
{ label: 'Below', from: MIN, to: 18.5, color: 'bg-warning' },
{ label: 'Healthy', from: 18.5, to: 25, color: 'bg-success' },
{ label: 'Above', from: 25, to: 30, color: 'bg-warning' },
{ label: 'High', from: 30, to: MAX, color: 'bg-danger' }];


export function BmiScale({ bmi }: BmiScaleProps) {
  const position = (Math.min(MAX, Math.max(MIN, bmi)) - MIN) / (MAX - MIN) * 100;
  return (
    <div aria-hidden="true">
      <div className="relative pt-9">
        <div className="absolute top-0 -translate-x-1/2" style={{ left: `${position}%` }}>
          <span className="block rounded-md bg-ink px-2 py-0.5 text-sm font-semibold text-white">
            {bmi.toFixed(1)}
          </span>
          <span className="mx-auto block h-0 w-0 border-x-[6px] border-t-[6px] border-x-transparent border-t-ink" />
        </div>
        <div className="flex h-3 gap-1 overflow-hidden rounded-full">
          {segments.map((s) =>
          <span
            key={s.label}
            className={s.color}
            style={{ width: `${(s.to - s.from) / (MAX - MIN) * 100}%` }} />

          )}
        </div>
      </div>
      <div className="mt-2 flex text-sm text-ink-muted">
        {segments.map((s) =>
        <span key={s.label} style={{ width: `${(s.to - s.from) / (MAX - MIN) * 100}%` }}>
            {s.label}
          </span>
        )}
      </div>
    </div>);

}