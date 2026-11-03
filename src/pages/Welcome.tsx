import React from "react";
import { ArrowRightIcon, ClockIcon, ShieldCheckIcon, XIcon, InfoIcon } from "lucide-react";
import { Button } from "../components/Button";
import { measurements } from "../data/measurements";
import { useSession } from "../contexts/SessionContext";
const illustrationUrl = "/887c6080-c6eb-4990-9389-748475d80ea3.jpg";
export function Welcome() {
  const {
    beginSession,
    setHelpOpen,
    notice,
    dismissNotice
  } = useSession();
  return <div className="h-full overflow-y-auto">
      <div className="mx-auto grid min-h-full w-full max-w-[1760px] grid-cols-1 gap-12 px-8 py-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:px-16 lg:py-12">
        <section className="flex flex-col justify-center">
          {notice && <div role="status" className="mb-10 flex items-center gap-4 rounded-2xl bg-brand-50 px-6 py-4 ring-1 ring-brand/20">
              <ShieldCheckIcon className="h-6 w-6 shrink-0 text-brand-dark" aria-hidden="true" />
              <p className="flex-1 text-body font-medium text-brand-deep">{notice}</p>
              <button type="button" onClick={dismissNotice} aria-label="Dismiss message" className="flex h-12 w-12 items-center justify-center rounded-xl text-brand-dark transition-colors duration-150 ease-out hover:bg-brand-light focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/40">
                <XIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>}

          <h1 className="text-[48px] font-bold leading-[56px] tracking-tight text-ink lg:text-[56px] lg:leading-[64px]">
            Welcome to HealthPoint
          </h1>
          <p className="mt-4 text-section font-semibold text-brand-dark">
            Your health, one check at a time.
          </p>
          <p className="mt-6 max-w-2xl text-[20px] leading-[32px] text-ink-muted">
            Check your blood pressure, heart rate, temperature, height, and weight on your own. The
            screen guides you through every step, and you can print your results when you're done.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Button size="xl" iconRight={ArrowRightIcon} onClick={beginSession}>
              Start Health Check
            </Button>
            <Button size="xl" variant="secondary" icon={InfoIcon} onClick={() => setHelpOpen(true)}>
              How It Works
            </Button>
          </div>

          <div className="mt-12 border-t border-line pt-8">
            <p className="flex items-center gap-2 text-body font-semibold text-ink">
              <ClockIcon className="h-5 w-5 text-brand" aria-hidden="true" />
              5 checks · about 5 minutes
            </p>
            <ul className="mt-5 flex flex-wrap gap-x-8 gap-y-4">
              {measurements.map(({
              id,
              name,
              icon: Icon
            }) => <li key={id} className="flex items-center gap-3 text-body text-ink-muted">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-dark">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  {name}
                </li>)}
            </ul>
          </div>

          <p className="mt-10 flex max-w-2xl items-start gap-3 text-[15px] leading-6 text-ink-muted">
            <ShieldCheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
            <span>
              <strong className="font-semibold text-ink">Your privacy is protected.</strong> Your
              details are kept only for this session and are cleared automatically when you finish
              or step away. HealthPoint does not provide a medical diagnosis.
            </span>
          </p>
        </section>

        <div className="relative hidden min-h-[560px] overflow-hidden rounded-[28px] bg-brand-50 lg:block">
          <img src={illustrationUrl} alt="A senior woman and a student using a HealthPoint health kiosk together" className="absolute inset-0 h-full w-full object-cover object-center" />
        </div>
      </div>
    </div>;
}