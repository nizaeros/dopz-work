import React, { ReactNode } from 'react';
import { Header } from '../header/Header';

interface DashboardLayoutProps {
  children: ReactNode;
  clientName?: string;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, clientName }) => {
  return (
    <div className="min-h-screen bg-[#fcfcfc]">
      <Header clientName={clientName} />
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
};