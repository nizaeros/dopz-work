import React from 'react';
import { ClientDashboardHeader } from './ClientDashboardHeader';
import { ClientDashboardSidebar } from './ClientDashboardSidebar';

interface ClientDashboardLayoutProps {
  children: React.ReactNode;
}

export const ClientDashboardLayout: React.FC<ClientDashboardLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <ClientDashboardHeader />
      <div className="flex h-[calc(100vh-3.5rem)]">
        <ClientDashboardSidebar />
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};