import React from 'react';
import { NavLink } from 'react-router-dom';
import { usePathMatch } from './hooks/usePathMatch';
import type { MenuItem } from '../../../types/menu';

interface SidebarSubmenuProps {
  submenuItems: MenuItem[];
  isExpanded: boolean;
  isCollapsed: boolean;
  isHovered: boolean;
  currentPath: string;
}

export const SidebarSubmenu: React.FC<SidebarSubmenuProps> = ({
  submenuItems,
  isExpanded,
  isCollapsed,
  isHovered,
  currentPath
}) => {
  const { isPathActive } = usePathMatch();

  if (!((isExpanded && !isCollapsed) || (isCollapsed && isHovered))) {
    return null;
  }

  return (
    <div 
      className={`
        space-y-1
        ${isCollapsed 
          ? 'absolute left-full top-0 ml-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 p-2 z-50' 
          : 'mt-1 ml-4 pl-4 border-l border-gray-200'
        }
      `}
    >
      {submenuItems.map((subItem) => {
        const SubIcon = subItem.icon;
        const isSubActive = isPathActive(subItem.path);

        return (
          <NavLink
            key={subItem.path}
            to={subItem.path}
            className={`
              flex items-center px-3 py-2 text-sm rounded-lg
              transition-colors duration-200
              ${isSubActive
                ? 'bg-primary/10 text-primary font-medium'
                : 'text-gray-700 hover:bg-gray-100'
              }
            `}
          >
            {SubIcon && (
              <SubIcon className={`h-4 w-4 flex-shrink-0 ${
                isSubActive ? 'text-primary' : 'text-gray-400'
              }`} />
            )}
            <span className="ml-3 truncate">{subItem.title}</span>
          </NavLink>
        );
      })}
    </div>
  );
};