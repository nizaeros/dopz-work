import React from 'react';
import { useLocation } from 'react-router-dom';
import { ClientDashboardHeader } from './ClientDashboardHeader';
import { ClientSidebar } from '../../../../components/layout/ClientSidebar';
import { CLIENT_DASHBOARD_MENU } from '../../constants/menu';

interface ClientDashboardLayoutProps {
  children: React.ReactNode;
}

export const ClientDashboardLayout: React.FC<ClientDashboardLayoutProps> = ({ children }) => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <ClientSidebar 
        menuItems={CLIENT_DASHBOARD_MENU} 
        currentPath={location.pathname}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <ClientDashboardHeader />
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};