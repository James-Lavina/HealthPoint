import React from 'react';
import { CheckIcon } from 'lucide-react';
import { journeySteps } from '../data/journey';

interface JourneyStepperProps {
  current: number;
}

export function JourneyStepper({ current }: JourneyStepperProps) {
  return (
    <nav aria-label="Your progress">
      <ol className="flex items-center gap-3">
        {journeySteps.map((step, i) => {
          const state = i < current ? 'done' : i === current ? 'current' : 'upcoming';
          return (
            <li
              key={step.label}
              className="flex items-center gap-3"
              aria-current={state === 'current' ? 'step' : undefined}>
              
              <span
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-base font-semibold transition-colors duration-200 ease-out ${
                state === 'done' ?
                'bg-brand text-white' :
                state === 'current' ?
                'bg-brand-50 text-brand-dark ring-2 ring-brand' :
                'bg-canvas text-ink-muted ring-1 ring-line'}`
                }>
                
                {state === 'done' ? <CheckIcon className="h-5 w-5" aria-hidden="true" /> : i + 1}
                <span className="sr-only">
                  {state === 'done' ? ' completed' : state === 'current' ? ' current step' : ''}
                </span>
              </span>
              <span
                className={`whitespace-nowrap text-base ${
                state === 'current' ?
                'hidden font-semibold text-ink lg:inline' :
                state === 'done' ?
                'hidden font-medium text-ink 2xl:inline' :
                'hidden font-medium text-ink-muted 2xl:inline'}`
                }>
                
                {step.label}
              </span>
              {i < journeySteps.length - 1 &&
              <span
                className={`h-0.5 w-6 rounded-full 2xl:w-8 ${i < current ? 'bg-brand' : 'bg-line'}`}
                aria-hidden="true" />

              }
            </li>);

        })}
      </ol>
    </nav>);

}