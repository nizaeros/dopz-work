import React from 'react';
import { NavLink } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Logo } from '../header/Logo';
import type { MenuItem } from '../../types/menu';
import { Tooltip } from '../ui/Tooltip';

interface SidebarProps {
  isExpanded: boolean;
  onToggle: () => void;
  menuItems: MenuItem[];
  currentPath: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isExpanded,
  onToggle,
  menuItems,
  currentPath,
}) => {
  return (
    <aside
      className={`bg-white border-r border-gray-200 transition-all duration-300 ease-in-out ${
        isExpanded ? 'w-64' : 'w-20'
      }`}
    >
      {/* Logo Section */}
      <div className="h-14 flex items-center justify-center px-4 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <Logo iconOnly />
          {isExpanded && <span className="font-bold text-gray-800">DOPZ</span>}
        </div>
      </div>

      {/* Menu Header */}
      <div className="px-4 pt-4 pb-2 flex items-center justify-between">
        {isExpanded && <span className="text-sm font-medium text-gray-500">Menu</span>}
        <button
          onClick={onToggle}
          className="p-1 rounded-md hover:bg-gray-100 transition-colors ml-auto"
          aria-label={isExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
        >
          {isExpanded ? (
            <ChevronLeft className="h-5 w-5 text-gray-500" />
          ) : (
            <ChevronRight className="h-5 w-5 text-gray-500" />
          )}
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className="px-4 pb-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPath.includes(item.to);
          
          const linkContent = (
            <div
              className={`flex items-center space-x-3 px-3 py-2 rounded-md transition-colors ${
                isActive
                  ? 'bg-gray-50 text-gray-900 font-medium'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Icon className={`h-5 w-5 flex-shrink-0 ${isActive ? 'text-gray-900' : 'text-gray-400'}`} />
              {isExpanded && <span>{item.title}</span>}
            </div>
          );

          return (
            <div key={item.to}>
              {isExpanded ? (
                <NavLink to={item.to}>{linkContent}</NavLink>
              ) : (
                <Tooltip content={item.title} side="right">
                  <NavLink to={item.to}>{linkContent}</NavLink>
                </Tooltip>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
};