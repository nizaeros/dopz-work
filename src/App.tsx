import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { InternalDashboard } from './pages/InternalDashboard';
import { ClientDashboard } from './pages/ClientDashboard';
import { LoginPage } from './pages/auth/LoginPage';
import { ForgotPasswordPage } from './pages/auth/ForgotPasswordPage';
import { ROUTES } from './constants/routes';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to={ROUTES.LOGIN} replace />} />
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPasswordPage />} />
        <Route
          path="/internal/*"
          element={
            <DashboardLayout>
              <InternalDashboard />
            </DashboardLayout>
          }
        />
        <Route
          path={ROUTES.CLIENT.DASHBOARD}
          element={
            <DashboardLayout clientName="Demo Client">
              <ClientDashboard clientName="Demo Client" />
            </DashboardLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;