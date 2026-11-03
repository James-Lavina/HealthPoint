import React from 'react';
import { LogOutIcon, RotateCcwIcon, ShieldCheckIcon } from 'lucide-react';
import { Dialog } from './Dialog';
import { Button } from './Button';
import type { EndMode } from '../types/session';

interface ConfirmEndDialogProps {
  mode: EndMode | null;
  onCancel: () => void;
  onConfirm: (mode: EndMode) => void;
}

const copy: Record<EndMode, {title: string;confirm: string;}> = {
  exit: { title: 'End your session?', confirm: 'Yes, End Session' },
  new: { title: 'Start a new session?', confirm: 'Yes, Start New' }
};

export function ConfirmEndDialog({ mode, onCancel, onConfirm }: ConfirmEndDialogProps) {
  const content = copy[mode ?? 'exit'];
  return (
    <Dialog open={mode !== null} labelledBy="end-title" describedBy="end-desc" onClose={onCancel}>
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-warning-light text-warning-dark">
        {mode === 'new' ?
        <RotateCcwIcon className="h-8 w-8" aria-hidden="true" /> :

        <LogOutIcon className="h-8 w-8" aria-hidden="true" />
        }
      </div>
      <h2 id="end-title" className="mt-6 text-section font-bold">
        {content.title}
      </h2>
      <p id="end-desc" className="mt-3 text-body-lg text-ink-muted">
        Your details and all readings will be permanently cleared from this kiosk. If you need a
        copy, print your report first.
      </p>
      <p className="mt-5 flex items-center gap-3 rounded-xl bg-canvas px-4 py-3 text-body text-ink-muted">
        <ShieldCheckIcon className="h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
        Nothing is stored after your session ends.
      </p>
      <div className="mt-8 grid grid-cols-2 gap-4">
        <Button variant="outline" onClick={onCancel} fullWidth>
          Keep My Session
        </Button>
        <Button variant="danger" onClick={() => mode && onConfirm(mode)} fullWidth>
          {content.confirm}
        </Button>
      </div>
    </Dialog>);

}