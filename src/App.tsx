import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { supabase } from './lib/supabase';
import { Header } from './components/header/Header';
import { InternalDashboard } from './pages/InternalDashboard';
import { ClientDashboard } from './pages/client-dashboard/ClientDashboard';
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
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            iconTheme: {
              primary: '#4ade80',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
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
            
            {/* Client Dashboard Routes */}
            <Route path="/client/:clientId/*" element={<ClientDashboard />} />
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