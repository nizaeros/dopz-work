import React from 'react';
import { Logo } from './Logo';
import { UserMenu } from './UserMenu';
import type { UserProfile } from '../../types/user';

interface DashboardHeaderProps {
  user: UserProfile | null;
  loading: boolean;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ user, loading }) => {
  return (
    <header className="bg-white border-b border-gray-200 h-14">
      <div className="h-full px-6 flex items-center justify-between">
        <Logo showCaption={true} />
        {!loading && user && <UserMenu user={user} />}
      </div>
    </header>
  );
};