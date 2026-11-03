import React, { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { measurements } from '../data/measurements';
import { measurePath, parseLocation, screenPaths } from '../utils/routes';
import { useScreenInit } from '../useScreenInit.js';
import type {
  EndMode,
  MeasurementId,
  MeasurementStatus,
  ScreenId,
  UserInfo } from
'../types/session';

interface SessionContextValue {
  screen: ScreenId;
  goTo: (screen: ScreenId) => void;
  user: UserInfo;
  setUser: (user: UserInfo) => void;
  statuses: Record<MeasurementId, MeasurementStatus>;
  setStatus: (id: MeasurementId, status: MeasurementStatus) => void;
  activeId: MeasurementId | null;
  openMeasurement: (id: MeasurementId) => void;
  completedCount: number;
  allComplete: boolean;
  sessionId: string;
  startedAt: Date;
  beginSession: () => void;
  endSession: (mode: EndMode, notice?: string) => void;
  endRequest: EndMode | null;
  requestEnd: (mode: EndMode) => void;
  cancelEnd: () => void;
  helpOpen: boolean;
  setHelpOpen: (open: boolean) => void;
  notice: string | null;
  dismissNotice: () => void;
}

const SessionContext = createContext<SessionContextValue | null>(null);

const emptyUser: UserInfo = { fullName: '', age: '', sex: null };
const sampleUser: UserInfo = { fullName: 'Maria Santos', age: '34', sex: 'female' };

export function SessionProvider({ children }: {children: ReactNode;}) {
  const location = useLocation();
  const navigate = useNavigate();
  const { screen, activeId } = parseLocation(location.pathname);

  const screenInit = useScreenInit() as {
    completedCount?: number;
    phase?: string;
    helpOpen?: boolean;
    endRequest?: EndMode;
  };
  const [initial] = useState(() =>
  initialStateFor(screen, activeId, screenInit.completedCount, screenInit.phase === 'complete')
  );
  const [user, setUser] = useState<UserInfo>(initial.user);
  const [statuses, setStatuses] = useState(initial.statuses);
  const [sessionId, setSessionId] = useState(createSessionId);
  const [startedAt, setStartedAt] = useState(() => new Date());
  const [endRequest, setEndRequest] = useState<EndMode | null>(screenInit.endRequest ?? null);
  const [helpOpen, setHelpOpen] = useState(screenInit.helpOpen ?? false);
  const [notice, setNotice] = useState<string | null>(null);

  const goTo = useCallback(
    (target: ScreenId) => {
      if (target === 'instruction') {
        navigate(activeId ? measurePath(activeId) : screenPaths.dashboard);
      } else {
        navigate(screenPaths[target]);
      }
    },
    [navigate, activeId]
  );

  const setStatus = useCallback((id: MeasurementId, status: MeasurementStatus) => {
    setStatuses((prev) => ({ ...prev, [id]: status }));
  }, []);

  const openMeasurement = useCallback((id: MeasurementId) => navigate(measurePath(id)), [navigate]);

  const resetData = useCallback(() => {
    setUser(emptyUser);
    setStatuses(createStatuses(0));
    setSessionId(createSessionId());
    setStartedAt(new Date());
  }, []);

  const beginSession = useCallback(() => {
    resetData();
    setNotice(null);
    navigate(screenPaths.info);
  }, [resetData, navigate]);

  const endSession = useCallback(
    (mode: EndMode, message?: string) => {
      resetData();
      setEndRequest(null);
      setNotice(mode === 'exit' ? message ?? null : null);
      navigate(mode === 'new' ? screenPaths.info : screenPaths.welcome);
    },
    [resetData, navigate]
  );

  const value = useMemo<SessionContextValue>(() => {
    const completedCount = Object.values(statuses).filter((s) => s === 'completed').length;
    return {
      screen,
      goTo,
      user,
      setUser,
      statuses,
      setStatus,
      activeId,
      openMeasurement,
      completedCount,
      allComplete: completedCount === measurements.length,
      sessionId,
      startedAt,
      beginSession,
      endSession,
      endRequest,
      requestEnd: setEndRequest,
      cancelEnd: () => setEndRequest(null),
      helpOpen,
      setHelpOpen,
      notice,
      dismissNotice: () => setNotice(null)
    };
  }, [
  screen,
  goTo,
  user,
  statuses,
  setStatus,
  activeId,
  openMeasurement,
  sessionId,
  startedAt,
  beginSession,
  endSession,
  endRequest,
  helpOpen,
  notice]
  );

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useSession(): SessionContextValue {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error('useSession must be used inside SessionProvider');
  return ctx;
}

function createStatuses(completedCount: number): Record<MeasurementId, MeasurementStatus> {
  return measurements.reduce(
    (acc, m, i) => {
      acc[m.id] = i < completedCount ? 'completed' : 'not_started';
      return acc;
    },
    {} as Record<MeasurementId, MeasurementStatus>
  );
}

function createSessionId(): string {
  return `HP-${Math.floor(100000 + Math.random() * 900000)}`;
}

/**
 * When a screen is opened directly (e.g. from the Screens canvas or a shared link),
 * pre-fill realistic sample data so every screen renders in a meaningful state.
 */
function initialStateFor(
screen: ScreenId,
activeId: MeasurementId | null,
completedOverride?: number,
activeCompleted = false)
{
  const hasUser = screen !== 'welcome' && screen !== 'info';
  let completed = 0;
  if (completedOverride !== undefined) completed = completedOverride;else
  if (screen === 'dashboard') completed = 2;else
  if (screen === 'instruction') {
    const index = Math.max(0, measurements.findIndex((m) => m.id === activeId));
    completed = activeCompleted ? index + 1 : index;
  } else if (hasUser) completed = measurements.length;
  return {
    user: hasUser ? sampleUser : emptyUser,
    statuses: createStatuses(completed)
  };
}