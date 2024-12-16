import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { UserMenu } from '../header/UserMenu';
import { useUser } from '../../hooks/useUser';
import type { MenuItem } from '../../types/menu';

interface GeneralAppLayoutProps {
  children: React.ReactNode;
  menuItems: MenuItem[];
}

export const GeneralAppLayout: React.FC<GeneralAppLayoutProps> = ({
  children,
  menuItems,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const location = useLocation();
  const { user, loading } = useUser();

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        isExpanded={isExpanded}
        onToggle={() => setIsExpanded(!isExpanded)}
        menuItems={menuItems}
        currentPath={location.pathname}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 h-14">
          <div className="h-full px-6 flex items-center justify-end">
            {!loading && user && <UserMenu user={user} />}
          </div>
        </header>
        
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          <div className="w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};