import React, { useState, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ChevronRight, ChevronDown, Menu } from 'lucide-react';
import { Logo } from '../header/Logo';
import type { MenuItem } from '../../types/menu';

interface ClientSidebarProps {
  menuItems: MenuItem[];
  currentPath: string;
}

export const ClientSidebar: React.FC<ClientSidebarProps> = ({ menuItems, currentPath }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const timeoutRef = useRef<number>();
  const location = useLocation();

  const isPathActive = (path: string) => {
    // Remove trailing slashes for comparison
    const normalizedCurrentPath = location.pathname.replace(/\/$/, '');
    const normalizedPath = path.replace(/\/$/, '');
    return normalizedCurrentPath === normalizedPath;
  };

  const isSubmenuActive = (item: MenuItem) => {
    if (!item.submenu) return false;
    return item.submenu.some(subItem => isPathActive(subItem.path));
  };

  const isMenuActive = (item: MenuItem) => {
    if (item.submenu) {
      return isSubmenuActive(item);
    }
    return isPathActive(item.path);
  };

  const toggleMenu = (path: string) => {
    if (isCollapsed) {
      setHoveredMenu(hoveredMenu === path ? null : path);
    } else {
      setExpandedMenus(prev => 
        prev.includes(path) 
          ? prev.filter(p => p !== path)
          : [...prev, path]
      );
    }
  };

  const handleMouseEnter = (path: string) => {
    if (isCollapsed) {
      clearTimeout(timeoutRef.current);
      setHoveredMenu(path);
    }
  };

  const handleMouseLeave = () => {
    if (isCollapsed) {
      timeoutRef.current = window.setTimeout(() => {
        setHoveredMenu(null);
      }, 300);
    }
  };

  const isMenuExpanded = (path: string) => expandedMenus.includes(path);

  // Auto-expand menu if it contains active submenu
  React.useEffect(() => {
    menuItems.forEach(item => {
      if (item.submenu && isSubmenuActive(item)) {
        setExpandedMenus(prev => 
          prev.includes(item.path) ? prev : [...prev, item.path]
        );
      }
    });
  }, [location.pathname]);

  return (
    <aside 
      className={`
        bg-white border-r border-gray-200 transition-all duration-300 ease-in-out relative
        ${isCollapsed ? 'w-16' : 'w-64'}
      `}
    >
      {/* Header */}
      <div className="h-14 border-b border-gray-200 flex items-center justify-between px-4">
        <div className={`transition-opacity duration-300 ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>
          <Logo iconOnly={isCollapsed} />
        </div>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="p-2 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const hasSubmenu = item.submenu && item.submenu.length > 0;
          const isActive = isMenuActive(item);
          const isExpanded = isMenuExpanded(item.path);
          const isHovered = hoveredMenu === item.path;

          return (
            <div 
              key={item.path}
              className="relative"
              onMouseEnter={() => handleMouseEnter(item.path)}
              onMouseLeave={handleMouseLeave}
            >
              {hasSubmenu ? (
                <>
                  <button
                    onClick={() => toggleMenu(item.path)}
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
                        <span className="ml-3 truncate font-medium">{item.title}</span>
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

                  {/* Submenu */}
                  {((isExpanded && !isCollapsed) || (isCollapsed && isHovered)) && (
                    <div 
                      className={`
                        space-y-1
                        ${isCollapsed 
                          ? 'absolute left-full top-0 ml-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 p-2 z-50' 
                          : 'mt-1 ml-4 pl-4 border-l border-gray-200'
                        }
                      `}
                    >
                      {item.submenu?.map((subItem) => {
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
                  )}
                </>
              ) : (
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
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
};