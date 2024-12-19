import React from 'react';
import { useClientData } from '../../hooks/useClientData';
import { ClientDashboardLayout } from './components/layout/ClientDashboardLayout';
import { ClientDashboardContent } from './components/ClientDashboardContent';
import { ErrorBoundary } from '../../components/error/ErrorBoundary';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';

export const ClientDashboard: React.FC = () => {
  const { client, loading, error } = useClientData();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (error) {
    return <ErrorBoundary error={error} />;
  }

  if (!client) {
    return <ErrorBoundary error="Client not found" />;
  }

  return (
    <ClientDashboardLayout>
      <ClientDashboardContent />
    </ClientDashboardLayout>
  );
};