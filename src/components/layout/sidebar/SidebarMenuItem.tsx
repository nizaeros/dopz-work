import React from 'react';
import { NavLink } from 'react-router-dom';
import { useMenuState } from './hooks/useMenuState';
import { SidebarSubmenu } from './SidebarSubmenu';
import { MenuButton } from './MenuButton';
import type { MenuItem } from '../../../types/menu';

interface SidebarMenuItemProps {
  item: MenuItem;
  isCollapsed: boolean;
  currentPath: string;
}

export const SidebarMenuItem: React.FC<SidebarMenuItemProps> = ({
  item,
  isCollapsed,
  currentPath
}) => {
  const {
    isActive,
    isExpanded,
    isHovered,
    handleMouseEnter,
    handleMouseLeave,
    toggleMenu
  } = useMenuState(item, currentPath);

  const Icon = item.icon;
  const hasSubmenu = item.submenu && item.submenu.length > 0;

  if (hasSubmenu) {
    return (
      <div
        className="relative"
        onMouseEnter={() => handleMouseEnter(item.path)}
        onMouseLeave={handleMouseLeave}
      >
        <MenuButton
          icon={Icon}
          title={item.title}
          isActive={isActive}
          isExpanded={isExpanded}
          isCollapsed={isCollapsed}
          onClick={() => toggleMenu(item.path)}
        />

        <SidebarSubmenu
          submenuItems={item.submenu}
          isExpanded={isExpanded}
          isCollapsed={isCollapsed}
          isHovered={isHovered}
          currentPath={currentPath}
        />
      </div>
    );
  }

  return (
    <NavLink
      to={item.path}
      className={({ isActive }) => `
        flex items-center px-3 py-2 rounded-lg
        transition-colors duration-200
        ${isActive 
          ? 'bg-primary/10 text-primary' 
          : 'text-gray-700 hover:bg-gray-100'
        }
      `}
    >
      <Icon className={`h-5 w-5 flex-shrink-0 ${isActive ? 'text-primary' : 'text-gray-400'}`} />
      {!isCollapsed && (
        <span className="ml-3 truncate font-medium">{item.title}</span>
      )}
    </NavLink>
  );
};