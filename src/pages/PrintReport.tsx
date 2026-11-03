import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeftIcon, CheckCircle2Icon, LogOutIcon, PrinterIcon, RotateCcwIcon } from 'lucide-react';
import { PageLayout } from '../components/PageLayout';
import { Button } from '../components/Button';
import { ReportSheet } from '../components/ReportSheet';
import { useSession } from '../contexts/SessionContext';

type PrintState = 'idle' | 'printing' | 'printed';

export function PrintReport() {
  const { user, sessionId, startedAt, goTo, requestEnd, statuses } = useSession();
  const [printState, setPrintState] = useState<PrintState>('idle');

  useEffect(() => {
    if (printState !== 'printing') return;
    const t = window.setTimeout(() => setPrintState('printed'), 2500);
    return () => window.clearTimeout(t);
  }, [printState]);

  return (
    <PageLayout
      title="Your report is ready"
      subtitle="Check the preview, then print a copy to keep or share with your doctor."
      footerLeft={
      <Button variant="outline" icon={ArrowLeftIcon} onClick={() => goTo('summary')}>
          Back to Summary
        </Button>
      }
      footerRight={
      <>
          <Button variant="outline" icon={LogOutIcon} onClick={() => requestEnd('exit')}>
            Exit
          </Button>
          <Button variant="secondary" icon={RotateCcwIcon} onClick={() => requestEnd('new')}>
            Start New Session
          </Button>
        </>
      }>
      
      <div className="grid grid-cols-1 gap-10 2xl:grid-cols-[minmax(0,1fr)_440px]">
        <div className="order-2 min-w-0 rounded-2xl bg-line/60 p-6 lg:p-10 2xl:order-1">
          <ReportSheet user={user} sessionId={sessionId} date={startedAt} statuses={statuses} />
        </div>

        <aside className="order-1 self-start rounded-2xl bg-white p-8 shadow-card ring-1 ring-line lg:p-10 2xl:order-2" aria-live="polite">
          <AnimatePresence mode="wait" initial={false}>
            {printState === 'printed' ?
            <motion.div
              key="printed"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}>
              
                <CheckCircle2Icon className="h-14 w-14 text-success" aria-hidden="true" />
                <h2 className="mt-5 text-section font-bold text-ink">Report printed</h2>
                <p className="mt-3 text-body-lg text-ink">
                  Please collect your report from the tray below the screen.
                </p>
                <p className="mt-6 border-t border-line pt-6 text-body text-ink-muted">
                  When you're finished, tap <strong className="font-semibold text-ink">Exit</strong> to
                  clear your information from this kiosk.
                </p>
                <Button variant="outline" icon={PrinterIcon} fullWidth className="mt-6" onClick={() => setPrintState('printing')}>
                  Print Another Copy
                </Button>
              </motion.div> :

            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}>
              
                <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-50 text-brand-dark">
                  <PrinterIcon className="h-8 w-8" aria-hidden="true" />
                </span>
                <h2 className="mt-5 text-section font-bold text-ink">Print your results</h2>
                <p className="mt-3 text-body-lg text-ink-muted">
                  One page, printed at the tray below the screen. It includes your details, readings,
                  and BMI.
                </p>
                <Button
                size="xl"
                icon={PrinterIcon}
                fullWidth
                className="mt-8"
                loading={printState === 'printing'}
                onClick={() => setPrintState('printing')}>
                
                  {printState === 'printing' ? 'Printing…' : 'Print Results'}
                </Button>
                {printState === 'printing' &&
              <div className="mt-5 h-2 overflow-hidden rounded-full bg-line">
                    <motion.div
                  className="h-full rounded-full bg-brand"
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 2.5, ease: 'linear' }} />
                
                  </div>
              }
              </motion.div>
            }
          </AnimatePresence>
        </aside>
      </div>
    </PageLayout>);

}