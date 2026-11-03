import React, { useCallback, useState, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { KioskHeader } from './KioskHeader';
import { ConfirmEndDialog } from './ConfirmEndDialog';
import { HowItWorksDialog } from './HowItWorksDialog';
import { IdleWarningDialog } from './IdleWarningDialog';
import { useSession } from '../contexts/SessionContext';
import { useIdleTimeout } from '../hooks/useIdleTimeout';
import { useScreenInit } from '../useScreenInit.js';
import type { EndMode } from '../types/session';

interface KioskShellProps {
  idleTimeoutSeconds: number;
  warningSeconds: number;
  children: ReactNode;
}

export function KioskShell({ idleTimeoutSeconds, warningSeconds, children }: KioskShellProps) {
  const session = useSession();
  const location = useLocation();
  const screenInit = useScreenInit() as {idleWarning?: boolean;};
  const [idleWarning, setIdleWarning] = useState(screenInit.idleWarning ?? false);
  const isMeasuring = Object.values(session.statuses).includes('measuring');

  useIdleTimeout({
    enabled: session.screen !== 'welcome' && !isMeasuring && !idleWarning,
    timeoutMs: idleTimeoutSeconds * 1000,
    onIdle: () => {
      session.cancelEnd();
      session.setHelpOpen(false);
      setIdleWarning(true);
    }
  });

  const { endSession } = session;
  const handleExpire = useCallback(() => {
    setIdleWarning(false);
    endSession('exit', 'Your previous session ended due to inactivity. Your information has been cleared.');
  }, [endSession]);

  const handleConfirmEnd = (mode: EndMode) =>
  endSession(mode, 'Your session has ended and your information has been cleared. Thank you!');

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-canvas font-sans text-ink">
      <KioskHeader />
      <main className="relative min-h-0 flex-1">
        <motion.div
          key={location.pathname}
          className="h-full"
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}>
          
          {children}
        </motion.div>
      </main>

      <HowItWorksDialog open={session.helpOpen} onClose={() => session.setHelpOpen(false)} />
      <ConfirmEndDialog mode={session.endRequest} onCancel={session.cancelEnd} onConfirm={handleConfirmEnd} />
      <IdleWarningDialog
        open={idleWarning}
        seconds={warningSeconds}
        onStay={() => setIdleWarning(false)}
        onExpire={handleExpire} />
      
    </div>);

}