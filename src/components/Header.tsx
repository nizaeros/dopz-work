import React from 'react';
import { useLocation } from 'react-router-dom';
import { Building2 } from 'lucide-react';

interface HeaderProps {
  clientName?: string;
  clientLogo?: string;
}

export const Header: React.FC<HeaderProps> = ({ clientName, clientLogo }) => {
  const location = useLocation();
  const isInternalDashboard = location.pathname.includes('/internal');

  return (
    <header className="bg-[#132490] text-white p-4 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        {isInternalDashboard ? (
          <div className="flex items-center space-x-2">
            <Building2 className="h-6 w-6" />
            <span className="text-xl font-bold">dopz.work</span>
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            {clientLogo ? (
              <img src={clientLogo} alt={clientName} className="h-8 w-auto" />
            ) : (
              <Building2 className="h-6 w-6" />
            )}
            <span className="text-xl font-bold">{clientName || 'Welcome'}</span>
          </div>
        )}
        <div className="text-sm">Community of Indian Professionals</div>
      </div>
    </header>
  );
};