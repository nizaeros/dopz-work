import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Logo } from '../header/Logo';
import { Tooltip } from '../ui/Tooltip';
import type { MenuItem } from '../../types/menu';

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
        isExpanded ? 'w-64' : 'w-12'
      }`}
    >
      {/* Logo Section with Toggle */}
      <div className="h-14 border-b border-gray-200 relative">
        <div className={`h-full flex items-center ${isExpanded ? 'justify-start px-4' : 'justify-center'}`}>
          <Logo iconOnly={!isExpanded} showBrandName={isExpanded} className="h-8" />
        </div>
        
        {/* Toggle Button */}
        <button
          onClick={onToggle}
          className="absolute -right-3 top-1/2 -translate-y-1/2 p-1.5 bg-white border border-gray-200 rounded-full shadow-sm hover:bg-gray-50 transition-colors"
          aria-label={isExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
        >
          {isExpanded ? (
            <ChevronLeft className="h-3.5 w-3.5 text-gray-500" />
          ) : (
            <ChevronRight className="h-3.5 w-3.5 text-gray-500" />
          )}
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className="px-2 py-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPath.includes(item.to);
          
          const linkContent = (
            <div
              className={`flex items-center p-2 rounded-md transition-colors ${
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Icon className={`h-5 w-5 flex-shrink-0 ${isActive ? 'text-primary' : 'text-gray-400'}`} />
              {isExpanded && <span className="ml-3">{item.title}</span>}
            </div>
          );

          return (
            <div key={item.to} className="mb-1">
              {isExpanded ? (
                <Link to={item.to} onClick={(e) => e.stopPropagation()}>
                  {linkContent}
                </Link>
              ) : (
                <Tooltip content={item.title} side="right">
                  <Link to={item.to} onClick={(e) => e.stopPropagation()}>
                    {linkContent}
                  </Link>
                </Tooltip>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
};