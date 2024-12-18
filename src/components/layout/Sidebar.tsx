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
}

export const Sidebar: React.FC<SidebarProps> = ({
  isExpanded,
  onToggle,
  menuItems,
}) => {
  return (
    <aside
      className={`bg-white border-r border-gray-200 transition-all duration-300 ease-in-out flex flex-col ${
        isExpanded ? 'w-64' : 'w-16'
      }`}
    >
      {/* Header Section */}
      <div className="h-14 border-b border-gray-200 relative flex items-center">
        {/* Logo Container - Centered vertically */}
        <div className={`
          flex items-center h-full
          ${isExpanded ? 'px-4' : 'justify-center w-full'}
        `}>
          <Logo iconOnly={!isExpanded} showCaption={isExpanded} className="h-6" />
        </div>

        {/* Toggle Button - Positioned on border with circle */}
        <button
          onClick={onToggle}
          className={`
            absolute -right-3 top-1/2 -translate-y-1/2
            w-6 h-6 rounded-full bg-white
            border border-gray-200
            flex items-center justify-center
            text-gray-400 hover:text-gray-600
            transition-colors duration-200
            shadow-sm
          `}
          aria-label={isExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
        >
          {isExpanded ? (
            <ChevronLeft className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 py-4 overflow-y-auto">
        <div className={`space-y-1 ${!isExpanded && 'px-3'}`}>
          {menuItems.map((item) => {
            const Icon = item.icon;
            
            const linkContent = (
              <div
                className={`
                  flex items-center rounded-md transition-colors
                  ${isExpanded ? 'px-4' : 'justify-center'} 
                  py-2 hover:bg-gray-50 hover:text-primary
                  group
                `}
              >
                <Icon className="h-5 w-5 text-gray-400 group-hover:text-primary" />
                {isExpanded && (
                  <span className="ml-3 text-sm text-gray-700 group-hover:text-primary">
                    {item.title}
                  </span>
                )}
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
        </div>
      </nav>
    </aside>
  );
};