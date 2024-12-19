import { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { usePathMatch } from './usePathMatch';
import type { MenuItem } from '../../../../types/menu';

export function useMenuState(item: MenuItem, currentPath: string) {
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const timeoutRef = useRef<number>();
  const location = useLocation();
  const { isPathActive, isSubmenuActive } = usePathMatch();

  const isActive = item.submenu 
    ? isSubmenuActive(item) 
    : isPathActive(item.path);

  const isExpanded = expandedMenus.includes(item.path);
  const isHovered = hoveredMenu === item.path;

  useEffect(() => {
    if (item.submenu && isSubmenuActive(item)) {
      setExpandedMenus(prev => 
        prev.includes(item.path) ? prev : [...prev, item.path]
      );
    }
  }, [location.pathname, item]);

  const toggleMenu = (path: string) => {
    setExpandedMenus(prev => 
      prev.includes(path) 
        ? prev.filter(p => p !== path)
        : [...prev, path]
    );
  };

  const handleMouseEnter = (path: string) => {
    clearTimeout(timeoutRef.current);
    setHoveredMenu(path);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = window.setTimeout(() => {
      setHoveredMenu(null);
    }, 300);
  };

  return {
    isActive,
    isExpanded,
    isHovered,
    handleMouseEnter,
    handleMouseLeave,
    toggleMenu
  };
}