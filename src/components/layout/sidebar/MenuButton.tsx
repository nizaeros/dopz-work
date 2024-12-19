import React from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface MenuButtonProps {
  icon: LucideIcon;
  title: string;
  isActive: boolean;
  isExpanded: boolean;
  isCollapsed: boolean;
  onClick: () => void;
}

export const MenuButton: React.FC<MenuButtonProps> = ({
  icon: Icon,
  title,
  isActive,
  isExpanded,
  isCollapsed,
  onClick
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        w-full flex items-center justify-between px-3 py-2 rounded-lg
        transition-colors duration-200
        ${isActive 
          ? 'bg-primary/10 text-primary' 
          : 'text-gray-700 hover:bg-gray-100'
        }
      `}
    >
      <div className="flex items-center min-w-0">
        <Icon className={`h-5 w-5 flex-shrink-0 ${isActive ? 'text-primary' : 'text-gray-400'}`} />
        {!isCollapsed && (
          <span className="ml-3 truncate font-medium">{title}</span>
        )}
      </div>
      {!isCollapsed && (
        <div className="ml-2">
          {isExpanded ? (
            <ChevronDown className="h-4 w-4 text-gray-400" />
          ) : (
            <ChevronRight className="h-4 w-4 text-gray-400" />
          )}
        </div>
      )}
    </button>
  );
};