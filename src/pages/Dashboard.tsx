import React from 'react';
import { ArrowLeftIcon, ArrowRightIcon, ClipboardListIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { PageLayout } from '../components/PageLayout';
import { Button } from '../components/Button';
import { MeasurementCard } from '../components/MeasurementCard';
import { measurements } from '../data/measurements';
import { useSession } from '../contexts/SessionContext';

export function Dashboard() {
  const { user, statuses, openMeasurement, completedCount, allComplete, goTo } = useSession();
  const nextId = measurements.find((m) => statuses[m.id] !== 'completed')?.id;
  const firstName = user.fullName.split(' ')[0];
  const total = measurements.length;

  return (
    <PageLayout
      title={firstName ? `Let's take your measurements, ${firstName}` : "Let's take your measurements"}
      subtitle="Do as many as you like, in any order. Only need one? Measure it, then tap Finish & View Results."
      aside={
      <div className="w-full max-w-sm lg:w-80" aria-live="polite">
          <div className="flex items-baseline justify-between">
            <span className="text-body font-medium text-ink-muted">Progress</span>
            <span className="text-card font-semibold text-ink">
              {completedCount} of {total} completed
            </span>
          </div>
          <div
          className="mt-3 h-3 overflow-hidden rounded-full bg-line"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={total}
          aria-valuenow={completedCount}
          aria-label="Measurements completed">
          
            <motion.div
            className="h-full rounded-full bg-brand"
            initial={false}
            animate={{ width: `${completedCount / total * 100}%` }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }} />
          
          </div>
        </div>
      }
      footerLeft={
      <Button variant="outline" icon={ArrowLeftIcon} onClick={() => goTo('info')}>
          Back
        </Button>
      }
      footerRight={
      <>
          {!allComplete &&
        <p className="hidden max-w-sm text-right text-body text-ink-muted lg:block">
              {completedCount === 0 ?
          'Complete at least one measurement to see your results.' :
          'Done for today? You can view results with what you have.'}
            </p>
        }
          <Button
          size="xl"
          icon={ClipboardListIcon}
          iconRight={ArrowRightIcon}
          disabled={completedCount === 0}
          onClick={() => goTo('results')}>
          
            {allComplete || completedCount === 0 ? 'View My Results' : 'Finish & View Results'}
          </Button>
        </>
      }>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 min-[1800px]:grid-cols-5 min-[1800px]:gap-x-5 min-[1800px]:gap-y-0">
        {measurements.map((m) =>
        <MeasurementCard
          key={m.id}
          def={m}
          status={statuses[m.id]}
          isNext={m.id === nextId}
          onStart={() => openMeasurement(m.id)} />

        )}
      </div>
    </PageLayout>);

}