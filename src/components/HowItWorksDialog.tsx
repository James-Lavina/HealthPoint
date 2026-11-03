import React from 'react';
import { ClockIcon, XIcon } from 'lucide-react';
import { Dialog } from './Dialog';
import { Button } from './Button';
import { howItWorksSteps } from '../data/journey';

interface HowItWorksDialogProps {
  open: boolean;
  onClose: () => void;
}

export function HowItWorksDialog({ open, onClose }: HowItWorksDialogProps) {
  return (
    <Dialog open={open} labelledBy="how-title" onClose={onClose} widthClass="max-w-3xl">
      <div className="flex items-start justify-between gap-6">
        <div>
          <h2 id="how-title" className="text-section font-bold">
            How HealthPoint works
          </h2>
          <p className="mt-2 flex items-center gap-2 text-body-lg text-ink-muted">
            <ClockIcon className="h-5 w-5" aria-hidden="true" />
            The full check takes about 5 minutes.
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl text-ink-muted transition-colors duration-150 ease-out hover:bg-canvas hover:text-ink focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/40">
          
          <XIcon className="h-7 w-7" aria-hidden="true" />
        </button>
      </div>

      <ol className="mt-8 space-y-1">
        {howItWorksSteps.map((step, i) =>
        <li key={step.title} className="flex gap-5 py-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand text-[20px] font-bold text-white">
              {i + 1}
            </span>
            <div>
              <h3 className="text-card font-semibold">{step.title}</h3>
              <p className="mt-1 text-body text-ink-muted">{step.description}</p>
            </div>
          </li>
        )}
      </ol>

      <div className="mt-6 flex items-center justify-between gap-6 border-t border-line pt-6">
        <p className="text-body text-ink-muted">Tap Help at the top of the screen anytime.</p>
        <Button onClick={onClose}>Got It</Button>
      </div>
    </Dialog>);

}