import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckCircle2Icon,
  CheckIcon,
  ClipboardListIcon,
  InfoIcon,
  PlayIcon,
  RotateCcwIcon,
  XIcon } from
'lucide-react';
import { PageLayout } from '../components/PageLayout';
import { Button } from '../components/Button';
import { LevelBadge } from '../components/LevelBadge';
import { MeasurementRail } from '../components/MeasurementRail';
import { ProgressRing } from '../components/ProgressRing';
import { measurements, type MeasurementDefinition } from '../data/measurements';
import { useSession } from '../contexts/SessionContext';
import { classifyReading, explainReading } from '../utils/health';
import type { MeasurementStatus } from '../types/session';
import { useScreenInit } from '../useScreenInit.js';

type Phase = 'ready' | 'measuring' | 'complete';
const ease = [0.23, 1, 0.32, 1] as const;

export function MeasurementGuide() {
  const { activeId } = useSession();
  const def = measurements.find((m) => m.id === activeId) ?? measurements[0];
  return <GuideContent key={def.id} def={def} />;
}

let phaseSeedUsed = false;

function GuideContent({ def }: {def: MeasurementDefinition;}) {
  const { statuses, setStatus, openMeasurement, goTo } = useSession();
  const screenInit = useScreenInit() as {phase?: Phase;};
  const [phase, setPhase] = useState<Phase>(() => {
    if (phaseSeedUsed || screenInit.phase !== 'complete' || statuses[def.id] !== 'completed') return 'ready';
    phaseSeedUsed = true;
    return 'complete';
  });
  const [progress, setProgress] = useState(0);
  const previousStatus = useRef<MeasurementStatus>(statuses[def.id]);
  const Icon = def.icon;
  const index = measurements.findIndex((m) => m.id === def.id);

  useEffect(() => {
    if (phase !== 'measuring') return;
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / def.durationMs);
      setProgress(p);
      if (p < 1) frame = requestAnimationFrame(tick);else
      {
        setStatus(def.id, 'completed');
        setPhase('complete');
      }
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [phase, def, setStatus]);

  const start = () => {
    previousStatus.current = statuses[def.id];
    setProgress(0);
    setStatus(def.id, 'measuring');
    setPhase('measuring');
  };

  const cancel = () => {
    setStatus(def.id, previousStatus.current);
    setPhase('ready');
    setProgress(0);
  };

  const nextDef = findNext(def.id, statuses);
  const level = classifyReading(def.id, def.sampleValues);
  const phaseIndex = Math.min(def.phases.length - 1, Math.floor(progress * def.phases.length));

  const footerLeft =
  phase === 'measuring' ?
  <Button variant="outline" icon={XIcon} onClick={cancel}>
        Cancel Measurement
      </Button> :

  <Button variant="outline" icon={ArrowLeftIcon} onClick={() => goTo('dashboard')}>
        {phase === 'complete' ? 'Back to Measurements' : 'Cancel'}
      </Button>;


  const footerRight =
  phase === 'ready' ?
  <Button size="xl" icon={PlayIcon} onClick={start} className="min-w-[320px]">
        Start Measurement
      </Button> :
  phase === 'measuring' ?
  <p className="text-body-lg font-medium text-ink-muted" aria-hidden="true">
        Please keep still…
      </p> :

  <>
        {nextDef &&
    <Button variant="secondary" icon={ClipboardListIcon} onClick={() => goTo('results')}>
            Finish & View Results
          </Button>
    }
        {nextDef ?
    <Button size="xl" iconRight={ArrowRightIcon} onClick={() => openMeasurement(nextDef.id)}>
            Next: {nextDef.name}
          </Button> :

    <Button size="xl" icon={ClipboardListIcon} iconRight={ArrowRightIcon} onClick={() => goTo('results')}>
            View My Results
          </Button>
    }
      </>;


  return (
    <PageLayout
      title={def.name}
      subtitle={
      phase === 'complete' ?
      'Your measurement is complete.' :
      'Read the steps, get into position, then tap Start Measurement. You can cancel at any time.'
      }
      aside={
      <p className="text-card font-semibold text-ink-muted">
          Measurement {index + 1} of {measurements.length}
        </p>
      }
      footerLeft={footerLeft}
      footerRight={footerRight}>
      
      <div className="grid grid-cols-1 gap-8 2xl:grid-cols-[320px_minmax(0,1fr)] 2xl:gap-10">
        <div className="hidden 2xl:block">
          <MeasurementRail
            activeId={def.id}
            statuses={statuses}
            locked={phase === 'measuring'}
            onSelect={(id) => id !== def.id && openMeasurement(id)} />
          
        </div>

        <div className="grid min-w-0 grid-cols-1 gap-8 lg:grid-cols-2">
          <section
            aria-label="Positioning guide"
            className="flex min-w-0 flex-col items-center justify-center rounded-2xl bg-brand-50 p-8 text-center lg:p-10">
            
            <div className="relative flex h-48 w-48 items-center justify-center rounded-full bg-white shadow-card xl:h-60 xl:w-60">
              {phase === 'measuring' &&
              <motion.span
                className="absolute inset-0 rounded-full ring-8 ring-brand/20"
                animate={{ scale: [1, 1.08, 1], opacity: [0.8, 0.3, 0.8] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                aria-hidden="true" />

              }
              {phase === 'complete' ?
              <CheckCircle2Icon className="h-28 w-28 text-success" strokeWidth={1.5} aria-hidden="true" /> :

              <Icon className="h-28 w-28 text-brand" strokeWidth={1.5} aria-hidden="true" />
              }
            </div>
            <h2 className="mt-10 text-card font-semibold text-ink">Correct position</h2>
            <p className="mt-2 max-w-md text-body-lg text-ink">{def.positioning}</p>
          </section>

          <section className="min-w-0 rounded-2xl bg-white p-8 shadow-card ring-1 ring-line lg:p-10" aria-live="polite">
            <AnimatePresence mode="wait" initial={false}>
              {phase === 'ready' &&
              <motion.div
                key="ready"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2, ease }}>
                
                  <h2 className="text-section font-bold text-ink">Follow these steps</h2>
                  <ol className="mt-8 space-y-6">
                    {def.steps.map((step, i) =>
                  <li key={step} className="flex gap-5">
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand text-[19px] font-bold text-white">
                          {i + 1}
                        </span>
                        <p className="pt-1.5 text-[19px] leading-[30px] text-ink">{step}</p>
                      </li>
                  )}
                  </ol>
                  <p className="mt-10 flex items-center gap-3 rounded-xl bg-info-light px-5 py-4 text-body text-info-dark">
                    <InfoIcon className="h-5 w-5 shrink-0" aria-hidden="true" />
                    Takes {def.durationLabel.toLowerCase()}. Relax and breathe normally.
                  </p>
                </motion.div>
              }

              {phase === 'measuring' &&
              <motion.div
                key="measuring"
                className="flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2, ease }}>
                
                  <ProgressRing progress={progress} size={232}>
                    <span className="text-value font-bold tabular-nums text-ink">{Math.round(progress * 100)}%</span>
                    <span className="mt-1 text-body text-ink-muted">Measuring</span>
                  </ProgressRing>
                  <p className="mt-8 text-section font-bold text-ink">{def.phases[phaseIndex]}…</p>
                  <p className="mt-2 text-body-lg text-ink-muted">Please stay still and relax.</p>
                  <ol className="mt-8 flex flex-wrap justify-center gap-3">
                    {def.phases.map((label, i) =>
                  <li
                    key={label}
                    className={`flex items-center gap-2 rounded-full px-4 py-2 text-[15px] font-semibold ${
                    i < phaseIndex ?
                    'bg-success-light text-success-dark' :
                    i === phaseIndex ?
                    'bg-info-light text-info-dark' :
                    'bg-canvas text-ink-muted'}`
                    }>
                    
                        {i < phaseIndex && <CheckIcon className="h-4 w-4" aria-hidden="true" />}
                        {label}
                      </li>
                  )}
                  </ol>
                </motion.div>
              }

              {phase === 'complete' &&
              <motion.div
                key="complete"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.24, ease }}>
                
                  <p className="flex items-center gap-2 text-body-lg font-semibold text-success-dark">
                    <CheckCircle2Icon className="h-6 w-6" aria-hidden="true" />
                    Measurement complete
                  </p>
                  <p className="mt-6 text-body font-medium text-ink-muted">Your {def.name.toLowerCase()}</p>
                  <p className="mt-1 text-[52px] font-bold leading-[60px] tracking-tight text-ink xl:text-[64px] xl:leading-[72px]">
                    {def.sampleDisplay}{' '}
                    <span className="text-[24px] font-medium tracking-normal text-ink-muted">{def.unit}</span>
                  </p>
                  <div className="mt-4 flex flex-wrap items-center gap-4">
                    <LevelBadge level={level} />
                    <span className="text-body text-ink-muted">Reference: {def.reference}</span>
                  </div>
                  <p className="mt-8 border-t border-line pt-6 text-body-lg text-ink">
                    {explainReading(def.id, level)}
                  </p>
                  <p className="mt-4 text-body text-ink-muted">
                    {nextDef ?
                  `Continue to ${nextDef.name}, or tap Finish & View Results if this is all you need.` :
                  'All measurements are done. You can now view your results.'}
                  </p>
                  <Button variant="outline" size="md" icon={RotateCcwIcon} onClick={start} className="mt-6">
                    Measure Again
                  </Button>
                </motion.div>
              }
            </AnimatePresence>
          </section>
        </div>
      </div>
    </PageLayout>);

}

function findNext(
currentId: MeasurementDefinition['id'],
statuses: Record<MeasurementDefinition['id'], MeasurementStatus>)
: MeasurementDefinition | undefined {
  const start = measurements.findIndex((m) => m.id === currentId);
  for (let i = 1; i < measurements.length; i++) {
    const candidate = measurements[(start + i) % measurements.length];
    if (statuses[candidate.id] !== 'completed') return candidate;
  }
  return undefined;
}