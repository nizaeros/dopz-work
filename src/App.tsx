import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { supabase } from './lib/supabase';
import { Header } from './components/header/Header';
import { InternalDashboard } from './pages/InternalDashboard';
import { ClientDashboard } from './pages/ClientDashboard';
import { LoginPage } from './pages/auth/LoginPage';
import { ForgotPasswordPage } from './pages/auth/ForgotPasswordPage';
import { ClientManagementPage } from './pages/clients/ClientManagementPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { LoadingSpinner } from './components/ui/LoadingSpinner';
import { ROUTES } from './constants/routes';

export default function App() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Navigate to={session ? ROUTES.INTERNAL.DASHBOARD : ROUTES.LOGIN} replace />} />
        <Route path={ROUTES.LOGIN} element={!session ? <LoginPage /> : <Navigate to={ROUTES.INTERNAL.DASHBOARD} replace />} />
        <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPasswordPage />} />
        
        {/* Protected Routes */}
        {session ? (
          <>
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
          </>
        ) : (
          <Route path="*" element={<Navigate to={ROUTES.LOGIN} replace />} />
        )}

        {/* 404 Route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}