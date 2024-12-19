import React from 'react';
import { SidebarMenuItem } from './SidebarMenuItem';
import type { MenuItem } from '../../../types/menu';

interface SidebarNavProps {
  menuItems: MenuItem[];
  isCollapsed: boolean;
  currentPath: string;
}

export const SidebarNav: React.FC<SidebarNavProps> = ({ 
  menuItems, 
  isCollapsed,
  currentPath 
}) => {
  return (
    <nav className="p-2 space-y-1">
      {menuItems.map((item) => (
        <SidebarMenuItem
          key={item.path}
          item={item}
          isCollapsed={isCollapsed}
          currentPath={currentPath}
        />
      ))}
    </nav>
  );
};