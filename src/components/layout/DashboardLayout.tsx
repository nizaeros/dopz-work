import React, { ReactNode } from 'react';
import { DashboardHeader } from '../header/DashboardHeader';

interface DashboardLayoutProps {
  children: ReactNode;
  clientName?: string;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, clientName }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader clientName={clientName} />
      <main className="w-full px-6 py-8">
        {children}
      </main>
    </div>
  );
};