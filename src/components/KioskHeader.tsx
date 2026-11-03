import React from "react";
import { LogOutIcon, InfoIcon } from "lucide-react";
import { Logo } from "./Logo";
import { Button } from "./Button";
import { JourneyStepper } from "./JourneyStepper";
import { useSession } from "../contexts/SessionContext";
import { ScreenId } from "../types/session";
const stepIndexByScreen: Record<ScreenId, number> = {
  welcome: -1,
  info: 0,
  dashboard: 1,
  instruction: 1,
  results: 2,
  summary: 3,
  print: 4
};
export function KioskHeader() {
  const {
    screen,
    setHelpOpen,
    requestEnd
  } = useSession();
  const stepIndex = stepIndexByScreen[screen];
  return <header className="shrink-0 border-b border-line bg-white">
      <div className="mx-auto flex h-24 w-full max-w-[1760px] items-center gap-6 px-8 lg:px-16">
        <div className="shrink-0">
          <Logo />
        </div>
        <div className="flex min-w-0 flex-1 justify-center">
          {stepIndex >= 0 && <JourneyStepper current={stepIndex} />}
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <Button variant="ghost" size="md" icon={InfoIcon} onClick={() => setHelpOpen(true)} aria-label="Help">
            <span className={screen === 'welcome' ? '' : 'hidden xl:inline'}>Help</span>
          </Button>
          {screen !== 'welcome' && <Button variant="outline" size="md" icon={LogOutIcon} onClick={() => requestEnd('exit')} aria-label="End Session">
              <span className="hidden xl:inline">End Session</span>
            </Button>}
        </div>
      </div>
    </header>;
}