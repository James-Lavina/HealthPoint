import React from 'react';
import { ArrowLeftIcon, ArrowRightIcon, InfoIcon } from 'lucide-react';
import { PageLayout } from '../components/PageLayout';
import { Button } from '../components/Button';
import { ResultCard } from '../components/ResultCard';
import { LevelLegend } from '../components/LevelLegend';
import { useSession } from '../contexts/SessionContext';
import { SkippedNote } from '../components/SkippedNote';
import { buildReadings, getSkipped } from '../utils/health';
import { formatLongDate, formatTime } from '../utils/format';

export function Results() {
  const { goTo, startedAt, statuses } = useSession();
  const readings = buildReadings(statuses);
  const skipped = getSkipped(statuses);

  return (
    <PageLayout
      title="Your measurement results"
      subtitle={`Recorded ${formatLongDate(startedAt)} at ${formatTime(startedAt)}.`}
      aside={<LevelLegend />}
      footerLeft={
      <Button variant="outline" icon={ArrowLeftIcon} onClick={() => goTo('dashboard')}>
          Back to Measurements
        </Button>
      }
      footerRight={
      <Button size="xl" iconRight={ArrowRightIcon} onClick={() => goTo('summary')}>
          View Health Summary
        </Button>
      }>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 2xl:grid-cols-3">
        {readings.map((r) =>
        <ResultCard key={r.id} reading={r} />
        )}
      </div>
      {skipped.length > 0 &&
      <div className="mt-8">
          <SkippedNote skipped={skipped} />
        </div>
      }
      <p className="mt-6 flex items-center gap-3 rounded-xl bg-info-light px-6 py-4 text-body text-info-dark">
        <InfoIcon className="h-5 w-5 shrink-0" aria-hidden="true" />
        These readings are for general awareness only and are not a medical diagnosis. Please speak
        with a health professional about any concerns.
      </p>
    </PageLayout>);

}