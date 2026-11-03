import React from 'react';
import { MotionConfig } from 'framer-motion';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { SessionProvider } from './contexts/SessionContext';
import { KioskShell } from './components/KioskShell';
import { Welcome } from './pages/Welcome';
import { UserInfo } from './pages/UserInfo';
import { Dashboard } from './pages/Dashboard';
import { MeasurementGuide } from './pages/MeasurementGuide';
import { Results } from './pages/Results';
import { Summary } from './pages/Summary';
import { PrintReport } from './pages/PrintReport';

interface AppProps {
  idleTimeoutSeconds?: number;
}

export function App({ idleTimeoutSeconds = 60 }: AppProps) {
  return (
    <BrowserRouter>
      <MotionConfig reducedMotion="user">
        <SessionProvider>
          <KioskShell idleTimeoutSeconds={idleTimeoutSeconds} warningSeconds={20}>
            <Routes>
              <Route path="/" element={<Welcome />} />
              <Route path="/details" element={<UserInfo />} />
              <Route path="/measurements" element={<Dashboard />} />
              <Route path="/measure/blood-pressure" element={<MeasurementGuide />} />
              <Route path="/measure/heart-rate" element={<MeasurementGuide />} />
              <Route path="/measure/body-temperature" element={<MeasurementGuide />} />
              <Route path="/measure/height" element={<MeasurementGuide />} />
              <Route path="/measure/weight" element={<MeasurementGuide />} />
              <Route path="/results" element={<Results />} />
              <Route path="/summary" element={<Summary />} />
              <Route path="/print" element={<PrintReport />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </KioskShell>
        </SessionProvider>
      </MotionConfig>
    </BrowserRouter>);

}