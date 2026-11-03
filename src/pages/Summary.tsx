import React from 'react';
import { ArrowLeftIcon, ArrowRightIcon, HeartHandshakeIcon, PrinterIcon, StethoscopeIcon } from 'lucide-react';
import { PageLayout } from '../components/PageLayout';
import { Button } from '../components/Button';
import { LevelBadge } from '../components/LevelBadge';
import { BmiScale } from '../components/BmiScale';
import { healthReminders } from '../data/journey';
import { useSession } from '../contexts/SessionContext';
import { SkippedNote } from '../components/SkippedNote';
import { bmiCategory, buildReadings, getSessionBmi, getSkipped } from '../utils/health';
import { formatLongDate, formatSex, formatTime } from '../utils/format';

export function Summary() {
  const { user, startedAt, sessionId, goTo, statuses } = useSession();
  const readings = buildReadings(statuses);
  const bmi = getSessionBmi(statuses);
  const skipped = getSkipped(statuses);
  const bmiReading = readings.find((r) => r.id === 'bmi');

  const details = [
  { label: 'Name', value: user.fullName || '—' },
  { label: 'Age', value: user.age ? `${user.age} years` : '—' },
  { label: 'Sex', value: formatSex(user.sex) },
  { label: 'Date', value: formatLongDate(startedAt) },
  { label: 'Time', value: formatTime(startedAt) },
  { label: 'Session', value: sessionId }];


  return (
    <PageLayout
      title="Your health summary"
      subtitle="A plain-language overview of today's check. Take your time reading it."
      footerLeft={
      <Button variant="outline" icon={ArrowLeftIcon} onClick={() => goTo('results')}>
          Back
        </Button>
      }
      footerRight={
      <Button size="xl" icon={PrinterIcon} iconRight={ArrowRightIcon} onClick={() => goTo('print')}>
          Preview & Print Report
        </Button>
      }>
      
      <div className="grid grid-cols-1 gap-8 2xl:grid-cols-[minmax(0,1fr)_460px]">
        <section aria-labelledby="readings-title" className="rounded-2xl bg-white shadow-card ring-1 ring-line">
          <h2 id="readings-title" className="px-8 pt-8 text-section font-bold text-ink lg:px-10">
            Your readings explained
          </h2>
          <ul className="mt-4 divide-y divide-line">
            {readings.map((r) => {
              const Icon = r.icon;
              return (
                <li key={r.id} className="grid grid-cols-[56px_minmax(0,1fr)] gap-x-5 px-8 py-6 lg:grid-cols-[56px_220px_minmax(0,1fr)] lg:px-10">
                  <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-brand-50 text-brand-dark">
                    <Icon className="h-7 w-7" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-body font-medium text-ink-muted">{r.name}</p>
                    <p className="mt-0.5 text-[30px] font-bold leading-9 tracking-tight text-ink">
                      {r.display}
                      {r.unit !== 'BMI' &&
                      <span className="ml-1.5 text-body font-medium tracking-normal text-ink-muted">{r.unit}</span>
                      }
                    </p>
                  </div>
                  <div className="col-span-2 mt-4 lg:col-span-1 lg:mt-0">
                    <LevelBadge level={r.level} />
                    <p className="mt-2 text-body text-ink">{r.explanation}</p>
                  </div>
                </li>);

            })}
          </ul>
          {skipped.length > 0 &&
          <div className="border-t border-line px-8 py-6 lg:px-10">
              <SkippedNote skipped={skipped} />
            </div>
          }
        </section>

        <div className="grid grid-cols-1 content-start gap-6 lg:grid-cols-2 2xl:grid-cols-1">
          <section aria-labelledby="details-title" className="rounded-2xl bg-white p-8 shadow-card ring-1 ring-line">
            <h2 id="details-title" className="text-card font-semibold text-ink">
              Session details
            </h2>
            <dl className="mt-5 space-y-3">
              {details.map((d) =>
              <div key={d.label} className="flex justify-between gap-6 text-body">
                  <dt className="text-ink-muted">{d.label}</dt>
                  <dd className="text-right font-semibold text-ink">{d.value}</dd>
                </div>
              )}
            </dl>
          </section>

          {bmi !== null &&
          <section aria-labelledby="bmi-title" className="rounded-2xl bg-white p-8 shadow-card ring-1 ring-line">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 id="bmi-title" className="text-card font-semibold text-ink">
                  Your BMI
                </h2>
                <p className="mt-1 text-body text-ink-muted">{bmiCategory(bmi)}</p>
              </div>
              <p className="text-[42px] font-bold leading-none tracking-tight text-ink">{bmi.toFixed(1)}</p>
            </div>
            <div className="mt-6">
              <BmiScale bmi={bmi} />
            </div>
            <p className="mt-5 text-[15px] leading-6 text-ink-muted">
              Calculated from your height (170 cm) and weight (65 kg).
              {bmiReading?.level === 'normal' && ' Healthy range is 18.5–24.9.'}
            </p>
          </section>
          }

          <section aria-labelledby="reminders-title" className="rounded-2xl bg-brand-50 p-8">
            <h2 id="reminders-title" className="flex items-center gap-3 text-card font-semibold text-ink">
              <HeartHandshakeIcon className="h-6 w-6 text-brand-dark" aria-hidden="true" />
              General health reminders
            </h2>
            <ul className="mt-4 space-y-3">
              {healthReminders.map((r) =>
              <li key={r} className="flex gap-3 text-body text-ink">
                  <span className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  {r}
                </li>
              )}
            </ul>
          </section>
        </div>
      </div>

      <aside className="mt-8 flex items-start gap-4 rounded-2xl bg-white p-6 ring-2 ring-warning/50">
        <StethoscopeIcon className="mt-0.5 h-6 w-6 shrink-0 text-warning-dark" aria-hidden="true" />
        <p className="text-body text-ink">
          <strong className="font-semibold">Important:</strong> HealthPoint provides general health
          measurements only. It does not diagnose any condition and does not replace a consultation
          with a doctor, nurse, or other qualified health professional.
        </p>
      </aside>
    </PageLayout>);

}