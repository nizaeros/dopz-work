import { useState } from 'react';

export function useSidebarState() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  return {
    isCollapsed,
    setIsCollapsed
  };
}