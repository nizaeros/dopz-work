import React from 'react';
import { UserMenu } from '../header/UserMenu';
import { useUser } from '../../hooks/useUser';

interface PageHeaderProps {
  title: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title }) => {
  const { user, loading } = useUser();

  return (
    <header className="bg-white border-b border-gray-200 h-14">
      <div className="h-full px-6 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
        {!loading && user && <UserMenu user={user} />}
      </div>
    </header>
  );
};