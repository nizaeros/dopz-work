import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/header/Header';
import { InternalDashboard } from './pages/InternalDashboard';
import { ClientDashboard } from './pages/ClientDashboard';
import { LoginPage } from './pages/auth/LoginPage';
import { ForgotPasswordPage } from './pages/auth/ForgotPasswordPage';
import { ClientManagementPage } from './pages/clients/ClientManagementPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ROUTES } from './constants/routes';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to={ROUTES.LOGIN} replace />} />
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPasswordPage />} />
        
        {/* Internal Routes */}
        <Route path="/internal">
          <Route 
            path="dashboard" 
            element={
              <>
                <Header />
                <InternalDashboard />
              </>
            } 
          />
          <Route path="clients/*" element={<ClientManagementPage />} />
        </Route>
        
        {/* Client Routes */}
        <Route
          path={ROUTES.CLIENT.DASHBOARD}
          element={
            <>
              <Header clientName="Demo Client" />
              <ClientDashboard clientName="Demo Client" />
            </>
          }
        />

        {/* 404 Route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}