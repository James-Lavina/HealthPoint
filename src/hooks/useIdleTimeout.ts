import { useEffect, useRef } from 'react';

interface IdleOptions {
  enabled: boolean;
  timeoutMs: number;
  onIdle: () => void;
}

const activityEvents = ['pointerdown', 'keydown', 'touchstart', 'wheel'] as const;

export function useIdleTimeout({ enabled, timeoutMs, onIdle }: IdleOptions) {
  const callback = useRef(onIdle);
  callback.current = onIdle;

  useEffect(() => {
    if (!enabled) return;
    let timer = window.setTimeout(() => callback.current(), timeoutMs);
    const reset = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => callback.current(), timeoutMs);
    };
    activityEvents.forEach((e) => window.addEventListener(e, reset, { passive: true }));
    return () => {
      window.clearTimeout(timer);
      activityEvents.forEach((e) => window.removeEventListener(e, reset));
    };
  }, [enabled, timeoutMs]);
}