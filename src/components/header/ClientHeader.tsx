import React from 'react';
import { UserMenu } from './UserMenu';
import type { UserProfile } from '../../types/user';

interface ClientHeaderProps {
  user: UserProfile | null;
  loading: boolean;
}

export const ClientHeader: React.FC<ClientHeaderProps> = ({ user, loading }) => {
  return (
    <header className="bg-white border-b border-gray-200 h-14">
      <div className="h-full px-6 flex items-center justify-end">
        {!loading && user && <UserMenu user={user} />}
      </div>
    </header>
  );
};