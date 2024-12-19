import { useLocation } from 'react-router-dom';
import type { MenuItem } from '../../../../types/menu';

export function usePathMatch() {
  const location = useLocation();

  const isPathActive = (path: string) => {
    const normalizedCurrentPath = location.pathname.replace(/\/$/, '');
    const normalizedPath = path.replace(/\/$/, '');
    return normalizedCurrentPath === normalizedPath;
  };

  const isSubmenuActive = (item: MenuItem) => {
    if (!item.submenu) return false;
    return item.submenu.some(subItem => isPathActive(subItem.path));
  };

  return {
    isPathActive,
    isSubmenuActive
  };
}