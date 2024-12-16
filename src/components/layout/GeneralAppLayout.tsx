import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { PageHeader } from './PageHeader';
import type { MenuItem } from '../../types/menu';

interface GeneralAppLayoutProps {
  children: React.ReactNode;
  title: string;
  menuItems: MenuItem[];
}

export const GeneralAppLayout: React.FC<GeneralAppLayoutProps> = ({
  children,
  title,
  menuItems,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const location = useLocation();

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        isExpanded={isExpanded}
        onToggle={() => setIsExpanded(!isExpanded)}
        menuItems={menuItems}
        currentPath={location.pathname}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <PageHeader title={title} />
        
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};