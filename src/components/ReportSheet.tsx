import React from 'react';
import { Logo } from './Logo';
import { kioskLocation } from '../data/journey';
import { buildReadings, getSkipped, levelMeta } from '../utils/health';
import { formatLongDate, formatSex, formatTime } from '../utils/format';
import type { MeasurementId, MeasurementStatus, UserInfo } from '../types/session';

interface ReportSheetProps {
  user: UserInfo;
  sessionId: string;
  date: Date;
  statuses: Record<MeasurementId, MeasurementStatus>;
}

export function ReportSheet({ user, sessionId, date, statuses }: ReportSheetProps) {
  const readings = buildReadings(statuses);
  const skipped = getSkipped(statuses);
  const info = [
  { label: 'Name', value: user.fullName || '—' },
  { label: 'Age', value: user.age ? `${user.age} years` : '—' },
  { label: 'Sex', value: formatSex(user.sex) },
  { label: 'Date', value: formatLongDate(date) },
  { label: 'Time', value: formatTime(date) },
  { label: 'Report ID', value: sessionId }];


  return (
    <article
      aria-label="Health report preview"
      className="mx-auto w-full max-w-[760px] rounded-lg bg-white p-10 shadow-card ring-1 ring-line lg:p-12">
      
      <header className="flex items-start justify-between gap-6 border-b-2 border-brand pb-6">
        <Logo size="sm" />
        <div className="text-right">
          <p className="text-[20px] font-bold text-ink">Health Check Report</p>
          <p className="mt-1 text-[15px] text-ink-muted">{kioskLocation}</p>
        </div>
      </header>

      <dl className="mt-6 grid grid-cols-2 gap-x-10 gap-y-3 sm:grid-cols-3">
        {info.map((i) =>
        <div key={i.label}>
            <dt className="text-sm text-ink-muted">{i.label}</dt>
            <dd className="text-[16px] font-semibold text-ink">{i.value}</dd>
          </div>
        )}
      </dl>

      <table className="mt-8 w-full text-left text-[15px]">
        <thead>
          <tr className="border-b border-line text-sm text-ink-muted">
            <th scope="col" className="py-2 font-medium">Measurement</th>
            <th scope="col" className="py-2 font-medium">Result</th>
            <th scope="col" className="hidden py-2 font-medium sm:table-cell">Reference</th>
            <th scope="col" className="py-2 font-medium">Indicator</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {readings.map((r) =>
          <tr key={r.id}>
              <td className="py-3 font-medium text-ink">{r.name}</td>
              <td className="py-3 font-bold text-ink">
                {r.display}
                {r.unit !== 'BMI' && <span className="ml-1 font-normal text-ink-muted">{r.unit}</span>}
              </td>
              <td className="hidden py-3 text-ink-muted sm:table-cell">{r.reference}</td>
              <td className="py-3">
                <span className="inline-flex items-center gap-2 whitespace-nowrap text-ink">
                  <span className={`h-2.5 w-2.5 rounded-full ${levelMeta[r.level].dot}`} aria-hidden="true" />
                  {levelMeta[r.level].label}
                </span>
              </td>
            </tr>
          )}
          {skipped.map((m) =>
          <tr key={m.id}>
              <td className="py-3 font-medium text-ink-muted">{m.name}</td>
              <td className="py-3 text-ink-muted">—</td>
              <td className="hidden py-3 text-ink-muted sm:table-cell">{m.reference}</td>
              <td className="py-3 text-ink-muted">Not measured</td>
            </tr>
          )}
        </tbody>
      </table>

      <footer className="mt-8 rounded-md bg-canvas p-4 text-sm leading-6 text-ink-muted">
        This report shows general health measurements taken at a self-service kiosk. It is not a
        medical diagnosis and does not replace a consultation with a qualified health professional.
      </footer>
    </article>);

}