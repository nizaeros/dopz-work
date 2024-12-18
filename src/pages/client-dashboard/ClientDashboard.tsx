import React from 'react';
import { ClientDashboardLayout } from './components/layout/ClientDashboardLayout';
import { ClientDashboardContent } from './components/ClientDashboardContent';

export const ClientDashboard: React.FC = () => {
  return (
    <ClientDashboardLayout>
      <ClientDashboardContent />
    </ClientDashboardLayout>
  );
};