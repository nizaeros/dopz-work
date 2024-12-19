import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import { Logo } from '../../header/Logo';
import { SidebarNav } from './SidebarNav';
import { useSidebarState } from './hooks/useSidebarState';
import type { MenuItem } from '../../../types/menu';

interface ClientSidebarProps {
  menuItems: MenuItem[];
  currentPath: string;
}

export const ClientSidebar: React.FC<ClientSidebarProps> = ({ menuItems, currentPath }) => {
  const { isCollapsed, setIsCollapsed } = useSidebarState();

  return (
    <aside 
      className={`
        bg-white border-r border-gray-200 transition-all duration-300 ease-in-out relative
        ${isCollapsed ? 'w-16' : 'w-64'}
      `}
    >
      <div className="h-14 border-b border-gray-200 flex items-center justify-between px-4">
        <div className={`transition-opacity duration-300 ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>
          <Logo iconOnly={isCollapsed} />
        </div>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500"
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      <SidebarNav 
        menuItems={menuItems} 
        isCollapsed={isCollapsed}
        currentPath={currentPath}
      />
    </aside>
  );
};