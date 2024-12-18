import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { CLIENT_DASHBOARD_MENU } from '../../constants/menu';

export const ClientDashboardSidebar: React.FC = () => {
  const location = useLocation();
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);

  const toggleSubmenu = (path: string) => {
    setExpandedMenus(prev => 
      prev.includes(path) 
        ? prev.filter(p => p !== path)
        : [...prev, path]
    );
  };

  const isSubmenuExpanded = (path: string) => expandedMenus.includes(path);

  return (
    <aside className="w-56 bg-white border-r border-gray-200">
      <nav className="py-2">
        {CLIENT_DASHBOARD_MENU.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname.endsWith(item.path);
          const hasSubmenu = item.isExpandable && item.submenu;
          const isExpanded = isSubmenuExpanded(item.path);
          
          const menuContent = (
            <div
              className={`
                flex items-center justify-between px-3 py-2
                transition-colors duration-200 rounded-md mx-2
                ${isActive && !hasSubmenu
                  ? 'bg-primary/10 text-primary'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }
              `}
            >
              <div className="flex items-center gap-2.5">
                <Icon className={`h-4.5 w-4.5 flex-shrink-0 ${
                  isActive && !hasSubmenu ? 'text-primary' : 'text-gray-400'
                }`} />
                <span className="text-sm font-medium">{item.title}</span>
              </div>
              {hasSubmenu && (
                <div className="ml-auto">
                  {isExpanded ? (
                    <ChevronUp className="h-3.5 w-3.5 text-gray-400" />
                  ) : (
                    <ChevronDown className="h-3.5 w-3.5 text-gray-400" />
                  )}
                </div>
              )}
            </div>
          );

          return (
            <div key={item.path} className="mb-0.5">
              {hasSubmenu ? (
                <div
                  onClick={() => toggleSubmenu(item.path)}
                  className="cursor-pointer"
                >
                  {menuContent}
                </div>
              ) : (
                <NavLink to={item.path} className="block">
                  {menuContent}
                </NavLink>
              )}

              {/* Submenu */}
              {hasSubmenu && isExpanded && (
                <div className="mt-0.5 ml-4 space-y-0.5 border-l border-gray-100 pl-2">
                  {item.submenu?.map((subItem) => {
                    const SubIcon = subItem.icon;
                    const isSubActive = location.pathname.endsWith(subItem.path);
                    
                    return (
                      <NavLink
                        key={subItem.path}
                        to={subItem.path}
                        className={`
                          flex items-center gap-2.5 px-3 py-2 text-sm rounded-md mx-2
                          transition-colors duration-200
                          ${isSubActive
                            ? 'bg-primary/10 text-primary'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                          }
                        `}
                      >
                        {SubIcon && (
                          <SubIcon className={`h-4 w-4 flex-shrink-0 ${
                            isSubActive ? 'text-primary' : 'text-gray-400'
                          }`} 
                          />
                        )}
                        <span className="font-medium">{subItem.title}</span>
                      </NavLink>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
};