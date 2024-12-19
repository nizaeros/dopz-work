import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { supabase } from './lib/supabase';
import { verifySchema } from './utils/schema-check';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { Header } from './components/header/Header';
import { InternalDashboard } from './pages/InternalDashboard';
import { ClientDashboard } from './pages/client-dashboard/ClientDashboard';
import { LoginPage } from './pages/auth/LoginPage';
import { ForgotPasswordPage } from './pages/auth/ForgotPasswordPage';
import { ClientManagementPage } from './pages/clients/ClientManagementPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { LoadingSpinner } from './components/ui/LoadingSpinner';
import { ROUTES } from './constants/routes';

export function App() {
  const [session, setSession] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    // Verify schema access
    verifySchema().then(isAccessible => {
      console.log('Schema accessible:', isAccessible);
    });

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
        }}
      />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Navigate to={session ? ROUTES.INTERNAL.DASHBOARD : ROUTES.LOGIN} replace />} />
        <Route path={ROUTES.LOGIN} element={!session ? <LoginPage /> : <Navigate to={ROUTES.INTERNAL.DASHBOARD} replace />} />
        <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPasswordPage />} />
        
        {/* Protected Internal Routes */}
        <Route path="/internal">
          <Route 
            path="dashboard" 
            element={
              <ProtectedRoute allowedRoles={['internal']}>
                <Header />
                <InternalDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="clients/*" 
            element={
              <ProtectedRoute allowedRoles={['internal']}>
                <ClientManagementPage />
              </ProtectedRoute>
            } 
          />
        </Route>
        
        {/* Protected Client Routes */}
        <Route 
          path="/client/:clientId/*" 
          element={
            <ProtectedRoute allowedRoles={['external', 'internal']}>
              <ClientDashboard />
            </ProtectedRoute>
          } 
        />

        {/* 404 Route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;