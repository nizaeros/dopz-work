import React from 'react';
import { useLocation } from 'react-router-dom';
import { Logo } from './Logo';
import { UserMenu } from './UserMenu';
import { useUser } from '../../hooks/useUser';

interface DashboardHeaderProps {
  clientName?: string;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ clientName }) => {
  const location = useLocation();
  const { user, loading } = useUser();
  const isInternalDashboard = location.pathname.includes('/internal');

  return (
    <header className="bg-white border-b border-gray-200 h-14">
      <div className="h-full w-full px-6 flex items-center justify-between">
        <div className="flex-shrink-0">
          {isInternalDashboard ? (
            <Logo />
          ) : (
            <div className="flex items-center space-x-4">
              <Logo />
              {clientName && (
                <span className="text-lg font-semibold text-gray-700">
                  {clientName}
                </span>
              )}
            </div>
          )}
        </div>

        {!loading && user && (
          <div className="flex items-center">
            <UserMenu user={user} />
          </div>
        )}
      </div>
    </header>
  );
};