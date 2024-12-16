import React from 'react';
import { useLocation } from 'react-router-dom';
import { Logo } from './Logo';
import { UserAvatar } from './UserAvatar';
import { useUser } from '../../hooks/useUser';
import { ClientHeader } from './ClientHeader';

interface HeaderProps {
  clientName?: string;
  clientLogo?: string;
}

export const Header: React.FC<HeaderProps> = ({ clientName, clientLogo }) => {
  const location = useLocation();
  const { user, loading } = useUser();
  const isInternalDashboard = location.pathname.includes('/internal');

  return (
    <header className="bg-white border-b border-gray-200 h-16 w-full">
      <div className="h-full w-full px-4 flex items-center justify-between">
        <div className="flex-shrink-0">
          {isInternalDashboard ? (
            <Logo />
          ) : (
            <ClientHeader clientName={clientName} clientLogo={clientLogo} />
          )}
        </div>

        {!loading && user && (
          <div className="flex items-center ml-4">
            <UserAvatar user={user} />
          </div>
        )}
      </div>
    </header>
  );
};