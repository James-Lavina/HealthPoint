import React, { useEffect, useState } from 'react';
import { HandIcon, ShieldAlertIcon } from 'lucide-react';
import { Dialog } from './Dialog';
import { Button } from './Button';

interface IdleWarningDialogProps {
  open: boolean;
  seconds: number;
  onStay: () => void;
  onExpire: () => void;
}

export function IdleWarningDialog({ open, seconds, onStay, onExpire }: IdleWarningDialogProps) {
  const [remaining, setRemaining] = useState(seconds);

  useEffect(() => {
    if (!open) {
      setRemaining(seconds);
      return;
    }
    const interval = window.setInterval(() => {
      setRemaining((r) => r - 1);
    }, 1000);
    return () => window.clearInterval(interval);
  }, [open, seconds]);

  useEffect(() => {
    if (open && remaining <= 0) onExpire();
  }, [open, remaining, onExpire]);

  return (
    <Dialog open={open} labelledBy="idle-title" describedBy="idle-desc" onClose={onStay}>
      <div className="flex items-start justify-between gap-6">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-warning-light text-warning-dark">
          <ShieldAlertIcon className="h-8 w-8" aria-hidden="true" />
        </div>
        <div
          className="flex h-20 w-20 flex-col items-center justify-center rounded-full ring-4 ring-warning"
          aria-live="polite">
          
          <span className="text-[30px] font-bold leading-none tabular-nums">{Math.max(remaining, 0)}</span>
          <span className="text-sm font-medium text-ink-muted">sec</span>
        </div>
      </div>
      <h2 id="idle-title" className="mt-6 text-section font-bold">
        Are you still there?
      </h2>
      <p id="idle-desc" className="mt-3 text-body-lg text-ink-muted">
        For your privacy, this session will end and your information will be cleared in{' '}
        <strong className="font-semibold text-ink">{Math.max(remaining, 0)} seconds</strong>.
      </p>
      <Button size="xl" icon={HandIcon} onClick={onStay} fullWidth className="mt-8">
        I'm Still Here
      </Button>
    </Dialog>);

}